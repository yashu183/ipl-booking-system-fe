import React, { useState, useEffect } from "react";
import "./CreateMatchModal.css";
import Button from "../Button/Button";
import { getAllTeams, getMatchById } from "../../services/api.service";

const CreateMatchModal = ({
  isOpen,
  onClose,
  onConfirm,
  matchId = null,
  title = "Create Match"
}) => {

  const initialFormState = {
    homeTeamId: "",
    awayTeamId: "",
    scheduledDate: "",
    venue: "",
    price: "",
    ttlTkts: ""
  };
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState(initialFormState);
  const [teams, setTeams] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch teams when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchTeams();
      if (matchId) {
        fetchMatchDetails(matchId);
      }
    }
  }, [isOpen, matchId]);

  const fetchTeams = async () => {
    setIsLoading(true);
    try {
      const response = await getAllTeams();
      setTeams(response.teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMatchDetails = async (id) => {
    setIsLoading(true);
    try {
      const response = await getMatchById(id);
      console.log(response)
      // Convert date string to input date format (YYYY-MM-DD)
      const date = new Date(response.match.scheduledDate);
      const formattedDate = date.toISOString().split('T')[0];
      
      setFormData({
        homeTeamId: response.match.homeTeamId,
        awayTeamId: response.match.awayTeamId,
        scheduledDate: formattedDate,
        venue: response.match.venue,
        price: response.match.price,
        ttlTkts: response.match.ttlTkts
      });
    } catch (error) {
      console.error("Error fetching match details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.homeTeamId) newErrors.homeTeamId = "Home team is required";
    if (!formData.awayTeamId) newErrors.awayTeamId = "Away team is required";
    if (formData.homeTeamId === formData.awayTeamId && formData.homeTeamId !== "") 
      newErrors.awayTeamId = "Home and away teams must be different";
    if (!formData.scheduledDate) newErrors.scheduledDate = "Scheduled date is required";
    if (!formData.venue) newErrors.venue = "Venue is required";

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }
    
    if (!formData.ttlTkts) {
      newErrors.ttlTkts = "Total tickets is required";
    } else if (isNaN(formData.ttlTkts) || parseInt(formData.ttlTkts) <= 0) {
      newErrors.ttlTkts = "Total tickets must be a positive integer";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Convert numeric strings to proper types
      const submissionData = {
        ...formData,
        price: parseFloat(formData.price),
        ttlTkts: parseInt(formData.ttlTkts)
      };
      
      onConfirm(submissionData, matchId);
      // Clear form data after submission
      setFormData(initialFormState);
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="match-modal-container">
        <button className="close-icon" onClick={onClose}>
          &times;
        </button>

        <h4 className="modal-title">{title}</h4>

        {isLoading ? (
          <div className="loading-indicator">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="homeTeamId">Home Team</label>
              <select
                id="homeTeamId"
                name="homeTeamId"
                value={formData.homeTeamId}
                onChange={handleChange}
                className={errors.homeTeamId ? "form-control error" : "form-control"}
              >
                <option value="">Select Home Team</option>
                {teams.map(team => (
                  <option key={`home-${team.teamId}`} value={team.teamId}>
                    {team.name}
                  </option>
                ))}
              </select>
              {errors.homeTeamId && <div className="error-message">{errors.homeTeamId}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="awayTeamId">Away Team</label>
              <select
                id="awayTeamId"
                name="awayTeamId"
                value={formData.awayTeamId}
                onChange={handleChange}
                className={errors.awayTeamId ? "form-control error" : "form-control"}
              >
                <option value="">Select Away Team</option>
                {teams.map(team => (
                  <option key={`away-${team.teamId}`} value={team.teamId}>
                    {team.name}
                  </option>
                ))}
              </select>
              {errors.awayTeamId && <div className="error-message">{errors.awayTeamId}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="scheduledDate">Scheduled Date</label>
              <input
                type="date"
                id="scheduledDate"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
                min={today}
                className={errors.scheduledDate ? "form-control error" : "form-control"}
              />
              {errors.scheduledDate && <div className="error-message">{errors.scheduledDate}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="venue">Venue</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Enter venue"
                className={errors.venue ? "form-control error" : "form-control"}
              />
              {errors.venue && <div className="error-message">{errors.venue}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter ticket price"
                step="0.01"
                min="0"
                className={errors.price ? "form-control error" : "form-control"}
              />
              {errors.price && <div className="error-message">{errors.price}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="ttlTkts">Total Tickets</label>
              <input
                type="number"
                id="ttlTkts"
                name="ttlTkts"
                value={formData.ttlTkts}
                onChange={handleChange}
                placeholder="Enter total tickets"
                min="1"
                className={errors.ttlTkts ? "form-control error" : "form-control"}
              />
              {errors.ttlTkts && <div className="error-message">{errors.ttlTkts}</div>}
            </div>

            <div className="modal-actions">
              <Button variant="neutral" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                {matchId ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateMatchModal;