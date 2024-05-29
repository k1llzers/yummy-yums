import {Autocomplete, Box, DialogContent} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";
import Dialog from "@mui/material/Dialog";
import '../styles/EditProfilePopup.css'

const EditProfilePopup = ({open}) => {
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
                <div className="edit-profile-dialog">
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Редагуйте ім'я"
                        variant="standard"
                        multiline
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Редагуйте прізвище"
                        variant="standard"
                        multiline
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Редагуйте email"
                        variant="standard"
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
                        Редагувати
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfilePopup;