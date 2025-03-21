import React from 'react';
import './ConfirmationModal.css';
import Button from '../Button/Button';
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-icon" onClick={onClose}>
          &times;
        </button>

        <h4 className="modal-title">Cancel Booking</h4>

        <p className="modal-message">Are you sure you want to cancel this booking?</p>

        <div className="modal-actions">
          <Button  variant="neutral" onClick={onClose}>
            No, Keep It
          </Button>
          <Button  variant="error" onClick={onConfirm}>
            Yes, Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
