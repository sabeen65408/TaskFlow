import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Dashboard from "./pages/Dashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Project from "./pages/Project";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

import MainLayout from "./layouts/MainLayout";

import { Toaster } from "react-hot-toast";
import Employees from "./pages/Employees";

function App() {

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [role, setRole] = useState(
    localStorage.getItem("role")
  );

  useEffect(() => {

    const syncAuth = () => {

      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));

    };

    syncAuth();

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

        <Route
          path="/"
          element={
            !token
              ? <Login />
              : role === "admin"
              ? <Navigate to="/dashboard" replace />
              : role === "employee"
              ? <Navigate to="/employee/dashboard" replace />
              : <Login />
          }
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
    path="/reset-password"
    element={<ResetPassword />}
/>

        <Route
          element={
            token && role === "admin"
              ? <MainLayout />
              : <Navigate to="/" replace />
          }
        >
          <Route
  path="/dashboard"
  element={<Dashboard />}
/>

<Route
  path="/employees"
  element={<Employees />}
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

        <Route
    element={
        token && role === "employee"
            ? <MainLayout />
            : <Navigate to="/" replace />
    }
>

    <Route
        path="/employee/dashboard"
        element={<EmployeeDashboard />}
    />

    <Route
        path="/employee/profile"
        element={<Profile />}
    />

    <Route
        path="/employee/settings"
        element={<Settings />}
    />

    <Route
        path="/employee/calendar"
        element={<Calendar />}
    />

</Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

      <Toaster position="top-right" />
    </>
  );

}

export default App;