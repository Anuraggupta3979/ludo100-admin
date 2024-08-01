import "./styles/index.scss";
import CustomRoutes from "./Routes/Routes";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Login from "./pages/login";
import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { IsTokenValid } from "./utils/middleware";
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = IsTokenValid();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (location?.pathname === "/" && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/*" element={<CustomRoutes />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
