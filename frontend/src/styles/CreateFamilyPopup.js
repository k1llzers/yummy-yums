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
import useSlot from "@mui/material/utils/useSlot";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const CreateFamilyPopup = ({open, setOpen}) => {
    const [inputFamilyName, setInputFamilyName] = useState("");
    const [usersForRequest, setUsersForRequest] = useState([]);
    const [requests, setRequests] = useState([]);
    const clearFields = () => {
        setInputFamilyName("");
        setRequests([]);
    }
    const checkExistingUser = async (curName) => {
        if (curName.length === 0) return;
        const response = await axios.get("http://localhost:8080/api/user/by-restrict/" + curName);
        if (response.error) {
            setRequests([]);
        } else {
            console.log("input name user : " + curName);
            setUsersForRequest(response.data);
        }
    }
    const validateCreatingFamily = () => {
        return inputFamilyName !== '';
    }
    const handleRequestToggle = (id) => {
        setRequests((prevRequests) => {
            if (prevRequests.includes(id)) {
                return prevRequests.filter(requestId => requestId !== id);
            } else {
                return [...prevRequests, id];
            }
        });
    };
    const fetchPhoto = async (userId) => {
        if (!userId) return
        await axios.get("http://localhost:8080/api/user/get-user-image/" + userId, {
            responseType: "blob"
        }).then((response) => {
            if(response.data.type === 'application/json') return;
            return(URL.createObjectURL(response.data));
        });
    }
    const isRequested = (userId)=>{ return requests.includes(userId);}
    const OfferedUser = ({user}) => {
        return (
            <div className="family-page-members-item family-create-members-item">
                <div className={'single-family-member-account'}>
                    <Image className="family-member-card-image"
                           src={user.photo}/>
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
                    onClick={() => {
                        clearFields();
                        setOpen(false);
                    }}
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 25,
                        top: 15,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon fontSize="large"/>
                </IconButton>
                <div className="edit-family-dialog">
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть назву сімʼї"
                        onChange={(event) => {
                            setInputFamilyName(event.target.value);
                        }}
                        variant="standard"
                    />
                    <div id={'add-members-label'}>
                        <label className={'members-label'}>Додайте членів сімʼї:</label>
                    </div>
                    <div id={'new-member-id'} className={'add-new-members-container'}>
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
                                        console.log("current name " + nameCurrent)
                                        if (nameCurrent==='')setUsersForRequest([])
                                        else checkExistingUser(nameCurrent);
                                    }}
                                />
                            </Search>
                            <div className={'family-create-members '}>
                                {usersForRequest.map((propose)=>(
                                    <OfferedUser
                                        key={propose.id}
                                        photo={fetchPhoto(propose.id)}
                                        user={propose}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div id={'save-new-family-container'} className={'edit-family-bottom-buttons'}>
                        <button id={'save-new-family-button'} className="edit-family-form-button"
                                disabled={!validateCreatingFamily()}>
                            Зберегти зміни
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default CreateFamilyPopup;