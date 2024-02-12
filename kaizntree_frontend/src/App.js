// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Loginpage";
import RegistrationPage from "./pages/Registrationpage";
import DashboardPage from "./pages/Dashboardpage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/register" />} />
        <Route exact path="/register" element={<RegistrationPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/dashboard" element={<DashboardPage />} />
        <Route path="/*" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
};

export default App;
