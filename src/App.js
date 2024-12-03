import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Dashbord from "./components/dashbord/dash";
import Login from "./components/sign/login";
import Register from "./components/sign/register";
import Navbar from "./components/navbar/navbar";
import ProtectedRoute from "./router/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Navbar />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashbord />} /> {/* Default sub-route */}
          <Route path=":id" element={<Dashbord />} />
        </Route>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
