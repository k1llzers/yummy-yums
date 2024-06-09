import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import FriendRequestCard from "../components/FriendRequestCard";
import axios from "axios";
import {useEffect, useState} from "react";

const ManagerAccountPage = () => {
    const defaultPhoto = "https://i.pinimg.com/564x/77/00/70/7700709ac1285b907c498a70fbccea5e.jpg";

    const [accountName, setAccountName] = useState("");
    const [accountEmail, setAccountEmail] = useState("");
    const [accountPhoto, setAccountPhoto] = useState(defaultPhoto);
    const [accountId, setAccountId] = useState("");


    const fetchPersonalInfo = async () => {
        const response = await axios.get("http://localhost:8080/api/user/myself");
        if (response) {
            setAccountName(response.data.surname + " " + response.data.name);
            setAccountEmail(response.data.email);
            setAccountId(response.data.id);
        } else {
            console.log("Error fetching personal info");
        }
    }

    const fetchPhoto = async () => {
        if (!accountId) return
        await axios.get("http://localhost:8080/api/user/get-user-image/" + accountId, {
            responseType: "blob"
        }).then((response) => {
            if(response.data.type === 'application/json') return;
            setAccountPhoto(URL.createObjectURL(response.data));
        });
    }

    useEffect(() => {
        fetchPersonalInfo();
    }, []);

    useEffect(() => {
        fetchPhoto();
    }, [accountId]);

    return (
        <div className={'main-container'}>
            <div className={"top-container"} style={{justifyContent: 'start'}}>
                <div className={'personal-info-container'}>
                    <Card body className="account-card" id={'account-card'}>
                        <Card.Body style={{padding: "0px 30px"}}>
                            <div className="card-container">
                                <div className="account-name">
                                    <Image className="account-card-image"
                                           src={accountPhoto}/>
                                    <div className="account-card-text-info">
                                        <p className="account-title">{accountName}</p>
                                        <p className="account-info">{accountEmail}</p>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className={'bottom-container'}>
                <Tabs
                    id="controlled-tab-example"
                ><Tab eventKey="friend-requests" title="Запити">
                        <div className={'friend-request-card'}>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                        </div>
                </Tab>
                </Tabs>
            </div>
        </div>
    )
}
export default ManagerAccountPage;