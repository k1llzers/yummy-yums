import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import '../styles/AccountPage.css';
import {Select, MenuItem, Button} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SimpleRecipeCard from "../components/SimpleRecipeCard";
import LikedRecipeCard from "../components/LikedRecipeCard";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import FriendRequestCard from "../components/FriendRequestCard";
import TextField from "@mui/material/TextField";

const AccountPage = () => {
    return (
        <div className={'main-container'}>
            <NavBar/>
            <div className={"top-container"}>
                <div className={'personal-info-container'}>
                    <Card body className="account-card">
                        <Card.Body style={{padding: "0px 5px"}}>
                            <div className="card-container">
                                <div className="account-name">
                                    <Image className="account-card-image"
                                           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSouz4bFZt20u2XHT4zM-7vP4OV_lZ1nT0JlQ&s"/>
                                    <div className="account-card-text-info">
                                        <p className="account-title">Григорій Сковорода </p>
                                        <p className="account-info">
                                            h.skovoroda@ukma.edu.ua
                                        </p>
                                        <p className="account-info">
                                            Kyiv, Ukraine
                                        </p>
                                        <div className={'with-icon'}>
                                            <p className="account-info">
                                                <DescriptionIcon style={{height: '30px'}}/> 37 рецептів
                                            </p>
                                            <p className="account-info info-likes"><FavoriteBorderIcon
                                                style={{height: '30px'}}/> 468 лайків</p>
                                        </div>
                                        <div className="recipe-likes">
                                            <button className={'account-edit-button'}>Редагувати профіль</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className={'family-info-container'}>

                    {/*<Select placeholder={'Моя сімʼя'}*/}
                    {/*>*/}
                    {/*    <MenuItem value={1}>Я (1)</MenuItem>*/}
                    {/*    <MenuItem value={2}>Мама і Тато (2)</MenuItem>*/}
                    {/*    <MenuItem value={3}>Сімʼя з трьох (3)</MenuItem>*/}
                    {/*    <MenuItem value={4}>Сімʼя з чотирьох (4)</MenuItem>*/}
                    {/*    <MenuItem value={5}>Сімʼя з п'яти (5)</MenuItem>*/}
                    {/*    <MenuItem value={10}>Велика родина (10)</MenuItem>*/}
                    {/*</Select>*/}
                </div>
            </div>
            <div className={'bottom-container'}>
                <Tabs
                    id="controlled-tab-example"

                >
                    <Tab eventKey="recepts" title="Мої рецепти">
                        <div className={'own-recipes-container'}>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                        </div>

                    </Tab>
                    <Tab eventKey="likes-recipes" title="Вподобані">
                        <div className={'liked-recipe-card'}>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                        </div>
                    </Tab>
                    <Tab eventKey="product-list" title="Список продуктів">
                        <div className={'own-product-list'}>
                            <div className={'searching-container'}>
                                {/*    <div className={'input-table-container'}>*/}
                                {/*        <TextField*/}
                                {/*            fullWidth*/}
                                {/*            id="standard-basic"*/}
                                {/*            label="Введіть назву продукту"*/}
                                {/*            variant="standard"*/}
                                {/*            multiline*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                <div className={'proposal-table-container'}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{minWidth: 650}} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Назва продукту</TableCell>
                                                    <TableCell align="center">Кількість</TableCell>
                                                    <TableCell align="center">Магазин</TableCell>
                                                    <TableCell align="center">Ціна</TableCell>
                                                    <TableCell align="center">До списку</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                    <TableCell align="center">Помідори</TableCell>
                                                    <TableCell align="center">
                                                        <div className={'control-product-number'}>
                                                            <Button
                                                                className={'add-to-list-button minus-button'}><RemoveIcon/></Button>
                                                            1 шт
                                                            <Button className={'add-to-list-button'}><AddIcon/></Button>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Image
                                                            src={'https://upload.wikimedia.org/wikipedia/uk/thumb/f/ff/Novus_Ukraina_logo.svg/1200px-Novus_Ukraina_logo.svg.png'}
                                                            className={'shop-image'}></Image></TableCell>
                                                    <TableCell align="center">20 грн</TableCell>
                                                    <TableCell align="center">
                                                        <Button className={'add-to-list-button'}><AddIcon/></Button>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                    <TableCell align="center">Помідори</TableCell>
                                                    <TableCell align="center">
                                                        <div className={'control-product-number'}>
                                                            <Button
                                                                className={'add-to-list-button minus-button'}><RemoveIcon/></Button>
                                                            1 шт
                                                            <Button className={'add-to-list-button'}><AddIcon/></Button>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Image
                                                            src={'https://cdn.picodi.com/ua/files/shop-description/a/atbmarket/atb-logo.png?v=6656'}
                                                            className={'shop-image'}></Image></TableCell>
                                                    <TableCell align="center">20 грн</TableCell>
                                                    <TableCell align="center">
                                                        <Button className={'add-to-list-button'}><AddIcon/></Button>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                    <TableCell align="center">Помідори</TableCell>
                                                    <TableCell align="center">
                                                        <div className={'control-product-number'}>
                                                            <Button
                                                                className={'add-to-list-button minus-button'}><RemoveIcon/></Button>
                                                            1 шт
                                                            <Button className={'add-to-list-button'}><AddIcon/></Button>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Image
                                                            src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Silpo_outline_logo.svg/2560px-Silpo_outline_logo.svg.png'}
                                                            className={'shop-image'}></Image></TableCell>
                                                    <TableCell align="center">20 грн</TableCell>
                                                    <TableCell align="center">
                                                        <Button className={'add-to-list-button'}><AddIcon/></Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                            <div className={'product-list-container'}>
                                <div className={'main-product-list-container'}>
                                    <span className={'product-list-title'}>Мій список</span>
                                    <TableContainer component={Paper}>
                                        <Table sx={{minWidth: 650}} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Назва</TableCell>
                                                    <TableCell align="center">К-сть</TableCell>
                                                    <TableCell align="center">Магазин</TableCell>
                                                    <TableCell align="center">Ціна</TableCell>
                                                    <TableCell align="center">Видалити</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                    <TableCell align="center">
                                                        <input className="form-check-input" type="checkbox" value=""
                                                               id="flexCheckDefault1"/>
                                                        Помідори
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        1 шт
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Image
                                                            src={'https://upload.wikimedia.org/wikipedia/uk/thumb/f/ff/Novus_Ukraina_logo.svg/1200px-Novus_Ukraina_logo.svg.png'}
                                                            className={'shop-image'}></Image></TableCell>
                                                    <TableCell align="center">20 грн</TableCell>
                                                    <TableCell align="center">
                                                        <Button className={'add-to-list-button'}><RemoveIcon/></Button>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                    <TableCell align="center">

                                                        <input className="form-check-input" type="checkbox" value=""
                                                               id="flexCheckDefault2"/>
                                                        Помідори
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        1 шт
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Image
                                                            src={'https://cdn.picodi.com/ua/files/shop-description/a/atbmarket/atb-logo.png?v=6656'}
                                                            className={'shop-image'}></Image></TableCell>
                                                    <TableCell align="center">20 грн</TableCell>
                                                    <TableCell align="center">
                                                        <Button className={'add-to-list-button'}><RemoveIcon/></Button>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                    <TableCell align="center">
                                                        <input className="form-check-input" type="checkbox" value=""
                                                               id="flexCheckDefault3"/>
                                                        Помідори
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        1 шт
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Image
                                                            src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Silpo_outline_logo.svg/2560px-Silpo_outline_logo.svg.png'}
                                                            className={'shop-image'}></Image></TableCell>
                                                    <TableCell align="center">20 грн</TableCell>
                                                    <TableCell align="center">
                                                        <Button className={'add-to-list-button'}><RemoveIcon/></Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="friend-requests" title="Запити">
                        <div className={'friend-request-card'}>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                            <FriendRequestCard/>
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <Footer/>
        </div>

    )
        ;
}
export default AccountPage;