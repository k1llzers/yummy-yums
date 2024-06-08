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
import {useState} from "react";
import axios from "axios";

const CreateFamilyPopup = ({open, setOpen}) => {
    const [inputFamilyName, setInputFamilyName] = useState("");
    const [inputNameUser, setInputNameUser] = useState("");
    const [checkUser, setCheckUser]=useState("");
    const clearFields= ()=>{
        setInputNameUser("");
        setInputFamilyName("")
    }
    const checkExistingUser = async () => {
        if (inputNameUser.length === 0) return;
        // const response = await axios.get("http://localhost:8080/api/product/can-be-added-to-recipe/" + ingredient);
        // if(response.error) {
        //     setCheckUser(false);
        // } else {
        //     console.log(response.data)
        //     setCheckUser(response.data);
        // }
    }
    const validateCreatingFamily = () =>{
        return inputFamilyName!=='';
    }
    return (
        <Dialog open={open} maxWidth="md" fullWidth>
            <DialogContent sx={{backgroundColor: '#F9FAEE'}}>
                <IconButton
                    onClick={()=>{
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
                        onChange={(event)=>{
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
                                    // value{inputNameUser}
                                    // error={!checkUser}
                                    // helperText={!checkUser ? "Такого користувача не існує" : ""}
                                />
                            </Search>
                            <div className={'family-create-members '}>
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