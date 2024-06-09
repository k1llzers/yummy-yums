import {DialogContent, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import {useEffect, useState} from "react";

const EditCategoriesPopup = ({open, setOpen}) => {
    console.log(open)
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    const fetchCategories = async () => {
        const response = await axios.get("http://localhost:8080/api/category");
        if (response) {
            setCategories(response.data)
        }else {
            setCategories([])
        }
    }

    const validateCategory = () => {
        return categories.some(item => item.name === newCategory);
    }

    const addCategory = async () => {
        await axios.post("http://localhost:8080/api/category", {
            name: newCategory
        });
        fetchCategories();
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Dialog open={open} maxWidth="md" fullWidth>
            <DialogContent sx={{backgroundColor: '#F9FAEE'}}>
                <IconButton
                    onClick={() => {setOpen(false); setNewCategory("")}}
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
                        label="Введіть назву нової категорії"
                        value={newCategory}
                        error={validateCategory()}
                        helperText={validateCategory() ? "Така категорія вже існує" : ""}
                        onChange={(e) => setNewCategory(e.target.value)}
                        variant="standard"
                    />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Всі категорії</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{backgroundColor: '#F9FAEE'}}>
                                {
                                   categories.map((category) => (
                                       <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                           <TableCell align="center">{category.name}</TableCell>
                                       </TableRow>
                                   ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <button className="create-recipe-button" disabled={newCategory.length === 0 || validateCategory()} onClick={addCategory}>
                        Додати категорію
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )

}

export default EditCategoriesPopup;