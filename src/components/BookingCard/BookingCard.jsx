import React, { useState } from "react";
import "./BookingCard.css";
import MatchInfoCard from "../MatchInfoCard/MatchInfoCard";
import Button from "../Button/Button";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { cancelBooking } from "../../services/api.service";
import DateFormatter from "../DateFormatter/DateFormatter";
const BookingCard = ({ booking, isAdmin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    console.log(`Booking ${booking.bookingId} canceled`);
    setIsModalOpen(false);
    const data = await cancelBooking(booking.bookingId);
    window.location.reload();
  };

  return (
    <div className="booking-card">
      <div className="booking-card-header">
        <p>
          Booked On: <DateFormatter date={booking.bookedDate}></DateFormatter>
        </p>
      </div>
      <div className="booking-card-content">
        <MatchInfoCard matchDetails={booking} />
      </div>
      <div className="booking-card-footer">
        <div className="price">
          <img src="/tickets.svg" alt="tickets" width="30px" height="30px" />
          <p> : {booking.bookedTkts}</p>
        </div>
        <div>
          {!isAdmin && (
            <Button
              className="cancel-button"
              variant="error"
              onClick={handleCancelClick}
            >
              Cancel Booking
            </Button>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmCancel}
        booking={booking}
      />
    </div>
  );
};

export default BookingCard;
