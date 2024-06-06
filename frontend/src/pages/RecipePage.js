import '../styles/RecipePage.css';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Image from 'react-bootstrap/Image';
import PlaceIcon from '@mui/icons-material/Place';
import AddProductsPopup from "../components/AddProductsPopup";
import Comment from "../components/Comment";
import TextField from "@mui/material/TextField";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useEffect, useState} from "react";
import {useAuth} from "../provider/authProvider";
import {useParams} from "react-router-dom";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";

const RecipePage = () => {
    const {role} = useAuth();
    const id = useParams();
    const [openAddProductsPopup, setOpenProductsPopup] = useState(false);
    const [chosenProduct, setChosenProduct] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [instruction, setInstruction] = useState("");
    const [ingredients, setIngredients] = useState({});
    const [comments, setComments] = useState([]);
    const [author, setAuthor] = useState({});
    const [category, setCategory] = useState({});
    const [countOfLikes, setCountOfLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    const fetchRecipe = async () => {
        const response = await axios.get("http://localhost:8080/api/recipe/" + id.id);
        setTitle(response.data.name);
        setDescription(response.data.description);
        setInstruction(response.data.instruction);
        setIngredients(response.data.productToCountMap);
        setComments(response.data.comments);
        setAuthor(response.data.author);
        setCategory(response.data.category);
        setCountOfLikes(response.data.countOfLikes);
        setLiked(response.data.iliked);
    }

    useEffect(() => {
        fetchRecipe();
    }, [])

    const handleLike = async () => {
        const response = await axios.put("http://localhost:8080/api/recipe/like/" + id.id);
        await fetchRecipe();
    }

    return (
        <>
            <div className="recipe-main-container">
                <AddProductsPopup open={openAddProductsPopup} setOpen={setOpenProductsPopup} product={chosenProduct}/>
                <div className="recipe-inner-container">
                    <div className="recipe-page-main-info-container">
                        <div className="name-and-description-container">
                            <div className="recipe-author-info">
                                <Image roundedCircle className="recipe-author-image"
                                       src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                <div className="recipe-author-text-info">
                                    <p className="recipe-text-info-item">{author.pib}</p>
                                </div>
                            </div>
                            <p className="recipe-name-label">{title}</p>
                            <p className="recipe-page-category"><span className="recipe-page-category-label">Категорія: </span>{category.name}</p>
                            <div className="recipe-likes-info">
                                <span>{countOfLikes} </span>
                                <button
                                    className="recipe-page-like-button"
                                    onClick={handleLike}
                                >
                                    {liked ? <FavoriteIcon fontSize="large"/> : <FavoriteBorderIcon fontSize="large"/>}
                                </button>
                            </div>
                            <p className="recipe-page-description">{description}</p>
                        </div>
                        <Image className="recipe-page-img-left" src="https://images.unian.net/photos/2022_09/thumb_files/1200_0_1662892107-3846.jpg"></Image>
                        <Image className="recipe-page-img-right" src="https://images.unian.net/photos/2022_09/thumb_files/1200_0_1662892107-3846.jpg"></Image>
                        <div className="recipe-page-ingredients">
                            <span className="recipe-page-ingredients-label">Інгредієнти: </span>
                            {Object.entries(ingredients).map(([product, quantity]) => (
                                <button key={product}
                                        className="recipe-page-ingredient-item"
                                        onClick={() => {setChosenProduct(product); setOpenProductsPopup(true)}}
                                >
                                    {`${product} ${quantity}`}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="recipe-page-instructions-container">
                        <p className="recipe-page-instructions-label">Покрокова інструкція</p>
                        <p className="recipe-page-instructions">
                            {instruction}
                        </p>
                    </div>
                    <div className="recipe-page-comments-container">
                        <p className="recipe-page-comments-label">Коментарі</p>
                        {role && <div className="add-comment-container">
                            <TextField
                                id="standard-basic"
                                label="Ваш коментар"
                                variant="standard"
                                multiline
                            />
                            <button className="recipe-page-add-comment-button">Надіслати</button>
                        </div>}
                        <Comment/>
                    </div>
                </div>
            </div>
        </>
    )

}

export default RecipePage;