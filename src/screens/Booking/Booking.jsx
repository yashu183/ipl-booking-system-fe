import React, { useState, useEffect } from "react";
import BookingCard from "../../components/BookingCard/BookingCard";
import Header from "../../components/Header/Header";
import { getBookings } from "../../services/api.service";
import "./Booking.css";
const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings(3); //pass userID
        setBookings(data.responseData.bookings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        {loading ? (
          <p className="default-text">Loading bookings...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : bookings.length === 0 ? (
          <p className="default-text">No bookings found</p>
        ) : (
          <div className="journey-list">
            {bookings.map((booking) => (
              <BookingCard key={booking.bookingId} booking={booking} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Booking;
