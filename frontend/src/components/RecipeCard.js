import Card from 'react-bootstrap/Card';
import '../styles/RecipeCard.css'
import Image from 'react-bootstrap/Image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useAuth} from "../provider/authProvider";
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({id, title, author, authorId, numberOfLikes, ingredients}) => {
    const {role} = useAuth();
    // const [recipeTitle, setRecipeTitle] = useState("");
    // const [recipeAuthor, setRecipeAuthor] = useState("");
    // const [likes, setLikes] = useState("");
    // const [ingredientsList, setIngredientsList] = useState([]);

    useEffect(() => {
        // setRecipeTitle(title);
        // setRecipeAuthor(author);
        // setLikes(numberOfLikes);
        // setIngredientsList(ingredients);
    }, []);

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
                        <span>{numberOfLikes} </span>
                        {role ? <button className="recipe-card-like-button"><FavoriteBorderIcon fontSize="large"/></button> :
                            <button disabled className="recipe-card-like-button"><FavoriteBorderIcon fontSize="large"/></button>}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard;