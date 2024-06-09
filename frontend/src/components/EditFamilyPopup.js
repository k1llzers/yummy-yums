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

const EditFamilyPopup = ({open, setOpen, familyId, myId}) => {
    const [currentFamily, setCurrentFamily] = useState({});
    const [familyName, setFamilyName] = useState("");
    const [currentParticipants, setCurrentParticipants] = useState([]);
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
    const fetchCurrentFamily = async () => {
        const response = await axios.get("http://localhost:8080/api/family/" + familyId);
        if (response) {
            setCurrentFamily(response.data)
            setFamilyName(response.data.name)
            setCurrentParticipants(response.data.participants || []);
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
    }
    useEffect(() => {
        fetchCurrentFamily();
    }, [familyId]);
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
                                <div className="family-page-members-item family-create-members-item">
                                    <div className={'single-family-member-account'}>
                                        <Image className="family-member-card-image"
                                               src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                        Анатолій Журба
                                    </div>
                                    <div className={"button-family"}>
                                        <button className="create-family-form-button">
                                            Переглянути профіль
                                        </button>
                                        <button className="create-family-form-button">
                                            Надіслати запит
                                        </button>
                                    </div>
                                </div>
                                <div className="family-page-members-item family-create-members-item">
                                    <div className={'single-family-member-account'}>
                                        <Image className="family-member-card-image"
                                               src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                        Анатолій Журба
                                    </div>
                                    <div className={"button-family"}>
                                        <button className="create-family-form-button">
                                            Переглянути профіль
                                        </button>
                                        <button className="create-family-form-button">
                                            Надіслати запит
                                        </button>
                                    </div>
                                </div>
                                <div className="family-page-members-item family-create-members-item">
                                    <div className={'single-family-member-account'}>
                                        <Image className="family-member-card-image"
                                               src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                        Анатолій Журба
                                    </div>
                                    <div className={"button-family"}>
                                        <button className="create-family-form-button">
                                            Переглянути профіль
                                        </button>
                                        <button className="create-family-form-button">
                                            Надіслати запит
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'edit-family-bottom-buttons'}>
                        <button className="edit-family-form-button">
                            Покинути сімʼю
                        </button>
                        <button className="edit-family-form-button">
                            Зберегти зміни
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default EditFamilyPopup;