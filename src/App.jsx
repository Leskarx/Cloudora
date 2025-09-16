import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import CategoryPage from './components/Pages/CategoryPage';
import SharedFiles from './components/Pages/SharedFiles';
import Favorites from './components/Pages/Favorites';
import UploadFiles from './components/Pages/UploadFiles';
import Settings from './components/Pages/Settings';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // loader to avoid flicker

  // Verify user session
  const checkAuth = async () => {
    try {
      console.log("called----->");
      
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/me`, { withCredentials: true });
      if (res.status === 200 && res.data.user) {
        setIsAuthenticated(true);
        setUser(res.data.user);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
    } catch (error) {
      handleLogout(false); // don't call API again, just clear
    } finally {
      setLoading(false);
    }
  };

  // update user state and localStorage


  // Restore session from localStorage first
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedUser = localStorage.getItem('user');

    if (savedAuth === 'true' && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }

    // Validate in background
    checkAuth();
  }, []);

  const handleLogin = async () => {
    await checkAuth(); // re-check after login
  };

  const handleLogout = async (callApi = true) => {
    if (callApi) {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true });
      } catch (error) {
        console.log("Error logging out", error);
      }
    }

    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; // Optional loader
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} reverseOrder={false} />

        <Routes>
          {/* Authentication Route */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginPage onLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Dashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/category/:categoryName"
            element={
              isAuthenticated ? (
                <CategoryPage user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/shared-files"
            element={
              isAuthenticated ? (
                <SharedFiles user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/favorites"
            element={
              isAuthenticated ? (
                <Favorites user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/upload"
            element={
              isAuthenticated ? (
                <UploadFiles setUser={setUser} user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/settings"
            element={
              isAuthenticated ? (
                <Settings user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
