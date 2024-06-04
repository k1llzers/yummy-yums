import TextField from "@mui/material/TextField";
import '../styles/CreateRecipeForm.css'
import Dialog from '@mui/material/Dialog';
import {Button, DialogContent, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
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
import {useEffect, useState} from "react";
import axios from "axios";

const CreateRecipeForm = ({open, setOpen}) => {
   const [categories, setCategories] = useState([]);

   const [category, setCategory] = useState(0);
   const [title, setTitle] = useState("");
   const [photo, setPhoto] = useState([]);
   const [description, setDescription] = useState("");
   const [instruction, setInstruction] = useState("");
   const [ingredient, setIngredient] = useState("");
   const [number, setNumber] = useState("");
   const [ingredients, setIngredients] = useState({});

   const fetchCategories = async () => {
       const response = await axios.get("http://localhost:8080/api/category");
       setCategories(response.data)
   }

    useEffect(() => {
        fetchCategories();
    }, []);

   const handleSubmitRecipe = async () => {
       setOpen(false);
       clearFields();
       // const response = await axios.po
   }

   const clearFields = () => {
       setCategory(0);
       setTitle("");
       setPhoto([]);
       setDescription("");
       setInstruction("");
       setIngredient("");
       setNumber("");
   }

   const validateAddProduct = () => {
       return ingredient.length > 0 && number.length > 0 && !ingredients[ingredient];
   }

    const handleAddProduct = () => {
        setIngredients(prevState => ({
            ...prevState,
            [ingredient]: number
        }));
        setIngredient("");
        setNumber("");
    }

    const handleDeleteProduct = (ingredient) => {
        setIngredients(Object.assign({}, Object.keys(ingredients).filter((item)=>(item !== ingredient))));
    }

   const Row = ({ingredient}) => {
        return (
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center">{ingredient.name}</TableCell>
                <TableCell align="center">{ingredient.number}</TableCell>
                <TableCell align="center">
                    <Button onClick={() => handleDeleteProduct(ingredient.name)}><CloseIcon/></Button>
                </TableCell>
            </TableRow>
        )
   }

    return (
        <Dialog open={open} maxWidth="md" fullWidth>
            <DialogContent sx={{backgroundColor: '#F9FAEE'}}>
                <IconButton
                    onClick={() => setOpen(false)}
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <FormControl variant="standard" sx={{ m: 1, width: '100%', marginBottom: '30px'}}>
                        <InputLabel id="demo-simple-select-standard-label">Оберіть категорію рецепта</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {
                                categories.map((category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >{category.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть інгредієнт"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                        variant="standard"
                        multiline
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть кількість інгредієнта (шт/мл/г)"
                        variant="standard"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        multiline
                    />
                    <button className="add-ingredient-button" disabled={!validateAddProduct()} onClick={handleAddProduct}>
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
                                {
                                    Object.keys(ingredients).map(key => (
                                        <Row key={key} ingredient={{name: key, number: ingredients[key]}}/>
                                    ))
                                }
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть детальні інструкції з приготування"
                        variant="standard"
                        multiline
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
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