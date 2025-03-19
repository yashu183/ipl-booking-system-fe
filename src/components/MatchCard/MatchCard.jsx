import React from 'react';
import './MatchCard.css';
import Button from '../Button/Button';

const MatchCard = () => {
  return (
    <div className="match-card">
      <div className="action-icons">
        <div className="icon edit-icon">

        </div>
        <div className="icon delete-icon">

        </div>
      </div>

      <div className="teams-container">
        <div className="team">
          <div className="team-logo">
            <img
              src="/rcb.png"
              alt="Team A Logo"
              className="team-logo-img"
            />
          </div>
          <div className="team-name">RCB</div>
        </div>

        <div className="match-metadata">
          <p class="versus">vs</p>
          <div class="date">
            <img src="/calander.svg" alt="location" width="14px" height="14px"/>
            <p> : Mar 23, 2025 | 7:30 PM</p>
          </div>
          <div class="venue">
            <img src="/location.svg" alt="location" width="14px" height="14px"/>
            <p> : M Chinnaswammy</p>
          </div>
        </div>

        <div className="team">
          <div className="team-logo">
            <img
              src="/csk.png"
              alt="Team B Logo"
              className="team-logo-img"
            />
          </div>
          <div className="team-name">CSK</div>
        </div>
      </div>
      
      <hr className="partition"></hr>

      <div class="pricing-data">
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