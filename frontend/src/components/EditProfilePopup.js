import {DialogContent} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";
import Dialog from "@mui/material/Dialog";
import '../styles/EditProfilePopup.css'
import {useEffect, useState} from "react";
import axios from "axios";

const EditProfilePopup = ({open, setOpen}) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [staticAccount, setStaticAccount] = useState({
        staticAccName: "",
        staticAccSurname: "",
        staticAccEmail: "",
        staticAccPhoto: null
    });
    const [tempAccount, setTempAccount] = useState({
        tempAccName: "",
        tempAccSurname: "",
        tempAccEmail: "",
        tempAccPassword: "",
        tempAccRepeatedPassword: ""

    });
    const getStaticInfo = async()=>{
        const response = await axios.get("http://localhost:8080/api/user/myself");
        if(response){
            setTempAccount({
                tempAccName: response.data.name,
                tempAccSurname: response.data.surname,
                tempAccEmail: response.data.email
            });
            setStaticAccount({
                staticAccName: response.data.name,
                staticAccSurname: response.data.surname,
                staticAccEmail: response.data.email
            });
        }else {
            console.log("Error fetching personal info");
        }
    }
    const clearFields = () => {
        setTempAccount({
            tempAccName: staticAccount.staticAccName,
            tempAccSurname: staticAccount.staticAccSurname,
            tempAccEmail: staticAccount.staticAccEmail,
            tempAccPassword: "",
            tempAccRepeatedPassword: "",

        });
        setEmailError(false);
        setPasswordError(false);
    }
    const updateTempAccount = (field, value) => {
        setTempAccount((prevAccount) => ({
            ...prevAccount,
            [field]: value
        }));
    };
    useEffect(() => {
        getStaticInfo();
    }, []);
    return (
        <Dialog open={open} maxWidth="md" fullWidth>
            <DialogContent sx={{backgroundColor: '#F9FAEE'}}>
                <IconButton
                    onClick={() => setOpen(false)}
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
                <div className="edit-profile-dialog">
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Редагуйте ім'я"
                        value={tempAccount.tempAccName}
                        onChange={(event)=>updateTempAccount('tempAccName', event.target.value)}
                        variant="standard"
                        multiline
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Редагуйте прізвище"
                        value={tempAccount.tempAccSurname}
                        onChange={(event)=>updateTempAccount('tempAccSurname', event.target.value)}
                        variant="standard"
                        multiline
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Редагуйте email"
                        value={tempAccount.tempAccEmail}
                        onChange={(event)=>updateTempAccount('tempAccEmail', event.target.value)}
                        variant="standard"
                        multiline
                    />
                    <p className="edit-photo-upload-label">Додайте нове фото</p>
                    <Form.Control className="edit-photo-upload" type="file" size="md" accept="image/*" />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Редагуйте пароль"
                        variant="standard"
                        type="password"
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Повторіть пароль"
                        variant="standard"
                        type="password"
                    />
                    <button className="edit-button">
                        Редагувати профіль
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfilePopup;