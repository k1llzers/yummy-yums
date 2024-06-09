import {Button, DialogContent, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const EditCategoriesPopup = ({open, setOpen}) => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    const fetchCategories = async () => {
        const response = await axios.get("http://localhost:8080/api/category/with-can-be-deleted");
        if (response) {
            setCategories(response.data)
        } else {
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
        setNewCategory("");
    }

    const deleteCategory = async (id) => {
        await axios.delete("http://localhost:8080/api/category/" + id);
        fetchCategories();
    }

    useEffect(() => {
        if (open) fetchCategories();
    }, [open]);

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
                    <TableContainer component={Paper} sx={{width: '70%'}}>
                        <Table sx={{ minWidth: 250, maxWidth: '70%'}} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{fontSize: '1.2rem'}}>Всі категорії</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{backgroundColor: '#F9FAEE'}}>
                                {
                                   categories.map((category) => (
                                       <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                           <TableCell align="center">{category.name}</TableCell>
                                           <TableCell align="center">
                                               <Button
                                                   className="comment-delete-button"
                                                   onClick={() => deleteCategory(category.id)}
                                                   disabled={!category.canBeDeleted}
                                               >
                                                   <DeleteOutlineIcon/>
                                               </Button>
                                           </TableCell>
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