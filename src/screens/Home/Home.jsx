import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import MatchCard from '../../components/MatchCard/MatchCard';
import { createMatch, getAllUpcomingMatches } from "../../services/api.service";
import './Home.css';
import { getUserRole } from '../../utils/utils.service';
import CreateMatchModal from '../../components/CreateMatchModal/CreateMatchModal';

const HomePage = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmission = async (formData) => {
    const response = await createMatch(formData);
    fetchUpcomingMatches()
  }

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

  useEffect(() => {
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
                <button className="create-button" onClick={handleButtonClick} >Create Match</button>
            </div>
        )}
        {/* <SearchForm onSearch={handleSearch} /> */}
        
        <div className="match-list">
          {upcomingMatches.map((match, index) => (
            <MatchCard key={index} matchDetails={match} />
          ))}
          {/* <MatchCard /> */}
        </div>

        <CreateMatchModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
          }}
          onConfirm={(formData, id) => { 
            handleFormSubmission(formData)
          }}
        />
      </main>
    </div>
  );
};

export default HomePage;