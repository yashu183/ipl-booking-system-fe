import React from 'react';
import './MatchCard.css';
import Button from '../Button/Button';
import MatchInfoCard from "../MatchInfoCard/MatchInfoCard"

const MatchCard = () => {
  return (
    <div className="match-card">
      <div className="action-icons">
        <div className="icon edit-icon">

        </div>
        <div className="icon delete-icon">

        </div>
      </div>
      
      <MatchInfoCard />

      <hr className="partition"></hr>

      <div className="pricing-data">
        <div className="ticket-label">
          Available Tickets: <span className="active-tkts">2</span> / 20
        </div>

        <div className="ticket-price">
          $50.00
        </div>

        <div className="button-wrapper"> <Button className="book-button">Book Now</Button> </div>
      </div>

    </div>
  );
};

export default MatchCard;