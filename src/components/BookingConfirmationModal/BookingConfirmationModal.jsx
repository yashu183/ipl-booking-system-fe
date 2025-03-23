import React, { useState } from "react";
import "./BookingConfirmationModal.css";
import Button from "../Button/Button";
import { getUserId } from "../../utils/utils.service";
const BookingConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  matchDetails
}) => {
  const [count, setCount] = useState(1);
  const [error, setError] = useState(null);

  const handleConfirm = () => {
    const currAvblTkts = matchDetails.ttlTkts - matchDetails.ttlBookedTkts;
    console.log(count, currAvblTkts);

    if(count > currAvblTkts) {
      setError(`Only ${currAvblTkts} tickets are availale. Please enter a valid number`);
      return;
    }
    setError(null);
    onConfirm(getUserId(), matchDetails.matchId, count);
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-icon" onClick={onClose}>
          &times;
        </button>

        <h4 className="modal-title">Confirm Booking</h4>

        <p className="modal-message">Enter the number of tickets required</p>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <input
            type="number"
            value={count}
            min="1"
            onChange={(e) => setCount(e.target.value)}
            className="ticket-input"
            placeholder="Enter number of tickets"
          />
        </div>

        <div className="modal-actions">
          <Button className="cancel-btn" variant="neutral outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button className="success-btn" variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
