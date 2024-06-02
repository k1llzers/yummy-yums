import '../styles/RecipePage.css';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Image from 'react-bootstrap/Image';
import PlaceIcon from '@mui/icons-material/Place';
import AddProductsPopup from "../components/AddProductsPopup";
import Comment from "../components/Comment";
import TextField from "@mui/material/TextField";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useState} from "react";

const RecipePage = () => {

    const [openAddProductsPopup, setOpenProductsPopup] = useState(false);

    return (
        <>
            <div className="recipe-main-container">
                {/*<NavBar/>*/}
                <AddProductsPopup open={openAddProductsPopup} setOpen={setOpenProductsPopup}/>
                <div className="recipe-inner-container">
                    <div className="recipe-page-main-info-container">
                        <div className="name-and-description-container">
                            <div className="recipe-author-info">
                                <Image roundedCircle className="recipe-author-image" src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505" />
                                <div className="recipe-author-text-info">
                                    <p className="recipe-text-info-item">Анатолій Журба</p>
                                    <p className="recipe-text-info-item"><PlaceIcon fontSize="small"/>Київ, Україна</p>
                                </div>
                            </div>
                            <p className="recipe-name-label">Прекрасний неймовірний салат</p>
                            <div className="recipe-likes-info">
                                <span>25 </span>
                                <button className="recipe-page-like-button"><FavoriteBorderIcon fontSize="medium"/></button>
                            </div>
                            <p className="recipe-page-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vestibulum fermentum faucibus. Phasellus feugiat ligula ligula, sed convallis felis tristique ut. Vestibulum a semper neque, a viverra lectus.</p>
                        </div>
                        <Image className="recipe-page-img-left" src="https://images.unian.net/photos/2022_09/thumb_files/1200_0_1662892107-3846.jpg"></Image>
                        <Image className="recipe-page-img-right" src="https://images.unian.net/photos/2022_09/thumb_files/1200_0_1662892107-3846.jpg"></Image>
                        <div className="recipe-page-ingredients">
                            <span className="recipe-page-ingredients-label">Інгредієнти: </span>
                            <button onClick={() => setOpenProductsPopup(true)} className="recipe-page-ingredient-item">Помідори 5шт</button>
                            <button className="recipe-page-ingredient-item">Сіль 100г</button>
                            <button className="recipe-page-ingredient-item">Вода 200мл</button>
                            <button className="recipe-page-ingredient-item">Помідори 5шт</button>
                            <button className="recipe-page-ingredient-item">Сіль 100г</button>
                            <button className="recipe-page-ingredient-item">Вода 200мл</button>
                            <button className="recipe-page-ingredient-item">Помідори 5шт</button>
                            <button className="recipe-page-ingredient-item">Сіль 100г</button>
                            <button className="recipe-page-ingredient-item">Вода 200мл</button>
                        </div>
                    </div>
                    <div className="recipe-page-instructions-container">
                        <p className="recipe-page-instructions-label">Покрокова інструкція</p>
                        <p className="recipe-page-instructions">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vestibulum neque eget erat vehicula dictum. Vestibulum nisi justo, finibus in congue non, scelerisque nec tellus. Nullam eget ultrices dolor, sed luctus dolor. Duis facilisis, dolor et faucibus aliquam, sapien nisl hendrerit sem, sit amet egestas diam odio sit amet mi. Duis sit amet dignissim mi, a bibendum tortor. Integer tincidunt iaculis leo. Integer sodales ultrices nunc gravida elementum. Aliquam dui tellus, condimentum ultrices mauris in, porttitor vehicula neque. Etiam volutpat est nec libero maximus, a dignissim nisl laoreet. Curabitur rutrum lectus felis, sit amet mattis odio ultricies ut. Etiam nec maximus sem. Nam felis mi, cursus sit amet purus ac, fringilla congue lorem.
                        </p>
                    </div>
                    <div className="recipe-page-comments-container">
                        <p className="recipe-page-comments-label">Коментарі</p>
                        <div className="add-comment-container">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Ваш коментар"
                                variant="standard"
                                multiline
                            />
                            <button className="recipe-page-add-comment-button">Надіслати</button>
                        </div>
                        <Comment/>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    )

}

export default RecipePage;