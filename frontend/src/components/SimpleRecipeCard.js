import Card from 'react-bootstrap/Card';
import '../styles/SimpleRecipeCard.css'
import Image from 'react-bootstrap/Image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import AutorenewIcon from '@mui/icons-material/Autorenew';

const SimpleRecipeCard = ({id, title, likes, comments, isLiked, status, updateMyRecipes, showStatus}) => {

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

    const deleteRecipe = async () => {
        await axios.delete("http://localhost:8080/api/recipe/" + id);
        updateMyRecipes();
    }

    return (
        <Card body className="simple-recipe-card">
            <Card.Body style={{padding: "0px 5px"}}>
                <div className="simple-card-container">
                    <div className="simple-recipe-name">
                        <Image className="simple-card-image" src={photo} />
                        <Link className="simple-card-link simple-card-title" to={`/recipe/${id}`}>{title}</Link>
                    </div>
                    {showStatus && <div>
                        {status === 'APPROVE' ?
                            <span className="recipe-status" style={{color: '#3D6827'}}>
                            Затверджено
                            <VerifiedIcon fontSize="small" sx={{marginLeft: '5px'}}/>
                        </span> : status === 'IN_PROGRESS' ?
                                <span className="recipe-status" style={{color: '#b1a848'}}>
                                В процесі
                                <AutorenewIcon fontSize="small" sx={{marginLeft: '5px'}}/>
                            </span> :
                                <span className="recipe-status" style={{color: '#974040'}}>
                                Відхилено
                                <CancelIcon fontSize="small" sx={{marginLeft: '5px'}}/>
                            </span>
                        }
                    </div>}
                    <div className="simple-recipe-likes">
                        <span className="simple-likes-item">{likes} {isLiked ? <FavoriteIcon/> :
                            <FavoriteBorderIcon/>}</span>
                        <span className="simple-likes-item">{comments} <ChatBubbleOutlineIcon/></span>
                        {showStatus && <button
                            className="comment-delete-button simple-likes-item"
                            style={{fontSize: '1.5rem', padding: 0}}
                            onClick={deleteRecipe}
                        >
                            <DeleteOutlineIcon/>
                        </button>}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SimpleRecipeCard;