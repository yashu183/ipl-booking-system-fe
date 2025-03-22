import React from 'react';
import './MatchCard.css';
import Button from '../Button/Button';
import MatchInfoCard from "../MatchInfoCard/MatchInfoCard"

const MatchCard = ({index, matchDetails}) => {
  return (
    <div className="match-card">
      <div className="action-icons">
        <div className="icon edit-icon">

        </div>
        <div className="icon delete-icon">

        </div>
      </div>
      
      <MatchInfoCard matchDetails={matchDetails} />

      <hr className="partition"></hr>

      <div className="pricing-data">
        <div className="ticket-label">
          Available Tickets: <span className="active-tkts">{matchDetails.ttlTkts - matchDetails.ttlBookedTkts}</span> / {matchDetails.ttlTkts - matchDetails.ttlBookedTkts}
        </div>

        <div className="ticket-price">
          ${matchDetails.price}
        </div>

        <div className="button-wrapper"> <Button className="book-button">Book Now</Button> </div>
      </div>

    </div>
  );
};

export default MatchCard;