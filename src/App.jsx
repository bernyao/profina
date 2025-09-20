import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChange } from "./firebase/auth";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import ResumeBuilder from "./components/ResumeBuilder";
import TemplatesPage from "./components/TemplatesPage";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Profina...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        {user && <Navbar user={user} />}
        <main className="main-content">
          <Routes>
            <Route
              path="/dashboard"
              element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
            />
            <Route
              path="/resume/:id"
              element={
                user ? <ResumeBuilder user={user} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/resume/new"
              element={
                user ? <ResumeBuilder user={user} /> : <Navigate to="/" />
              }
            />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <LandingPage />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
