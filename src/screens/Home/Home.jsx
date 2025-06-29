import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import MatchCard from '../../components/MatchCard/MatchCard';
import { createMatch, deleteMatch, getAllUpcomingMatches, updateMatch, confirmBooking, getAllTeams, getFilteredMatches } from "../../services/api.service";
import { getUserRole } from '../../utils/utils.service';
import CreateMatchModal from '../../components/CreateMatchModal/CreateMatchModal';
import Button from '../../components/Button/Button';
import { FaPlus } from "react-icons/fa";
import './Home.css';
import Loader from '../../components/Loader/Loader';
import ErrorCard from '../../components/ErrorCard/ErrorCard';
import SuccessCard from '../../components/SuccessCard/SuccessCard';
import BookingConfirmationModal from '../../components/BookingConfirmationModal/BookingConfirmationModal';
import Search from "../../components/Search/Search";

const HomePage = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [iscurrentMatchEdit, setIsCurrentMatchEdit] = useState({});
  const [teams, setTeams] = useState([]);
  const [searchParams, setSearchParams] = useState({
    teamId: '',
    scheduledDate: ''
  });

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
      setUpcomingMatches(response.matches);
    } catch (err) {
      console.error('Match Deletion error:', error);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmTickets = async (matchId, userId, numOfTkts) => {
    try {
      setLoading(true);
      const response = await confirmBooking(matchId, userId, numOfTkts);
      fetchUpcomingMatches();
      setSuccess(response.message); 
    } catch (error) {
      setError(error.message);
      console.error('Match Tkts booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookings = (matchDetails) => {
    setIsBookingModalOpen(true);
    setIsCurrentMatchEdit(matchDetails);
  }

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const response = await getAllTeams();
      setTeams(response.teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMatches();
    fetchTeams();
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
        console.error("Error fetching user role:", error);
        setIsAdmin(false);
      }
    } 

    fetchUserRole()
  }, []);
  
  const handleSearch = async (searchParams) => {
    try {
      console.log("Search Params:", searchParams);
      setSearchParams(searchParams);
      setLoading(true);
      const response = await getFilteredMatches(searchParams);
      setUpcomingMatches(response.matches)
    } catch (error) {
      setError(error.message);
      console.error('Match Deletion error:', error);
    } finally {
      setLoading(false);
    }
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
            <h2 className="find-matches">Find Matches</h2>

            <div className="outer">
              <Search teamDetails={teams} handleSearch={handleSearch} searchParamsFromParent={searchParams} />
              {isAdmin && (
                <div className="row-container">
                    <Button
                      className="create-button"
                      variant="primary"
                      onClick={handleCreateMatchButtonClick}
                    >
                      <FaPlus />
                    </Button>
                </div>
              )}
            </div>

            {
              upcomingMatches?.length > 0 ?
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
                    handleBookings={handleBookings}
                  />
                ))}
              </div> : (
                <div className="no-bookings">
                  <img src="/duckout.png" alt="" />
                  <p className="no-bookings-text">No Matches found with the given filters. Try changing them.</p>
                </div>
              )
            }

            <BookingConfirmationModal
              isOpen={isBookingModalOpen}
              onClose={() => setIsBookingModalOpen(false)}
              onConfirm={(userId, matchId, numOfTkts) => handleConfirmTickets(userId, matchId, numOfTkts) }
              handleBookings={handleBookings}
              matchDetails={iscurrentMatchEdit}
            />
      
            <CreateMatchModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false)
              }}
              onConfirm={(formData) => { 
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