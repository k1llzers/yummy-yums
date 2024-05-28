import '../styles/Comment.css'
import Image from 'react-bootstrap/Image';
import TextField from "@mui/material/TextField";

const Comment = () => {

    return (
        <div className="comment-card">
            <div className="comment-container">
                <Image className="comment-author-img" roundedCircle src="https://www.ukrlib.com.ua/my/images/full/skovoroda-hryhoriy-savych.jpg"></Image>
                <div className="comment-main-info">
                    <p className="comment-author-name">Олександр Семицький</p>
                    <p className="comment-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam imperdiet magna, et vulputate ligula pulvinar at. Donec lacinia nibh quis pellentesque vehicula. Aliquam placerat porta sagittis. Sed congue est vestibulum quam consectetur, ac accumsan sapien laoreet. Cras efficitur nibh consequat, feugiat velit non, consequat massa. </p>
                </div>
            </div>
            <div className="comment-reply-container">
                <TextField
                    sx={{margin: 0}}
                    fullWidth
                    id="standard-basic"
                    label="Ваша відповідь"
                    variant="standard"
                    multiline
                />
                <button className="comment-reply-button">Відповісти</button>
            </div>
        </div>
    )

}

export default Comment;