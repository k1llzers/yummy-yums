import {DialogContent} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import '../styles/LogInForm.css'
import {useAuth} from "../provider/authProvider";
import Alert from '@mui/material/Alert';
import {useState} from "react";
import axios from "axios";

const LogInForm = ({openLogin, setOpenLogin}) => {
    const {setToken, setRole, setId} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const handleLogIn = async () => {
        const response = await axios.post("http://localhost:8080/api/auth/login", {
            username: email,
            password: password
        });
        if (response.data.error) {
            setErrorMessage(response.data.error)
            setTimeout(() => setErrorMessage(""), 3000)
        } else {
            setToken(response.data.token);
            setRole(response.data.role);
            setId(response.data.id);
            setOpenLogin(false);
            clearFields();
        }
    }

    const validateLogIn = () => {
        return emailRegex.test(email) && email.trim().length > 0 && password.trim().length > 0;
    }

    const clearFields = () => {
        setEmail("");
        setPassword("");
        setEmailError(false);
    }

    return (
        <Dialog open={openLogin} maxWidth="md" fullWidth>
            <DialogContent sx={{backgroundColor: '#F9FAEE'}}>
                <IconButton
                    onClick={() => {setOpenLogin(false); clearFields();}}
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
                <div className="login-dialog">
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть email"
                        variant="standard"
                        error={emailError}
                        helperText={emailError ? "Ви ввели некоректний email" : ""}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setEmailError(!emailRegex.test(email))}
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть пароль"
                        variant="standard"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="login-button" onClick={handleLogIn} disabled={!validateLogIn()}>
                        Увійти
                    </button>
                </div>
            </DialogContent>
            {errorMessage && <Alert severity="error" sx={{fontFamily: "Gentium Plus",
                fontSize: '1.1rem'}} onClose={() => setErrorMessage("")}>{errorMessage}</Alert>}
        </Dialog>
    )
}

export default LogInForm;