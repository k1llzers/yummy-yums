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

let recipeTimer

const CreateRecipeForm = ({open, setOpen}) => {
   const [categories, setCategories] = useState([]);
   const [ingredient, setIngredient] = useState("");
   const [number, setNumber] = useState("");
   const [checkProduct, setCheckProduct] = useState({canBeAdded: true})

   const [category, setCategory] = useState("");
   const [title, setTitle] = useState("");
   const [photo, setPhoto] = useState(null);
   const [description, setDescription] = useState("");
   const [instruction, setInstruction] = useState("");
   const [ingredients, setIngredients] = useState({});


   const fetchCategories = async () => {
       const response = await axios.get("http://localhost:8080/api/category");
       if (response) {
           setCategories(response.data)
       }else {
           setCategories([])
       }
   }

   useEffect(() => {
       if (open) fetchCategories();
   }, [open]);

   useEffect(() => {
       clearTimeout(recipeTimer)
       recipeTimer = setTimeout(() => checkExistingProduct(), 300)
   }, [ingredient])

   const handleSubmitRecipe = async () => {
        const recipe = {
            "name": title,
            "description": description,
            "instruction": instruction,
            "productToCountMap": ingredients,
            "categoryId": +category
        }
        const json = JSON.stringify(recipe);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        const data = new FormData();
        data.append("recipe", blob);
        data.append("photo", photo);
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/recipe',
            data: data,
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (response) {
                console.log(response);
            })
            .finally(() => {
                setOpen(false);
                clearFields();
            });
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

   const validateSubmitRecipe = () => {
       return title.trim().length > 0 && description.trim().length > 0 && instruction.trim().length > 0
           && Object.keys(ingredients).length > 0 && category > 0 && photo;
   }

   const checkExistingProduct = async () => {
       if (ingredient.trim().length === 0) return;
       const response = await axios.get("http://localhost:8080/api/product/can-be-added-to-recipe?input=" + ingredient);
       if(response.error) {
           setCheckProduct({});
       } else {
           console.log(response.data)
           setCheckProduct(response.data);
       }
   }

   const validateAddProduct = () => {
       return ingredient.trim().length > 0 && number.trim().length > 0 && !ingredients[ingredient] && checkProduct.canBeAdded;
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
        const newIngredients = { ...ingredients };
        delete newIngredients[ingredient];
        setIngredients(newIngredients);
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
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <FormControl variant="standard" sx={{ m: 1, width: '100%', marginBottom: '30px'}}>
                        <InputLabel id="demo-simple-select-standard-label" required>Оберіть категорію рецепта</InputLabel>
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
                        error={!checkProduct.canBeAdded}
                        helperText={!checkProduct.canBeAdded ? "Такого продукту немає в базі" + (ingredient? ", можливо ви мали на увазі: " + checkProduct.tooltip : "") : ""}
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
                    <p className="photo-upload-label">Додайте фото готової страви *</p>
                    <Form.Control
                        className="recipe-photo-upload"
                        type="file"
                        size="md"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть короткий опис"
                        variant="standard"
                        multiline
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Введіть детальні інструкції з приготування"
                        variant="standard"
                        multiline
                        required
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                    />
                    <button className="create-recipe-button" disabled={!validateSubmitRecipe()} onClick={handleSubmitRecipe}>
                        Надіслати рецепт на підтвердження
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateRecipeForm;