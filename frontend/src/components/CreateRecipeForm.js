import '../styles/CreateRecipeForm.css'
import Dialog from '@mui/material/Dialog';
import {DialogContent} from "@mui/material";
import StyledTextField from "../styled components/StyledTextField";
import Form from 'react-bootstrap/Form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CreateRecipeForm = ({open}) => {
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
                        label="Введіть інгредієнт"
                        variant="standard"
                        multiline
                    />
                    <StyledTextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть кількість інгредієнта (шт/мл/г)"
                        variant="standard"
                        multiline
                    />
                    <TableContainer component={Paper} sx={{width: '50%', marginBottom: "30px"}}>
                        <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
                            <TableHead sx={{backgroundColor: '#E2F0D2', color: '#3D6827'}}>
                                <TableRow>
                                    <TableCell sx={{color: "#3D6827", fontFamily: "Gentium Plus", fontSize: "1.1rem"}} align="center">Назва інгредієнту</TableCell>
                                    <TableCell sx={{color: "#3D6827", fontFamily: "Gentium Plus", fontSize: "1.1rem"}} align="center">Кількість</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{fontFamily: "Gentium Plus", fontSize: "1rem"}} align="center">Помідори</TableCell>
                                    <TableCell sx={{fontFamily: "Gentium Plus", fontSize: "1rem"}} align="center">2 шт</TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{fontFamily: "Gentium Plus", fontSize: "1rem"}} align="center">Сіль</TableCell>
                                    <TableCell sx={{fontFamily: "Gentium Plus", fontSize: "1rem"}} align="center">200 г</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <p className="photo-upload-label">Додайте фото готової страви</p>
                    <Form.Control className="recipe-photo-upload" type="file" size="md" accept="image/*" />
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