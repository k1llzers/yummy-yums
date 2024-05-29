import {Autocomplete, Box, DialogContent} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";
import Dialog from "@mui/material/Dialog";
import '../styles/SignUpForm.css'

const SignUpForm = ({open}) => {
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
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть ваше прізвище"
                        variant="standard"
                        multiline
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть ваш email"
                        variant="standard"
                        type="password"
                    />
                    <p className="photo-upload-label">Додайте ваше фото</p>
                    <Form.Control className="sign-up-photo-upload" type="file" size="md" accept="image/*" />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть пароль"
                        variant="standard"
                        type="password"
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Повторіть ваш пароль"
                        variant="standard"
                        type="password"
                    />
                    <button className="sign-up-button">
                        Зареєструватись
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SignUpForm;