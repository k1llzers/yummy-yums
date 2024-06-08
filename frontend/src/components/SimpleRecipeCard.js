import Card from 'react-bootstrap/Card';
import '../styles/SimpleRecipeCard.css'
import Image from 'react-bootstrap/Image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const SimpleRecipeCard = ({id, title, likes, comments, isLiked}) => {

    const defaultRecipePhoto = "https://i.pinimg.com/564x/07/7f/d7/077fd782b16b4fb5d96d5fcd74703039.jpg";
    const [photo, setPhoto] = useState(defaultRecipePhoto);

    useEffect(() => {
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

    return (
        <Card body className="simple-recipe-card">
            <Card.Body style={{padding: "0px 5px"}}>
                <div className="simple-card-container">
                    <div className="simple-recipe-name">
                        <Image className="simple-card-image" src={photo} />
                        <Link className="simple-card-link simple-card-title" to={`/recipe/${id}`}>{title}</Link>
                    </div>
                    <div className="simple-recipe-likes">
                        <span className="simple-likes-item">{likes} {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}</span>
                        <span >{comments} <ChatBubbleOutlineIcon/></span>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SimpleRecipeCard;