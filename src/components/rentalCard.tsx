import { Link } from "react-router-dom";
import { Rental } from "../types/rental";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

const RentalCard: React.FC<{ rental: Rental }> = ({ rental }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6">{rental.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {rental.description}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          component={Link}
          to={`/rental/${rental.id}`}
          variant="contained"
          color="primary"
        >
          Подробнее
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default RentalCard;
