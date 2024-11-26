import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setFilters } from "../store/slices/rentalSlice";

interface FiltersProps {
  onFilter: (filters: Record<string, string | number>) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilter }) => {
  const dispatch = useDispatch();
  const initialFilters = useSelector(
    (state: RootState) => state.rentals.filters
  );

  const [fromDate, setFromDate] = useState("");
  const [nights, setNights] = useState(1);
  const [numGuests, setNumGuests] = useState(1);

  // Получаем текущую дату в формате YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const savedDate = initialFilters["book[from]"];
    if (savedDate && typeof savedDate === "string" && savedDate.length === 8) {
      // Преобразуем дату из формата YYYYMMDD в YYYY-MM-DD
      const formattedDate = `${savedDate.slice(0, 4)}-${savedDate.slice(
        4,
        6
      )}-${savedDate.slice(6)}`;
      setFromDate(formattedDate);
    } else {
      setFromDate("");
    }
    setNights(Number(initialFilters["book[nights]"]) || 1);
    setNumGuests(Number(initialFilters["numGuests[gte]"]) || 1);
  }, [initialFilters]);

  const applyFilters = () => {
    // Преобразуем дату в формат YYYYMMDD для API
    const formattedDate = fromDate.replace(/-/g, "");
    const newFilters = {
      "book[from]": formattedDate,
      "book[nights]": nights,
      "numGuests[gte]": numGuests,
    };

    dispatch(setFilters(newFilters));
    onFilter(newFilters);
  };

  const handleNightsChange = (value: number) => {
    if (value < 1) setNights(1);
    else setNights(value);
  };

  const handleGuestsChange = (value: number) => {
    if (value < 1) setNumGuests(1);
    else setNumGuests(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <TextField
        label="Дата заезда"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        inputProps={{
          min: today,
        }}
      />
      <TextField
        label="Количество ночей"
        type="number"
        value={nights}
        onChange={(e) => handleNightsChange(Number(e.target.value))}
        inputProps={{
          min: 1,
        }}
      />
      <TextField
        label="Количество гостей"
        type="number"
        value={numGuests}
        onChange={(e) => handleGuestsChange(Number(e.target.value))}
        inputProps={{
          min: 1,
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={applyFilters}
        disabled={!fromDate}
      >
        Применить фильтры
      </Button>
    </Box>
  );
};

export default Filters;
