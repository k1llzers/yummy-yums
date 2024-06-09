import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import '../styles/FriendRequestCard.css'
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
import {useEffect, useState} from "react";
import axios from "axios";
const FriendRequestCard = ({id, reqName, participants, toggleResponse}) =>{
    const SingleAccount = ({id, pib})=>{
        const defaultUserPhoto = "https://i.pinimg.com/564x/77/00/70/7700709ac1285b907c498a70fbccea5e.jpg";
        const [userPhoto, setUserPhoto] = useState(defaultUserPhoto);
        const fetchUserPhoto = async () => {
            if (!id) return;
            await axios.get("http://localhost:8080/api/user/get-user-image/" +id, {
                responseType: "blob"
            }).then((response) => {
                if(response.data.type === 'application/json') return;
                setUserPhoto(URL.createObjectURL(response.data));
            });
        }
        useEffect(() => {
            fetchUserPhoto();
        }, [id]);
        return (
            <div className={'single-account'}>
                <Image className="friend-card-image"
                       src={userPhoto}/>
                {pib}
            </div>
        );
    }
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