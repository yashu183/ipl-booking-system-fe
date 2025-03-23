import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import MatchCard from '../../components/MatchCard/MatchCard';
import { createMatch, deleteMatch, getAllUpcomingMatches, updateMatch } from "../../services/api.service";
import { getUserRole } from '../../utils/utils.service';
import CreateMatchModal from '../../components/CreateMatchModal/CreateMatchModal';
import Button from '../../components/Button/Button';
import { FaPlus } from "react-icons/fa";
import './Home.css';
import Loader from '../../components/Loader/Loader';
import ErrorCard from '../../components/ErrorCard/ErrorCard';
import SuccessCard from '../../components/SuccessCard/SuccessCard';

const HomePage = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateMatchButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleMatchCreateFormSubmission = async (formData) => {
    try {
      setLoading(true);
      const response = await createMatch(formData);
      fetchUpcomingMatches();
      setSuccess(response.message);
    } catch (error) {
      setError(error.message);
      console.error('Match Creation error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleMatchEditFormSubmission = async (formData, id) => {
    try {
      setLoading(true);
      const response = await updateMatch(formData, id);
      fetchUpcomingMatches();
      console.log(response);
      setSuccess(response.message);
    } catch (error) {
      setError(error.message);
      console.error('Match Edit error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleMatchDeleteFormSubmission = async (id) => {
    try {
      setLoading(true);
      const response = await deleteMatch(id);
      fetchUpcomingMatches();
      setSuccess(response.message);
    } catch (error) {
      setError(error.message);
      console.error('Match Deletion error:', error);
    } finally {
      setLoading(false);
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
    <>
      {
        loading && <Loader />
      }
      {
        error && <ErrorCard message={error}  onClose={() => setError(null)} />
      }
      {
        success && <SuccessCard message={success} onClose={() => setSuccess(null)} />
      }
      <div className="home-page">
        <Header />
        {!loading &&  
          <main className="main-content">
            {isAdmin && (
              <div className="row-container">
                  <Button
                    className="create-button"
                    variant="primary"
                    onClick={handleCreateMatchButtonClick}
                  >
                    <FaPlus />
                    <p>Create Match</p>
                  </Button>
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
    </>
  );
};

export default HomePage;