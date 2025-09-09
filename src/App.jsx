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
  // Authentication state - in real app, this would be managed by context/redux
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  async function checkAuth(){
    try {
      const res=await axios.get(`${import.meta.env.VITE_API_URL}/me`,{withCredentials:true});
      if(res.status===200){
        setIsAuthenticated(true);
        setUser(res.data.user);
      }
    } catch (error) {
       setIsAuthenticated(false);
       setUser(null);
     
    }

   }

  // Check for existing session on app load
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedUser = localStorage.getItem('user');
   
    checkAuth();
    
    
    if (savedAuth === 'true' && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Handle login
  const handleLogin = () => {
    checkAuth();
    
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Handle logout
  const handleLogout = () => {
   async function logout(){
    try {
      const res=await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`,{},{withCredentials:true});
      if(res.status===200){
        console.log("logged out successfully");
      }
    } catch (error) {
      console.log("Error logging out",error);

    }
 

   }
   logout();
      




    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
      <Toaster
  position="top-center"
  toastOptions={{
    duration: 3000,
    style: {
      background: '#333',
      color: '#fff',
    },
    success: {
      duration: 2000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
    error: {
      duration: 4000,
      theme: {
        primary: 'red',
        secondary: 'black',
      },
    },
  }}
  reverseOrder={false}
/>
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
                <UploadFiles user={user} onLogout={handleLogout} />
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
