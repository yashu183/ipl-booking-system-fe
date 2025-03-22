import React, { useState } from "react";
import "./BookingConfirmationModal.css";
import Button from "../Button/Button";
const BookingConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  const [count, setCount] = useState(1);
  const [error, setError] = useState(null);

  const handleConfirm = () => {
    // Add the match.ttlTkts as max limit
    if (count < 1 || count > 1000) {
      setError(`Maximum tickets limit exceeded!`);
      return;
    }
    setError(null);
    onConfirm(count);
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

        <div className="input-container">
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
          <Button variant="neutral" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
