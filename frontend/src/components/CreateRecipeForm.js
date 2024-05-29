import TextField from "@mui/material/TextField";
import '../styles/CreateRecipeForm.css'
import Dialog from '@mui/material/Dialog';
import {Button, DialogContent} from "@mui/material";
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
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть назву рецепту"
                        variant="standard"
                        multiline
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть інгредієнт"
                        variant="standard"
                        multiline
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть кількість інгредієнта (шт/мл/г)"
                        variant="standard"
                        multiline
                    />
                    <button className="add-ingredient-button">
                        Додати інгредієнт
                    </button>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Назва інгредієнту</TableCell>
                                    <TableCell align="center">Кількість</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{backgroundColor: '#F9FAEE'}}>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">Помідори</TableCell>
                                    <TableCell align="center">2 шт</TableCell>
                                    <TableCell align="center">
                                        <Button><CloseIcon/></Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">Сіль</TableCell>
                                    <TableCell align="center">200 г</TableCell>
                                    <TableCell align="center">
                                        <Button><CloseIcon/></Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <p className="photo-upload-label">Додайте фото готової страви</p>
                    <Form.Control className="recipe-photo-upload" type="file" size="md" accept="image/*" />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть короткий опис"
                        variant="standard"
                        multiline
                    />
                    <TextField
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