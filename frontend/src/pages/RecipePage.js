import '../styles/RecipePage.css';
import Image from 'react-bootstrap/Image';
import AddProductsPopup from "../components/AddProductsPopup";
import Comment from "../components/Comment";
import TextField from "@mui/material/TextField";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useEffect, useState} from "react";
import {useAuth} from "../provider/authProvider";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";

const RecipePage = () => {
    const {role, id} = useAuth();
    const recipeId = useParams();
    const [openAddProductsPopup, setOpenProductsPopup] = useState(false);
    const [chosenProduct, setChosenProduct] = useState("");
    const [newComment, setNewComment] = useState("");

    const defaultRecipePhoto = "https://i.pinimg.com/564x/07/7f/d7/077fd782b16b4fb5d96d5fcd74703039.jpg";
    const defaultUserPhoto = "https://i.pinimg.com/564x/77/00/70/7700709ac1285b907c498a70fbccea5e.jpg";

    const [myId, setMyId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [instruction, setInstruction] = useState("");
    const [ingredients, setIngredients] = useState({});
    const [comments, setComments] = useState([]);
    const [author, setAuthor] = useState({});
    const [category, setCategory] = useState({});
    const [countOfLikes, setCountOfLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [recipePhoto, setRecipePhoto] = useState(defaultRecipePhoto);
    const [userPhoto, setUserPhoto] = useState(defaultUserPhoto);

    const fetchRecipe = async () => {
        const response = await axios.get("http://localhost:8080/api/recipe/" + recipeId.id);
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

    const fetchRecipePhoto = async () => {
        if (!recipeId) return
        await axios.get("http://localhost:8080/api/recipe/get-recipe-image/" + recipeId.id, {
            responseType: "blob"
        }).then((response) => {
            if(response.data.type === 'application/json') return;
            setRecipePhoto(URL.createObjectURL(response.data));
        });
    }

    const fetchUserPhoto = async () => {
        if (!author) return;
        await axios.get("http://localhost:8080/api/user/get-user-image/" + author.id, {
            responseType: "blob"
        }).then((response) => {
            if(response.data.type === 'application/json') return;
            setUserPhoto(URL.createObjectURL(response.data));
        });
    }

    const addComment = async () => {
        setNewComment("");
        await axios.post("http://localhost:8080/api/comment", {
            comment: newComment,
            recipeId: recipeId.id
        });
        fetchRecipe();
    }

    useEffect(() => {
        fetchRecipe();
        setMyId(id);
        fetchRecipePhoto();
    }, [])

    useEffect(() => {
        fetchUserPhoto();
    }, [author]);

    const handleLike = async () => {
        if (!liked) {
            await axios.put("http://localhost:8080/api/recipe/like/" + recipeId.id)
        } else {
            await axios.put("http://localhost:8080/api/recipe/unlike/" + recipeId.id)
        }
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
                                       src={userPhoto}/>
                                <div className="recipe-author-text-info">
                                    {myId == author.id ? <Link className="card-title-a" to="/account"><p className="recipe-text-info-item">{author.pib}</p></Link>
                                    : <Link className="card-title-a" to={`/user/${author.id}`}><p className="recipe-text-info-item">{author.pib}</p></Link>}
                                </div>
                            </div>
                            <p className="recipe-name-label">{title}</p>
                            <p className="recipe-page-category"><span className="recipe-page-category-label">Категорія: </span>{category.name}</p>
                            <div className="recipe-likes-info">
                                <span>{countOfLikes} </span>
                                <button
                                    className="recipe-page-like-button"
                                    onClick={handleLike}
                                    disabled={!role || role === 'MANAGER'}
                                >
                                    {liked ? <FavoriteIcon fontSize="large"/> : <FavoriteBorderIcon fontSize="large"/>}
                                </button>
                            </div>
                            <p className="recipe-page-description">{description}</p>
                        </div>
                        <Image className="recipe-page-img-left" src={recipePhoto}></Image>
                        <Image className="recipe-page-img-right" src={recipePhoto}></Image>
                        <div className="recipe-page-ingredients">
                            <span className="recipe-page-ingredients-label">Інгредієнти: </span>
                            {Object.entries(ingredients).map(([product, quantity]) => (
                                <button key={product}
                                        className="recipe-page-ingredient-item"
                                        onClick={() => {setChosenProduct(product); setOpenProductsPopup(true)}}
                                        disabled={role !== 'USER'}
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
                        {role === 'USER' && <div className="add-comment-container">
                            <TextField
                                id="standard-basic"
                                label="Ваш коментар"
                                variant="standard"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button
                                className="recipe-page-add-comment-button"
                                disabled={newComment.length === 0}
                                onClick={addComment}
                            >Надіслати</button>
                        </div>}
                        {comments.map((comment) => (
                            <Comment commentObject={comment} commentShift={0} recipeId={recipeId.id} updateRecipe={fetchRecipe}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

}

export default RecipePage;