import React, { useState } from 'react';
import './Search.css';
import { FaSearch } from "react-icons/fa";
import Button from '../Button/Button';

const MatchSearch = ({ teamDetails, handleSearch }) => {
  const [searchParams, setSearchParams] = useState({
    teamId: '',
    scheduledDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearchParams(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!searchParams.teamId && !searchParams.scheduledDate) {
      setError("Atleast one filed should be entered");
      return;
    }

    handleSearch(searchParams);
  };

  return (
    <div className="match-search-container">
      <form onSubmit={handleSubmit} className="match-search-form">
        <div className="form-group">
          <label htmlFor="team">Team:</label>
          <select 
            id="team" 
            name="teamId" 
            value={searchParams.teamId} 
            onChange={handleChange}
          >
            <option value="">Select Team</option>
            {teamDetails.map(team => (
              <option key={`home-${team.teamId}`} value={team.teamId}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input 
            type="date" 
            id="date" 
            name="scheduledDate" 
            value={searchParams.scheduledDate} 
            onChange={handleChange}
          />
        </div>

        <Button variant="primary" className="search-button">
          <span className="search-icon"><FaSearch size={16} /></span>
          <p>Search</p>
        </Button>
      </form>
    </div>
  );
};

export default MatchSearch;