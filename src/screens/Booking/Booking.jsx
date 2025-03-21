import React, { useState, useEffect } from "react";
import BookingCard from "../../components/BookingCard/BookingCard";
import Header from "../../components/Header/Header";
import { getBookings } from "../../services/api.service";
import ErrorCard from "../../components/ErrorCard/ErrorCard";
import "./Booking.css";
import Loader from "../../components/Loader/Loader";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings(2); //pass userID
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
              console.log(booking);
              booking.match = {
                homeTeamName: "RCB",
                awayTeamName: "CSK",
                scheduledDate: new Date(),
                venue: "M Chinnaswammy"
              }
              return <BookingCard key={booking.bookingId} booking={booking} />
            }  
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Booking;
