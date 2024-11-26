import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setRentals, setFilters, setPage } from "../store/slices/rentalSlice";
import Filters from "../components/filters";
import RentalCard from "../components/rentalCard";
import Pagination from "../components/pagination";
import { fetchRentals } from "../services/api";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";

const RentalList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { rentals, page, filters, totalPages } = useSelector(
    (state: RootState) => state.rentals
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 10; // Количество квартир на странице

  const fetchAndSetRentals = async (
    filters: Record<string, string | number>
  ) => {
    setLoading(true);
    setError(null);

    try {
      // Получаем данные от API
      const { rentals, totalItems } = await fetchRentals(filters);

      // Рассчитываем общее количество страниц
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      // Сохраняем данные в Redux
      dispatch(setRentals({ rentals, totalPages }));

      // Сохраняем фильтры в Redux
      dispatch(setFilters(filters));
    } catch (err) {
      console.error("Ошибка загрузки:", err);
      setError("Не удалось загрузить список квартир. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const currentRentals = rentals.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Список квартир
      </Typography>
      <Filters onFilter={fetchAndSetRentals} />

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {currentRentals.map((rental) => (
        <RentalCard key={rental.id} rental={rental} />
      ))}

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => dispatch(setPage(newPage))}
        />
      )}
    </Container>
  );
};

export default RentalList;
