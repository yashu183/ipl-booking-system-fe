import React, { useState, useEffect } from "react";
import BookingCard from "../../components/BookingCard/BookingCard";
import Header from "../../components/Header/Header";
import { getBookings } from "../../services/api.service";
import ErrorCard from "../../components/ErrorCard/ErrorCard";
import "./Booking.css";
import Loader from "../../components/Loader/Loader";
import { getUserId } from "../../utils/utils.service";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getBookings(getUserId());
      setBookings(data.bookings);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        {loading ? (
          <Loader />
        ) : error ? (
            <ErrorCard 
              message={error} 
              onClose={() => setError(null)} 
            />
        ) : bookings.length === 0 ? (
          <div className="no-bookings">
            <img src="/duckout.png" alt="" />
            <p class="no-bookings-text">You don't have any bookings yet. Create a new booking to get started with the IPL ticket booking system.</p>
          </div>
        ) : (
          <div className="booking-list">
            {bookings.map(booking => {
              return <BookingCard key={booking.bookingId} booking={booking} onDeleteSuccess={fetchBookings}/>
            }  
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Booking;
