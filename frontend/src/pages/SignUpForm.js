import {Autocomplete, Box, DialogContent} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";
import Dialog from "@mui/material/Dialog";
import '../styles/SignUpForm.css'
import {useState} from "react";
import axios from "axios";

const SignUpForm = ({open, setOpen}) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [photo, setPhoto] = useState(null);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const handleSignUp = async() => {
        const user = {
            "surname": surname,
            "name": name,
            "email": email,
            "password": password
        };
        const json = JSON.stringify(user);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        const data = new FormData();
        data.append("user", blob);
        if(photo) data.append("photo", photo);
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/user',
            data: data,
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (response) {
                console.log(response);
            })
            .finally(() => {
                setOpen(false);
                clearFields();
            });
    }

    const handlePhotoChange = (e) => {
        const selectedPhoto = e.target.files[0];
        setPhoto(selectedPhoto);
    }

    const validateSignUp = () => {
        return emailRegex.test(email) && password === repeatedPassword &&
            name.trim().length > 0 && surname.trim().length > 0 && password.trim().length > 0 && repeatedPassword.trim().length > 0;
    }

    const clearFields = () => {
        setName("");
        setSurname("");
        setEmail("");
        setPassword("");
        setRepeatedPassword("");
        setEmailError(false);
        setPasswordError(false);
    }

    return (
        <Dialog open={open} maxWidth="md" fullWidth>
            <DialogContent sx={{backgroundColor: '#F9FAEE'}}>
                <IconButton
                    onClick={() => {setOpen(false); clearFields()}}
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
                <div className="sign-up-dialog">
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть ваше ім'я"
                        variant="standard"
                        multiline
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть ваше прізвище"
                        variant="standard"
                        multiline
                        required
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть ваш email"
                        variant="standard"
                        error={emailError}
                        helperText={emailError ? "Ви ввели некоректний email" : ""}
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setEmailError(!emailRegex.test(email))}
                    />
                    <p className="photo-upload-label">Додайте ваше фото</p>
                    <Form.Control
                        className="sign-up-photo-upload"
                        type="file"
                        size="md"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть пароль"
                        variant="standard"
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Повторіть ваш пароль"
                        variant="standard"
                        type="password"
                        required
                        disabled={password.trim().length === 0}
                        error={passwordError}
                        helperText={passwordError ? "Паролі повинні збігатись" : ""}
                        value={repeatedPassword}
                        onChange={(e) => setRepeatedPassword(e.target.value)}
                        onBlur={(e) => setPasswordError(password !== repeatedPassword)}
                    />
                    <button className="sign-up-button" disabled={!validateSignUp()} onClick={handleSignUp}>
                        Зареєструватись
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SignUpForm;