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

const EditFamilyPopup = ({open, setOpen}) => {
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
                        // clearFields();
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
                        variant="standard"
                    />
                        <label className={'members-label'}>Члени сімʼї:</label>
                    <div className="family-page-members" id={'family-member-list'}>
                        <button className="family-page-members-item">
                            <div className={'single-family-member-account'}>
                                <Image className="family-member-card-image"
                                       src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                Анатолій Журба
                            </div>
                        </button>
                        <button className="family-page-members-item">
                            <div className={'single-family-member-account'}>
                                <Image className="family-member-card-image"
                                       src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                Анатолій Журба
                            </div>
                        </button>
                        <button className="family-page-members-item">
                            <div className={'single-family-member-account'}>
                                <Image className="family-member-card-image"
                                       src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                Анатолій Журба
                            </div>
                        </button>
                        <button className="family-page-members-item">
                            <div className={'single-family-member-account'}>
                                <Image className="family-member-card-image"
                                       src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                Анатолій Журба
                            </div>

                        </button>
                        <button className="family-page-members-item">
                            <div className={'single-family-member-account'}>
                                <Image className="family-member-card-image"
                                       src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                Анатолій Журба
                            </div>
                        </button>
                        <button className="family-page-members-item">
                            <div className={'single-family-member-account'}>
                                <Image className="family-member-card-image"
                                       src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                Анатолій Журба
                            </div>
                        </button>
                    </div>
                    <div className={'add-new-members-container'}>
                        <div>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon sx={{color: '#3D6827'}}/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Імʼя нового члена"
                                    inputProps={{'aria-label': 'search'}}
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