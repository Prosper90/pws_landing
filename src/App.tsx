import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Team from "./pages/Team";
import { Route, Routes } from "react-router-dom";
import Manufacturers from "./pages/Manufacturers";
import CapitalProvider from "./pages/CapitalProvider";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/team" element={<Team />} />
      <Route path="/manufacturers" element={<Manufacturers />} />
      <Route path="/signup" element={<CapitalProvider />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
