import React from 'react';
import './Confirmation_modal.css';
import Button from '../Button/Button';
import DateFormatter from '../DateFormatter/DateFormatter';
const Confirmation_modal = ({ isOpen, onClose, onConfirm, booking }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-icon" onClick={onClose}>
          &times;
        </button>

        <h2 className="modal-title">Cancel Booking</h2>

        <div className="booking-details">
          <p><strong>Match:</strong> {booking?.match?.homeTeamName} vs {booking?.match?.awayTeamName}</p>
          <p><strong>Date:</strong><DateFormatter date={booking.match.scheduledDate} /></p>
          <p><strong>Tickets:</strong> {booking?.bookedTkts}</p>
        </div>

        <p className="modal-message">Are you sure you want to cancel this booking?</p>

        <div className="modal-actions">
          <Button  variant="error" onClick={onConfirm}>
            Yes, Cancel
          </Button>
          <Button  variant="neutral" onClick={onClose}>
            No, Keep It
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation_modal;
