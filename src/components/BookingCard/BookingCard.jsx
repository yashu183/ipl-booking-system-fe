import React from 'react';
import './BookingCard.css';
import MatchInfoCard from '../MatchInfoCard/MatchInfoCard';

const BookingCard = () => {
    return (
        <div className="booking-card">
            <div className="booking-card-content">
                <MatchInfoCard />
            </div>

            <div className="booking-card-footer">
                <div className="price">100</div>
            </div>
        </div>
    );
};

export default BookingCard;