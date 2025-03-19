import React, { useState } from 'react';
import Header from '../../components/Header/Header';
// import SearchForm from '../../components/SearchForm/SearchForm';
import MatchCard from '../../components/MatchCard/MatchCard';
import './Home.css';

// Sample data based on the screenshot
const sampleJourneys = [
  {
    trainNumber: '18238',
    trainName: 'Kovai Express',
    duration: '8hr 25min',
    origin: 'Chennai',
    originCode: 'CHN',
    departureTime: '1:00PM',
    destination: 'Coimbatore',
    destinationCode: 'CB',
    arrivalTime: '4:00AM',
    price: '120',
    availableSeats: '20',
    totalSeats: '120'
  },
  {
    trainNumber: '18238',
    trainName: 'Kovai Express',
    duration: '8hr 25min',
    origin: 'Chennai',
    originCode: 'CHN',
    departureTime: '1:00PM',
    destination: 'Coimbatore',
    destinationCode: 'CB',
    arrivalTime: '4:00AM',
    price: '120',
    availableSeats: '20',
    totalSeats: '120'
  }
];

const HomePage = () => {
  const [journeys, setJourneys] = useState(sampleJourneys);
  
  const handleSearch = (searchParams) => {
    console.log('Search params:', searchParams);
    // In a real application, you would fetch data from an API here
    // For now, we're just using the sample data
  };
  
  return (
    <div className="home-page">
      <Header />
      
      <main className="main-content">
        {/* <SearchForm onSearch={handleSearch} /> */}
        
        <div className="journey-list">
          {journeys.map((journey, index) => (
            <MatchCard key={index} journey={journey} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;