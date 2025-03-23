import React, { useState, useEffect } from 'react';
import './MatchCard.css';
import Button from '../Button/Button';
import MatchInfoCard from "../MatchInfoCard/MatchInfoCard"
import { getUserRole } from '../../utils/utils.service';
import CreateMatchModal from '../CreateMatchModal/CreateMatchModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';

const MatchCard = ({id, matchDetails, onEditConfirm, onDeleteConfirm}) => {

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

  const handleDeleteClick = () => {
    console.log(id)
  }

  return (
    <div className="match-card">
      {isAdmin && (
        <div className="action-icons">

          <div className="icon edit-icon" onClick = {() => {setIsEditModalOpen(true)}}>
            Edit
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
            Delete
          </div>

          <DeleteConfirmationModal 
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