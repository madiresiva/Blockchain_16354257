import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Cart from "./Cart";
import Layout from "./Layout";
import { Snackbar, Alert } from "@mui/material";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const addToCart = (course) => {
    setCartItems((prevItems) => {
      const isAlreadyInCart = prevItems.some((item) => item.id === course.id);
      if (isAlreadyInCart) {
        setSnackbarMessage("Course is already in cart");
        setSnackbarSeverity("warning");
        setSnackbarOpen(true);
        return prevItems;
      } else {
        setSnackbarMessage("Course added to cart!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        return [...prevItems, course];
      }
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard addToCart={addToCart} />}
          />
          <Route path="/courses" element={<Courses addToCart={addToCart} />} />{" "}
          {/* Pass addToCart to Courses */}
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        </Routes>

        {/* Snackbar Notification */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Layout>
    </Router>
  );
}

export default App;
