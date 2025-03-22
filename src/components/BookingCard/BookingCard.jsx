import React, { useState } from "react";
import "./BookingCard.css";
import MatchInfoCard from "../MatchInfoCard/MatchInfoCard";
import Button from "../Button/Button";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { cancelBooking } from "../../services/api.service";
import DateFormatter from "../DateFormatter/DateFormatter";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";


const BookingCard = ({ booking, isAdmin , onDeleteSuccess}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    console.log(`Booking ${booking.bookingId} canceled`);
    setIsModalOpen(false);
    const data = await cancelBooking(booking.bookingId);
    onDeleteSuccess();
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
          <img src="/tickets.svg" alt="tickets" width="28px" height="28px" />
          <p className="num-of-tkts"> {" "} {booking.bookedTkts}</p>
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
          {isAdmin && (
            <div className="user-details">
              <div className="user-name"> <FaRegUser size={18} /><p>: { booking.user.name.split(" ")[0][0].toUpperCase() + booking.user.name.split(" ")[0].slice(1) }</p> </div>
              <div className="user-email"><MdOutlineAlternateEmail size={18} /><p>: { booking.user.email }</p></div>
            </div>
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
