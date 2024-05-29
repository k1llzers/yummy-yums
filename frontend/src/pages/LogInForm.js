import {DialogContent} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import '../styles/LogInForm.css'

const LogInForm = ({open}) => {
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
                <div className="login-dialog">
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть ваш email"
                        variant="standard"
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть пароль"
                        variant="standard"
                        type="password"
                    />
                    <div className="login-buttons-container">
                        <button className="login-button">
                            Увійти
                        </button>
                        <button className="login-button">
                            Зареєструватись
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LogInForm;