import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

const RentalPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Детали квартиры
      </Typography>
      <Typography variant="body1">ID квартиры: {id}</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate(-1)}
        sx={{ mt: 2 }}
      >
        Назад
      </Button>
    </Container>
  );
};

export default RentalPage;
