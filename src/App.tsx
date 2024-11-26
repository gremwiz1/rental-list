import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RentalList from "./pages/rentalList";
import RentalPage from "./pages/rentalPage";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<RentalList />} />
      <Route path="/rental/:id" element={<RentalPage />} />
    </Routes>
  </Router>
);

export default App;
