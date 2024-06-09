import Card from 'react-bootstrap/Card';
import '../styles/RecipeCard.css'
import Image from 'react-bootstrap/Image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useAuth} from "../provider/authProvider";
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";

const RecipeCard = ({id, title, author, numberOfLikes, ingredients, isLiked}) => {

    const {role} = useAuth();
    const defaultRecipePhoto = "https://i.pinimg.com/564x/07/7f/d7/077fd782b16b4fb5d96d5fcd74703039.jpg";

    const [liked, setLiked] = useState(isLiked);
    const [recipeId, setRecipeId] = useState(0);
    const [likes, setLikes] = useState(numberOfLikes);
    const [photo, setPhoto] = useState(defaultRecipePhoto);

    useEffect(() => {
        setLiked(isLiked);
        setRecipeId(id);
        setLikes(likes);
        fetchPhoto();
    }, []);

    const fetchPhoto = async () => {
        if (!id) return
        await axios.get("http://localhost:8080/api/recipe/get-recipe-image/" + id, {
            responseType: "blob"
        }).then((response) => {
            if(response.data.type === 'application/json') return;
            setPhoto(URL.createObjectURL(response.data));
        });
    }

    const handleLike =  async () => {
        setLiked((prev) => !prev);
        let response;
        if(!liked) {
            response = await axios.put("http://localhost:8080/api/recipe/like/" + recipeId);
        } else {
            response = await axios.put("http://localhost:8080/api/recipe/unlike/" + recipeId);
        }
        setLikes(response.data);
    }

    return (
        <Card body className="recipe-card">
            <Card.Body style={{padding: "0px 5px"}}>
                <div className="card-container">
                    <div className="recipe-name">
                        <Image className="card-image" src={photo} />
                        <div className="recipe-card-text-info">
                            <Link className="card-title-a" to={`/recipe/${id}`}><p className="card-title">{title}</p></Link>
                            <p className="recipe-info">
                            <span className="info-title">Інгредієнти: </span>
                                {ingredients ? ingredients.map((item) => item.toLowerCase()).join(', ') : ""}
                            </p>
                            <p className="recipe-info">
                                <span className="info-title">Автор: </span>
                                {author}
                            </p>
                        </div>
                    </div>
                    <div className="recipe-likes">
                        <span>{likes} </span>
                            <button
                                    className="recipe-card-like-button"
                                    onClick={handleLike}
                                    disabled={!role || role === 'MANAGER'}
                            >
                                {liked ? <FavoriteIcon fontSize="large"/> : <FavoriteBorderIcon fontSize="large"/>}
                            </button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard;