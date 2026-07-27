import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

import MainLayout from "./layouts/MainLayout";

import { Toaster } from "react-hot-toast";

function App() {

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  useEffect(() => {

    const syncAuth = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", syncAuth);
    window.addEventListener("authChanged", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("authChanged", syncAuth);
    };

  }, []);

  return (
    <>
      <Routes>

        {/* Public */}

        <Route
          path="/"
          element={
            token
              ? <Navigate to="/dashboard" replace />
              : <Login />
          }
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* Protected */}

        <Route
          element={
            token
              ? <MainLayout />
              : <Navigate to="/" replace />
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/project/:id"
            element={<Project />}
          />

          <Route
            path="/calendar"
            element={<Calendar />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

    </>
  );

}

export default App;