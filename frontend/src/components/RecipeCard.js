import Card from 'react-bootstrap/Card';
import '../styles/RecipeCard.css'
import Image from 'react-bootstrap/Image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useAuth} from "../provider/authProvider";
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";

const RecipeCard = ({id, title, author, authorId, numberOfLikes, ingredients, isLiked}) => {

    const [liked, setLiked] = useState(isLiked);
    const [recipeId, setRecipeId] = useState(0);
    const [likes, setLikes] = useState(numberOfLikes);

    useEffect(() => {
        setLiked(isLiked);
        setRecipeId(id);
        setLikes(likes);
    }, []);

    const handleLike =  async () => {
        setLiked((prev) => !prev);
        let response;
        if(!liked) {
            response = await axios.put("http://localhost:8080/api/recipe/like/" + recipeId);
        }else {
            response = await axios.put("http://localhost:8080/api/recipe/unlike/" + recipeId);
        }
        setLikes(response.data);
    }

    return (
        <Card body className="recipe-card">
            <Card.Body style={{padding: "0px 5px"}}>
                <div className="card-container">
                    <div className="recipe-name">
                        <Image className="card-image" src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505" />
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