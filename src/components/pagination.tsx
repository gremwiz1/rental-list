import React from "react";
import { Box, Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
    <MuiPagination
      count={totalPages}
      page={page}
      onChange={(_, value) => onPageChange(value)}
      color="primary"
    />
  </Box>
);

export default Pagination;
