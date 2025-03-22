import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import MatchCard from '../../components/MatchCard/MatchCard';
import { getAllUpcomingMatches } from "../../services/api.service";
import './Home.css';
import { getUserRole } from '../../utils/utils.service';

const HomePage = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
      const fetchUpcomingMatches = async () => {
        try {
          const response = await getAllUpcomingMatches(); //pass userID
          setUpcomingMatches(response.matches)
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUpcomingMatches();
    }, []);
  
    useEffect(() => {
      const fetchUserRole = async() => {
        try {
          const userRole = await getUserRole();
          if (userRole == "ADMIN") {
            setIsAdmin(true);
          }
        }
        catch(error) {
          setUser(false);
        }
      } 
  
      fetchUserRole()
    }, []);
  
  const handleSearch = (searchParams) => {
    console.log('Search params:', searchParams);
  };
  
  return (
    <div className="home-page">
      <Header />
      
      <main className="main-content">
      {isAdmin && (
            <div className="row-container">
                <button className="create-button">Create Match</button>
            </div>
        )}
        {/* <SearchForm onSearch={handleSearch} /> */}
        
        <div className="match-list">
          {upcomingMatches.map((match, index) => (
            <MatchCard key={index} matchDetails={match} />
          ))}
          {/* <MatchCard /> */}
        </div>
      </main>
    </div>
  );
};

export default HomePage;