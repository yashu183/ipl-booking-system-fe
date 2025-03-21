import React from 'react';
import HomePage from '../src/screens/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Booking from './screens/Booking/Booking';
import LoginPage from './screens/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<Booking />} />
      </Routes>
    </Router>
  )
}

export default App;