import React from 'react';
import HomePage from '../src/screens/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Booking from './screens/Booking/Booking';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage/>} />
        <Route path="/history" element={<Booking/>} />
      </Routes>
  </Router>
  )
}

export default App;