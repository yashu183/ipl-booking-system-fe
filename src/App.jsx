import React from 'react';
import HomePage from '../src/screens/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Booking from './screens/Booking/Booking';
import LoginPage from './screens/Login/Login';
import ProtectedRoute from './config/ProtectedRoutes';
import RegisterPage from './screens/Register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={
          <ProtectedRoute element={<HomePage />} />
        } />
        <Route path="/history" element={
          <ProtectedRoute element={<Booking />} />
        } />
        <Route path="*" element={<ProtectedRoute element={<HomePage />} />}/>
      </Routes>
    </Router>
  )
}

export default App;