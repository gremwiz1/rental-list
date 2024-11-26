import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RentalState {
  rentals: any[];
  totalPages: number;
  page: number;
  filters: Record<string, string | number>;
}

const initialState: RentalState = {
  rentals: [],
  totalPages: 1,
  page: 1,
  filters: {
    "book[from]": "", // Дата заезда
    "book[nights]": 1, // Количество ночей
    "numGuests[gte]": 1, // Минимальное количество гостей
  },
};

const rentalSlice = createSlice({
  name: "rentals",
  initialState,
  reducers: {
    setRentals(
      state,
      action: PayloadAction<{ rentals: any[]; totalPages: number }>
    ) {
      state.rentals = action.payload.rentals;
      state.totalPages = action.payload.totalPages;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFilters(state, action: PayloadAction<Record<string, string | number>>) {
      state.filters = action.payload;
      state.page = 1; // Сбрасываем страницу на 1 при изменении фильтров
    },
  },
});

export const { setRentals, setPage, setFilters } = rentalSlice.actions;

export default rentalSlice.reducer;
