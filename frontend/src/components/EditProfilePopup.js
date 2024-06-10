import {DialogContent} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";
import Dialog from "@mui/material/Dialog";
import '../styles/EditProfilePopup.css'
import {useEffect, useState} from "react";
import axios from "axios";

const EditProfilePopup = ({open, setOpen, updatePersonalInfo}) => {
    const [passwordError, setPasswordError] = useState(false);
    const [staticAccount, setStaticAccount] = useState({
        staticAccName: "",
        staticAccSurname: "",
        staticAccId: ""
    });
    const [tempAccount, setTempAccount] = useState({
        tempAccName: "",
        tempAccSurname: "",
        tempAccPassword: "",
        tempAccRepeatedPassword: "",
        tempAccPhoto: null
    });
    const getStaticInfo = async()=>{
        const response = await axios.get("http://localhost:8080/api/user/myself");
        if(response){
            setTempAccount((prevState) => ({
                ...prevState,
                tempAccName: response.data.name,
                tempAccSurname: response.data.surname,
            }));
            setStaticAccount((prevState) => ({
                ...prevState,
                staticAccName: response.data.name,
                staticAccSurname: response.data.surname,
                staticAccId: response.data.id
            }));
        } else {
            console.log("Error fetching personal info");
        }
    }

    const handleEditProfile = async () => {
        const updatedUser = {
            "id": staticAccount.staticAccId,
            "surname": tempAccount.tempAccSurname,
            "name": tempAccount.tempAccName,
            "password": tempAccount.tempAccPassword ? tempAccount.tempAccPassword : null
        }
        const json = JSON.stringify(updatedUser);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        const data = new FormData();
        data.append("user", blob);
        if(tempAccount.tempAccPhoto) data.append("photo", tempAccount.tempAccPhoto);
        axios({
            method: 'put',
            url: 'http://localhost:8080/api/user',
            data: data
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (response) {
                console.log(response);
            })
            .finally(() => {
                setOpen(false);
                updatePersonalInfo();
                getStaticInfo();
                clearFields();
            });
    }

    const clearFields = () => {
        setTempAccount({
            tempAccName: staticAccount.staticAccName,
            tempAccSurname: staticAccount.staticAccSurname,
            tempAccPassword: "",
            tempAccRepeatedPassword: "",
            tempAccPhoto: null
        });
        setPasswordError(false);
    }
    const checkEnteredPassword = () =>{
        return !tempAccount.tempAccPassword;
    }
    const checkEqualPasswords= () =>{
        return tempAccount.tempAccPassword!==tempAccount.tempAccRepeatedPassword;
    }
    const updateTempAccount = (field, value) => {
        setTempAccount((prevAccount) => ({
            ...prevAccount,
            [field]: value
        }));
    };
    const validateEditingAccount = () =>{
        return checkEqualPasswords() || tempAccount.tempAccName.trim().length === 0 || tempAccount.tempAccSurname.trim().length === 0;
    }
    useEffect(() => {
        getStaticInfo();
    }, []);
    return (
        <Dialog open={open} maxWidth="md" fullWidth>
            <DialogContent sx={{backgroundColor: '#F9FAEE'}}>
                <IconButton
                    onClick={() => {setOpen(false);  clearFields();}}
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
                    <p className="edit-photo-upload-label">Додайте нове фото</p>
                    <Form.Control
                        className="edit-photo-upload"
                        type="file"
                        size="md"
                        accept="image/*"
                        onChange={(e) =>  setTempAccount((prevState) => ({
                            ...prevState,
                            tempAccPhoto: e.target.files[0]
                        }))}
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Редагуйте пароль"
                        variant="standard"
                        type="password"
                        value={tempAccount.tempAccPassword}
                        onChange={(event)=>{updateTempAccount('tempAccPassword', event.target.value)}}
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Повторіть пароль"
                        variant="standard"
                        type="password"
                        error={passwordError}
                        helperText={passwordError? "Паролі повинні бути однаковими!": ""}
                        value={tempAccount.tempAccRepeatedPassword}
                        disabled={ checkEnteredPassword()}
                        onChange={(event)=>{updateTempAccount('tempAccRepeatedPassword', event.target.value)}}
                        onBlur={()=> setPasswordError(tempAccount.tempAccPassword!==tempAccount.tempAccRepeatedPassword)}
                    />
                    <button className="edit-button" disabled={validateEditingAccount()} onClick={handleEditProfile}>
                        Редагувати профіль
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfilePopup;