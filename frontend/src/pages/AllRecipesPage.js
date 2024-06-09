import '../styles/AllRecipesPage.css'
import SearchIcon from '@mui/icons-material/Search';
import SearchIconWrapper from "../styled components/SearchIconWrapper";
import Search from "../styled components/Search";
import StyledInputBase from "../styled components/StyledInputBase";
import {Autocomplete, Chip, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";

let timer;

const AllRecipesPage = () => {
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [products, setProducts] = useState([]);

    const [category, setCategory] = useState(0);
    const [titleSearch, setTitleSearch] = useState("");

    const productsOptions = products.map((product, index) => ({ title: product }));
    const [selectedProducts, setSelectedProducts] = useState([]);

    const fetchCategories = async () => {
        const response = await axios.get("http://localhost:8080/api/category");
        if (response) {
            setCategories(response.data)
        } else {
            setCategories([])
        }
    }

    const fetchRecipes = async () => {
        const name = titleSearch.length > 0 ? "name=" + titleSearch : "";
        const categoryId = category > 0 ? "&categoryId=" + category : "";
        const ingredients = selectedProducts.length > 0 ? "&ingredients=" + selectedProducts.map(product => product.title).join(',') : "";
        setRecipes([]);
        let response;
        try {
            response = await axios.get("http://localhost:8080/api/recipe?" + name + categoryId + ingredients);
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes", error);
            setRecipes([]);
        }
    }

    const fetchProducts = async () => {
        const response = await axios.get("http://localhost:8080/api/recipe/products-in-scope");
        if (response) {
            setProducts(response.data)
        } else {
            setProducts([])
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    useEffect(() => {
        clearTimeout(timer)
        timer = setTimeout(() =>
            fetchRecipes(), 300
        )
    }, [category, selectedProducts, titleSearch])

    return (
        <div className="all-recipes-main-container">
            <div className="all-recipes-inner-container">
                <div className="all-recipes-filters-container">
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{color: '#3D6827'}} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            value={titleSearch}
                            onChange={(e) => setTitleSearch(e.target.value)}
                            placeholder="Назва рецептa…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Категорія рецептів</InputLabel>
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
                            <MenuItem key={0} value={0}>Всі категорії</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="all-recipes-products-container">
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={productsOptions}
                        isOptionEqualToValue={(option, value) => option.title === value.title}
                        value={selectedProducts}
                        getOptionLabel={(option) => option.title}
                        onChange={(event, newValue) => {
                            setSelectedProducts([...newValue]);
                        }}
                        renderTags={(tagValue, getTagProps) =>
                                tagValue.map((option, index) => (
                                    <Chip
                                        label={option.title}
                                        {...getTagProps({ index })}
                                        sx={{
                                            backgroundColor: '#E2F0D2',
                                            color: '#3D6827',
                                            fontFamily: 'Gentium Plus',
                                            fontSize: '1.1rem'
                                        }}
                                    />
                                ))
                            }
                        renderInput={(params) => (
                            <TextField {...params} label="Оберіть продукти" placeholder="Пошук..." />
                        )}
                    />
                </div>
                <div className="all-recipes-cards-container">
                    {recipes.map((recipe) =>
                        <RecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            title={recipe.name}
                            author={recipe.author.pib}
                            numberOfLikes={recipe.countOfLikes}
                            ingredients={recipe.ingredients}
                            isLiked={recipe.iliked}
                        />)}
                </div>
            </div>
        </div>
    )

}

export default AllRecipesPage;