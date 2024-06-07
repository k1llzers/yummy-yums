import '../styles/Comment.css'
import Image from 'react-bootstrap/Image';
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {useAuth} from "../provider/authProvider";
import axios from "axios";

const Comment = ({commentObject, commentShift, recipeId, updateRecipe}) => {
    const role = useAuth();

    const [comment, setComment] = useState(commentObject);
    const [shift, setShift] = useState(commentShift);
    const [id, setId] = useState(recipeId)

    const [newReply, setNewReply] = useState("");

    useEffect(() => {
        setComment(commentObject);
        setShift(commentShift);
        setId(recipeId);
    }, [commentObject, commentShift, recipeId]);


    const addReply = async () => {
        await axios.post("http://localhost:8080/api/comment", {
            comment: newReply,
            recipeId: id,
            replyToId: comment.id
        });
        setNewReply("");
        updateRecipe();
    }

    return (
        <div className="comment-card" style={{marginLeft: shift + "px"}}>
            <div className="comment-container">
                <Image className="comment-author-img" roundedCircle src="https://www.ukrlib.com.ua/my/images/full/skovoroda-hryhoriy-savych.jpg"></Image>
                <div className="comment-main-info">
                    <p className="comment-author-name">{comment ? comment.user.pib : ""}</p>
                    <p className="comment-text">{comment ? comment.comment : ""}</p>
                </div>
            </div>
            {role && <div className="comment-reply-container">
                <TextField
                    sx={{margin: 0}}
                    id="standard-basic"
                    label="Ваша відповідь"
                    variant="standard"
                    multiline
                    onChange={(e) => setNewReply(e.target.value)}
                />
                <button
                    className="comment-reply-button"
                    disabled={newReply.length === 0}
                    onClick={addReply}
                >Відповісти</button>
            </div>}
            {comment ? comment.reply && <Comment commentObject={comment.reply} commentShift={shift+20} recipeId={id} updateRecipe={updateRecipe}/> : ""}
        </div>
    )

}

export default Comment;