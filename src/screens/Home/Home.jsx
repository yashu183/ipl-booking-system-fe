import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import MatchCard from '../../components/MatchCard/MatchCard';
import { createMatch, deleteMatch, getAllUpcomingMatches, updateMatch } from "../../services/api.service";
import './Home.css';
import { getUserRole } from '../../utils/utils.service';
import CreateMatchModal from '../../components/CreateMatchModal/CreateMatchModal';

const HomePage = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateMatchButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleMatchCreateFormSubmission = async (formData) => {
    try {
      setLoading(true);
      const response = await createMatch(formData);
      fetchUpcomingMatches()
    } catch (error) {
      setError(error.message);
      console.error('Match Creation error:', error);
    } finally {
      setLoading(false)
    }
  }

  const handleMatchEditFormSubmission = async (formData, id) => {
    try {
      setLoading(true);
      const response = await updateMatch(formData, id);
      fetchUpcomingMatches()
    } catch (error) {
      setError(error.message);
      console.error('Match Edit error:', error);
    } finally {
      setLoading(false)
    }
  }

  const handleMatchDeleteFormSubmission = async (id) => {
    try {
      setLoading(true);
      const response = await deleteMatch(id);
      fetchUpcomingMatches()
    } catch (error) {
      setError(error.message);
      console.error('Match Deletion error:', error);
    } finally {
      setLoading(false)
    }
  }

  const fetchUpcomingMatches = async () => {
    try {
      setLoading(true);
      const response = await getAllUpcomingMatches();
      setUpcomingMatches(response.matches)
    } catch (err) {
      console.error('Match Deletion error:', error);
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
      {error && (
          <div className="error-message">
              {error}
          </div>
      )}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <span>Loading..</span>
        </div>
      )}
      {
        !loading &&  
        <main className="main-content">
        {isAdmin && (
              <div className="row-container">
                  <button className="create-button" onClick={handleCreateMatchButtonClick} >Create Match</button>
              </div>
          )}
          {/* <SearchForm onSearch={handleSearch} /> */}
          
          <div className="match-list">
            {upcomingMatches.map((match, index) => (
              <MatchCard 
                key={index} 
                id={match.matchId} 
                matchDetails={match} 
                onEditConfirm={(formData, id) => {
                  handleMatchEditFormSubmission(formData, id)
                }}
                onDeleteConfirm={(id) => {
                  handleMatchDeleteFormSubmission(id)
                }}
              />
            ))}
            {/* <MatchCard /> */}
          </div>
  
          <CreateMatchModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false)
            }}
            onConfirm={(formData, id) => { 
              handleMatchCreateFormSubmission(formData)
            }}
          />
        </main>
      }
      
    </div>
  );
};

export default HomePage;