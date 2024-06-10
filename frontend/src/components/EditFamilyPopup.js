import Dialog from "@mui/material/Dialog";
import {DialogContent} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Image from "react-bootstrap/Image";
import Search from "../styled components/Search";
import SearchIconWrapper from "../styled components/SearchIconWrapper";
import SearchIcon from "@mui/icons-material/Search";
import StyledInputBase from "../styled components/StyledInputBase";
import '../styles/EditFamilyPopup.css'
import {useEffect, useState} from "react";
import axios from "axios";

const EditFamilyPopup = ({open, setOpen, familyId, myId, toggleFamily, changeList}) => {
    const [currentFamily, setCurrentFamily] = useState({});
    const [requests, setRequests] = useState([]);
    const [familyName, setFamilyName] = useState("");
    const [currentParticipants, setCurrentParticipants] = useState([]);
    const [confirmRequests, setConfirmRequests] = useState([]);

    const [usersForRequest, setUsersForRequest] = useState([]);

    const defaultUserPhoto = "https://i.pinimg.com/564x/77/00/70/7700709ac1285b907c498a70fbccea5e.jpg";

    const checkExistingUser = async (curName) => {
        if (curName.length === 0) return;
        try {
            const response = await axios.get(`http://localhost:8080/api/user/by-restrict/${curName}`);

            if (response.data && Array.isArray(response.data)) {
                const filteredUsers = response.data.filter(user =>
                    !currentParticipants.some(participant => participant.id === user.id)
                );
                setUsersForRequest(filteredUsers);
            } else {
                setUsersForRequest([]);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsersForRequest([]);
        }
    }
    const FamilyMemberButton = ({id, pib})=>{
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
            <button className="family-page-members-item">
                <div className={'single-family-member-account'}>
                    <Image className="family-member-card-image"
                           src={userPhoto}
                           style={{objectFit:"cover"}}
                    />
                    {myId == id ? <a
                        className="card-title-a"
                        href={``}
                        style={{color:"#3D6827"

                        }}
                    >
                        {pib}
                    </a> : <a
                        className="card-title-a"
                        href={`/user/${id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{color:"#3D6827"}}
                    >
                        {pib}
                    </a>}
                </div>
            </button>
        );
    }
    const handleEditingFamily = async (toChange) =>{
        //не забути змінити сonfirmRequests, бо працюватиме некоректно в разі якщо на інпуті не змінюватиметься сімя і імя нормально встановити тільлки після клер філдс
        toChange? await axios.put("http://localhost:8080/api/family",
            {
                "id":familyId,
                "name":familyName,
                "usersId": requests
            }): await axios.put("http://localhost:8080/api/family/leave/"+familyId);
        setConfirmRequests(requests);
        setUsersForRequest([]);
        toggleFamily();
        changeList();
        setOpen(false)
    }
    const fetchCurrentFamily = async () => {
        const response = await axios.get("http://localhost:8080/api/family/" + familyId);
        if (response) {
            setCurrentFamily(response.data)
            setFamilyName(response.data.name)
            setCurrentParticipants(response.data.participants || []);
            const requestIds = (response.data.requests || []).map(request => request.id);
            setRequests(requestIds);
            setConfirmRequests(requestIds);
        } else {
            setCurrentFamily({
                "id": 0,
                "name": "",
                "participants": []
            })
        }
    }
    const clearFields = () => {
        setFamilyName(currentFamily.name);
        // setCurrentParticipants([]);
        setRequests(confirmRequests);
        setUsersForRequest([]);
    }
    useEffect(() => {
        fetchCurrentFamily();
    }, [familyId]);
    const isRequested = (userId)=>{return requests.includes(userId);}
    const handleRequestToggle = (userId) => {
        setRequests((prevRequests) => {
            if (prevRequests.includes(userId)) {
                return prevRequests.filter(requestId => requestId !== userId);
            } else {
                return [...prevRequests, userId];
            }
        });
    };
    const OfferedEditUser = ({user}) => {
        const defaultUserPhoto = "https://i.pinimg.com/564x/77/00/70/7700709ac1285b907c498a70fbccea5e.jpg";
        const [userPhoto, setUserPhoto] = useState(defaultUserPhoto);
        const fetchUserPhoto = async () => {
            if (!user) return;
            await axios.get("http://localhost:8080/api/user/get-user-image/" + user.id, {
                responseType: "blob"
            }).then((response) => {
                if(response.data.type === 'application/json') return;
                setUserPhoto(URL.createObjectURL(response.data));
            });
        }
        useEffect(() => {
            fetchUserPhoto();
        }, [user]);

        return (
            <div className="family-page-members-item family-create-members-item">
                <div className={'single-family-member-account'}>
                    <Image className="family-member-card-image"
                           src={userPhoto}
                           style={{objectFit:"cover"}}
                    />
                    {user.pib}
                </div>
                <div className={"button-family"}>
                    <button
                        className="create-family-form-button"
                    >
                        <a
                            className="card-title-a"
                            href={`/user/${user.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Переглянути профіль
                        </a>
                    </button>
                    <button className="create-family-form-button"
                            onClick={() => handleRequestToggle(user.id)}
                    >
                        {isRequested(user.id) ? 'Скасувати запит' : 'Надіслати запит'}
                    </button>
                </div>
            </div>
        );
    }
    return (
        <Dialog open={open} maxWidth="md" fullWidth>
            <DialogContent sx={{backgroundColor: '#F9FAEE'}}>
                <IconButton
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 25,
                        top: 15,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    onClick={()=>{
                        clearFields();
                        setOpen(false);
                    }}
                >
                    <CloseIcon fontSize="large"/>
                </IconButton>
                <div className="edit-family-dialog">
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Редагуйте назву сімʼї"
                        value={familyName}
                        onChange={(event)=>setFamilyName(event.target.value)}
                        variant="standard"
                    />
                        <label className={'members-label'}>Члени сімʼї:</label>
                    <div className="family-page-members" id={'family-member-list'}>
                        {currentParticipants && currentParticipants.map((user) => (
                            <FamilyMemberButton
                                key={user.id}
                                id={user.id}
                                pib={user.pib}
                            />
                        ))}
                    </div>
                    <div className={'add-new-members-container'}>
                        <div>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon sx={{color: '#3D6827'}}/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Імʼя або e-mail нового члена"
                                    inputProps={{'aria-label': 'search'}}
                                    onChange={(event) => {
                                        const nameCurrent = event.target.value;
                                        if (nameCurrent==='')setUsersForRequest([])
                                        else checkExistingUser(nameCurrent);
                                    }}
                                />
                            </Search>
                            <div className={'family-page-members family-create-members '}>
                                {usersForRequest.map((propose)=>(
                                    <OfferedEditUser
                                        key={propose.id}
                                        user={propose}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={'edit-family-bottom-buttons'}>
                        <button className="edit-family-form-button"
                                onClick={() => handleEditingFamily(false)}
                        >
                            Покинути сімʼю
                        </button>
                        <button
                            className="edit-family-form-button"
                            onClick={() => handleEditingFamily(true)}
                        >
                            Зберегти зміни
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default EditFamilyPopup;