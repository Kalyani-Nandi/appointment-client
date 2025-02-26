import "./App.css";
import { Routes, Route } from "react-router-dom";
import BookAppointment from "./pages/BookAppointment";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:timeSlot" element={<BookAppointment />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
