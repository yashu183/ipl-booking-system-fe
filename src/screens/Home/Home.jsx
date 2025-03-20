import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import MatchCard from '../../components/MatchCard/MatchCard';
import BookingCard from '../../components/BookingCard/BookingCard';
import './Home.css';

const HomePage = () => {
  const [journeys, setJourneys] = useState({});
  
  const handleSearch = (searchParams) => {
    console.log('Search params:', searchParams);
  };
  
  return (
    <div className="home-page">
      <Header />
      
      <main className="main-content">
        {/* <SearchForm onSearch={handleSearch} /> */}
        
        <div className="journey-list">
          {/* {journeys.map((journey, index) => (
            <MatchCard key={index} journey={journey} />
          ))} */}
          <MatchCard />
          <BookingCard />
        </div>
      </main>
    </div>
  );
};

export default HomePage;