import '../styles/CreateRecipeForm.css'
import Dialog from '@mui/material/Dialog';
import {DialogContent} from "@mui/material";
import StyledTextField from "../styled components/StyledTextField";




const CreateRecipeForm = ({open}) => {
    return (
        <Dialog open={open} maxWidth="md" fullWidth>
            <DialogContent>
                <div className="create-recipe-dialog">
                    <StyledTextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть назву рецепту"
                        variant="standard"
                        multiline
                    />
                    <StyledTextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть інгредієнти"
                        variant="standard"
                        multiline
                    />
                    <StyledTextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть короткий опис"
                        variant="standard"
                        multiline
                    />
                    <StyledTextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть детальні інструкції з приготування"
                        variant="standard"
                        multiline
                    />
                    <button className="create-recipe-button">
                        Надіслати рецепт на підтвердження
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateRecipeForm;