import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import '../styles/AllRecipesPage.css'
import SearchIcon from '@mui/icons-material/Search';
import SearchIconWrapper from "../styled components/SearchIconWrapper";
import Search from "../styled components/Search";
import StyledInputBase from "../styled components/StyledInputBase";
import {Autocomplete, Chip, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import RecipeCard from "../components/RecipeCard";


const top100Films = [
    { title: 'Помідори', year: 1994 },
    { title: 'Сіль', year: 1972 },
    { title: 'Огірки', year: 1974 },
    { title: 'Гречка', year: 2008 },
    { title: 'Макарони', year: 1957 },
    { title: "Перець", year: 1993 },
    { title: 'Салат', year: 1994 },
];

const AllRecipesPage = () => {

    const fixedOptions = [];
    const [value, setValue] = useState([...fixedOptions]);

    return (
        <div className="all-recipes-main-container">
            {/*<NavBar/>*/}
            <div className="all-recipes-inner-container">
                <div className="all-recipes-filters-container">
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{color: '#3D6827'}} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Назва рецептa…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Категорія рецептів</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                        >
                            <MenuItem value={10}>Лялялял</MenuItem>
                            <MenuItem value={20}>Лялялял</MenuItem>
                            <MenuItem value={30}>Лялялял</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="all-recipes-products-container">
                    <Autocomplete
                        multiple
                        id="fixed-tags-demo"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue([
                                ...fixedOptions,
                                ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                            ]);
                        }}
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
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
                    <RecipeCard/>
                    <RecipeCard/>
                    <RecipeCard/>
                    <RecipeCard/>
                    <RecipeCard/>
                    <RecipeCard/>
                </div>
            </div>
            <Footer/>
        </div>
    )

}

export default AllRecipesPage;