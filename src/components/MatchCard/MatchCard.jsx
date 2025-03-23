import React, { useState, useEffect } from 'react';
import './MatchCard.css';
import Button from '../Button/Button';
import MatchInfoCard from "../MatchInfoCard/MatchInfoCard"
import { getUserRole } from '../../utils/utils.service';
import CreateMatchModal from '../CreateMatchModal/CreateMatchModal';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const MatchCard = ({ id, matchDetails, onEditConfirm, onDeleteConfirm, handleBookings }) => {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserRole = async() => {
      try {
        const userRole = await getUserRole();
        if (userRole == "ADMIN") {
          setIsAdmin(true);
        }
      }
      catch(error) {
        setUser(false);
      }
    }
    fetchUserRole()
  }, []);

  return (
    <div className="match-card">
      <div className="match-info">
        <MatchInfoCard matchDetails={matchDetails} />
        {isAdmin && (
          <div className="action-icons">

            <div className="icon edit-icon" onClick = {() => {setIsEditModalOpen(true)}}>
              <FiEdit3 size={25} />
            </div>

            <CreateMatchModal
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false)
              }}
              onConfirm={(formData, id) => { 
                onEditConfirm(formData, id)
              }}
              matchId={id}
              title='Edit Match'
            />

            <div className="icon delete-icon" onClick = {() => {setIsDeleteModalOpen(true)}}>
              <MdDeleteOutline size={25} />
            </div>

            <ConfirmationModal 
              isOpen={isDeleteModalOpen}
              onClose={() => {
                setIsDeleteModalOpen(false)
              }}
              onConfirm={() => { 
                onDeleteConfirm(id)
              }}
            />
          </div>
        )}
      </div>

      <hr className="partition"></hr>

      <div className="pricing-data">
        <div className="ticket-label">
          Available : <span className="active-tkts">{matchDetails.ttlTkts - matchDetails.ttlBookedTkts}</span> / {matchDetails.ttlTkts}
        </div>

        <div className="ticket-price">
          ${matchDetails.price}
        </div>

        <div className="button-wrapper"> <Button variant="outline" className="book-button" onClick = {() => {handleBookings(matchDetails)}}>Book Now</Button> </div>
      </div>

    </div>
  );
};

export default MatchCard;