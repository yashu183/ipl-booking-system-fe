import React, { useState } from "react";
import "./DeleteConfirmationModal.css";
import Button from "../Button/Button";
const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm
}) => {

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-icon" onClick={onClose}>
          &times;
        </button>

        <h4 className="modal-title">Confirm Deletion</h4>

        <p className="modal-message">Are you sure you want to delete this match?</p>
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

export default DeleteConfirmationModal;
