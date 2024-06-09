import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import '../styles/FriendRequestCard.css'
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
import {useEffect, useState} from "react";
import axios from "axios";
import SingleAccount from "./SingleAccount";
const FriendRequestCard = ({id, reqName, participants, toggleResponse}) =>{
    // console.log("participants "+participants)
    return (
        <Card body className="friend-card">
            <Card.Body>
                <div className="friend-card-container">
                    <div className="friend-request-info">
                        <div className="request-card-text-info">
                            <p className={'request-info-title'}>Назва сімʼї:</p>
                            <p className={'request-info'}>{reqName}</p>
                        </div>
                        <div className="request-card-text-info">
                            <p className="request-info-title">Склад сімʼї:</p>
                            {participants? participants.map((part) => (
                                <SingleAccount
                                    key={part.id}
                                    id={part.id}
                                    pib={part.pib}
                                />
                            )) : <div></div>}

                        </div>
                    </div>
                    <div className="friends-request-button">
                        <button className="friend-card-accept-button"
                                onClick={()=>{
                                    toggleResponse(id, true);
                                }}
                        >Прийняти<VerifiedIcon/>
                        </button>
                        <button className="friend-card-reject-button"
                                onClick={()=>{
                                    toggleResponse(id, false);
                                }}
                        >Відхилити <CancelIcon/>
                        </button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
export default FriendRequestCard;