import '../styles/Comment.css'
import Image from 'react-bootstrap/Image';
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {useAuth} from "../provider/authProvider";
import axios from "axios";
import {Link} from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Comment = ({commentObject, commentShift, recipeId, updateRecipe}) => {
    const {role, id} = useAuth();
    const defaultUserPhoto = "https://i.pinimg.com/564x/77/00/70/7700709ac1285b907c498a70fbccea5e.jpg";

    const [comment, setComment] = useState(commentObject);
    const [shift, setShift] = useState(commentShift);
    const [idRecipe, setIdRecipe] = useState(recipeId)
    const [myId, setMyId] = useState("");
    const [photo, setPhoto] = useState(defaultUserPhoto);
    const [newReply, setNewReply] = useState("");

    useEffect(() => {
        setComment(commentObject);
        setShift(commentShift);
        setIdRecipe(recipeId);
        setMyId(id);
    }, [commentObject, commentShift, recipeId]);

    useEffect(() => {
        fetchUserPhoto();
    }, [comment]);

    const fetchUserPhoto = async () => {
        if (!comment) return;
        await axios.get("http://localhost:8080/api/user/get-user-image/" + comment.user.id, {
            responseType: "blob"
        }).then((response) => {
            if(response.data.type === 'application/json') return;
            setPhoto(URL.createObjectURL(response.data));
        });
    }

    const addReply = async () => {
        setNewReply("");
        await axios.post("http://localhost:8080/api/comment", {
            comment: newReply,
            replyToId: comment.id
        });
        updateRecipe();
    }

    const deleteComment = async () => {
        await axios.delete("http://localhost:8080/api/comment/" + comment.id);
        updateRecipe();
    }

    return (
        <div className="comment-card" style={{marginLeft: shift + "px"}}>
            <div className="comment-container">
                <Image className="comment-author-img" roundedCircle
                       src={photo}></Image>
                <div className="comment-main-info">
                    {myId == comment.user.id ? <Link className="card-title-a" to="/account"><p
                            className="comment-author-name">{comment ? comment.user.pib : ""}</p></Link> :
                        <Link className="card-title-a" to={`/user/${comment.user.id}`}><p
                            className="comment-author-name">{comment ? comment.user.pib : ""}</p></Link>}
                    <p className="comment-text">{comment ? comment.comment : ""}</p>
                </div>
                {myId == comment.user.id && <button className="comment-delete-button" onClick={deleteComment}><DeleteOutlineIcon/></button>}
            </div>
            {role === 'USER' && <div className="comment-reply-container">
            <TextField
                    sx={{margin: 0}}
                    id="standard-basic"
                    label="Ваша відповідь"
                    variant="standard"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                />
                <button
                    className="comment-reply-button"
                    disabled={newReply.length === 0}
                    onClick={addReply}
                >Відповісти</button>
            </div>}
            {comment ? comment.replies &&
                comment.replies.map((comment) => (
                    <Comment commentObject={comment} commentShift={shift+20} recipeId={idRecipe} updateRecipe={updateRecipe}/>
                )) : ""}
        </div>
    )

}

export default Comment;