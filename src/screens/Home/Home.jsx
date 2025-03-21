import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import MatchCard from '../../components/MatchCard/MatchCard';
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
        
        <div className="match-list">
          {/* {journeys.map((journey, index) => (
            <MatchCard key={index} journey={journey} />
          ))} */}
          {/* <MatchCard /> */}
        </div>
      </main>
    </div>
  );
};

export default HomePage;