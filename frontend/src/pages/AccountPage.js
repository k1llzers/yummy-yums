import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import '../styles/AccountPage.css';
import {Button} from "@mui/material";
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
import EditIcon from '@mui/icons-material/Edit';
import FriendRequestCard from "../components/FriendRequestCard";
import TextField from "@mui/material/TextField";
import EditProfilePopup from "../components/EditProfilePopup";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import CreateFamilyPopup from "../styles/CreateFamilyPopup";
import EditFamilyPopup from "../components/EditFamilyPopup";
import SingleAccount from "../components/SingleAccount";
import {useAuth} from "../provider/authProvider";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";


const AccountPage = () => {
    const navigation = useNavigate();
    const [weather, setWeather] = useState({
        location: {
            name: "Kyiv",
            country: "Ukraine"
        }
    });
    const storeImages = {
        "SILPO": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Silpo_outline_logo.svg/2560px-Silpo_outline_logo.svg.png",
        "ATB": "https://cdn.picodi.com/ua/files/shop-description/a/atbmarket/atb-logo.png?v=6656",
        "NOVUS": "https://upload.wikimedia.org/wikipedia/uk/thumb/f/ff/Novus_Ukraina_logo.svg/1200px-Novus_Ukraina_logo.svg.png"
    }
    const defaultPhoto = "https://i.pinimg.com/564x/77/00/70/7700709ac1285b907c498a70fbccea5e.jpg";
    const {role, id} = useAuth();
    const [myId, setMyId] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedList, setSelectedList] = useState("Мій список");
    const [selectedFamilyParticipants, setSelectedFamilyParticipants] = useState([]);
    const [ownRecipes, setOwnRecipes] = useState([]);
    const [likedRecipes, setLikedRecipes] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [families, setFamilies] = useState([]);
    const [currentFamily, setCurrentFamily] = useState(0);
    const [accountName, setAccountName] = useState("");
    const [accountEmail, setAccountEmail] = useState("");
    const [accountPhoto, setAccountPhoto] = useState(defaultPhoto);
    const [accountId, setAccountId] = useState("");
    const [accountLikesCount, setAccountLikesCount] = useState(0);
    const [accountRecipesCount, setAccountRecipesCount] = useState(0);
    const [openEditProfilePopup, setOpenEditProfilePopup] = useState(false);
    const [openCreateFamilyPopup, setOpenCreateFamilyPopup] = useState(false);
    const [openEditFamilyPopup, setOpenEditFamilyPopup] = useState(false);
    const [offeredProducts, setOfferedProducts] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [limit, setLimit] = useState(0);

    const fetchPersonalInfo = async () => {
        const response = await axios.get("http://localhost:8080/api/user/myself");
        if (response) {
            setAccountName(response.data.surname + " " + response.data.name);
            setAccountEmail(response.data.email);
            setAccountLikesCount(response.data.countOfLikesOnMyRecipes);
            setAccountRecipesCount(response.data.countOfRecipes);
            setAccountId(response.data.id);
        } else {
            console.log("Error fetching personal info");
        }
    }

    const fetchPhoto = async () => {
        if (!accountId) return
        await axios.get("http://localhost:8080/api/user/get-user-image/" + accountId, {
            responseType: "blob"
        }).then((response) => {
            if(response.data.type === 'application/json') return;
            setAccountPhoto(URL.createObjectURL(response.data));
        });
    }

    useEffect(() => {
        fetchPhoto();
    }, [accountId]);

    // const handleTabChange = (event, newValue) => {
    //     setSelectedTab(newValue);
    //     if (newValue === 0) fetchOwnRecipes();
    //     else if (newValue === 1) {
    //         fetchLikedRecipes();
    //     }
    // };
    const fetchOwnRecipes = async () => {
        const response = await axios.get("http://localhost:8080/api/recipe/get-my");
        if (response) {
            setOwnRecipes(response.data);
        } else {
            setOwnRecipes([]);
        }
    }
    const fetchFriendRequests = async () => {
        const response = await axios.get("http://localhost:8080/api/family/my-requests");
        if (response) {
            setFriendRequests(response.data);
        } else {
            setFriendRequests([]);
        }
    }
    const fetchLikedRecipes = async () => {
        const response = await axios.get("http://localhost:8080/api/recipe/get-my-liked")
        if (response) {
            setLikedRecipes(response.data);
        } else {
            setLikedRecipes([]);
        }
    }
    const fetchFamilies = async () => {
        const response = await axios.get("http://localhost:8080/api/family/my-families");
        if (response) {
            setFamilies(response.data)
        } else {
            setFamilies([])
        }
    }
    const handleAddProduct = async () => {
        setLimit((prev) => prev + 10);
        const response = await axios.get("http://localhost:8080/api/product?input=" + ingredient +
            "&limit=" + limit);
        if (response) {
            setOfferedProducts(response.data);
        } else {
            setOwnRecipes([]);
        }
    }

    const onToggleLike = async (id) => {
        await axios.put("http://localhost:8080/api/recipe/unlike/" + id);
        fetchLikedRecipes();
        fetchOwnRecipes();
        fetchPersonalInfo();
    }
    const onToggleResponse = async (id, accepted) =>{
        accepted ? await axios.put("http://localhost:8080/api/family/confirm-request/" + id) : await axios.put("http://localhost:8080/api/family/cancel-request/" + id)
        fetchFriendRequests();
        fetchFamilies();
    }

    const fetchListProducts = async () => {
        if (currentFamily === 0) return
        const response = await axios.get(`http://localhost:8080/api/family/list/${currentFamily}`)
        if (response.data) {
            setProductsList(processProductList(response.data))
        }
    }
    const fetchParticipants =()=>{
        setSelectedList("Мій список");
    }

    const processProductList = (list) => {
        return Object.entries(list).map(([serializedProduct, count]) => {
            const product = JSON.parse(serializedProduct);
            return { product, count };
        }).sort((a, b) => a.product.id - b.product.id);
    }

    useEffect(() => {
        setMyId(id);
        fetchPersonalInfo();
        fetchFamilies();
        fetchOwnRecipes();
        fetchLikedRecipes();
        fetchFriendRequests();
    }, []);

    useEffect(() => {
        const selectedFamily = families.find(family => family.name === selectedList);
        if (selectedFamily) {
            setSelectedFamilyParticipants(selectedFamily.participants || []);
            setCurrentFamily(selectedFamily.id);
        }
    }, [selectedList, families]);

    useEffect(() => {
        fetchListProducts()
    }, [currentFamily]);

    useEffect(() => {
        if (ingredient === "") {
            setLimit(10);
        }
    }, [ingredient, limit])

    const addProductToList = async (id) => {
        const response = await axios.put("http://localhost:8080/api/family/increase-count/" + id + "/" + currentFamily);
        if (response.data) {
            setProductsList(processProductList(response.data))
        }
    }

    const OfferedRow = ({offered}) => {
        return (
            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align="center">
                    <Image className="popup-product-photo" src={offered.imgUrl}
                           style={{width: '60px', height: "60px"}}></Image>
                </TableCell>
                <TableCell align="left">{offered.name} </TableCell>
                <TableCell align="center">
                    <div className={'control-product-number'}>
                        {offered.weight}
                    </div>
                </TableCell>
                <TableCell align="center">
                    <Image
                        src={storeImages[offered.store]}
                        className={'shop-image'}></Image></TableCell>
                <TableCell align="center">{offered.price} грн</TableCell>
                <TableCell align="center">
                    <Button onClick={() => addProductToList(offered.id)} className={'add-to-list-button'}><AddIcon/></Button>
                </TableCell>
            </TableRow>
        );
    }

    const ListRow = ({item}) => {
        const handleDelete = async () => {
            const response = await axios.put(`http://localhost:8080/api/family/delete-product/${item.product.id}/${currentFamily}`)
            if (response.data) {
                setProductsList(processProductList(response.data))
            }
        }

        const handleDecrease = async () => {
            const response = await axios.put(`http://localhost:8080/api/family/decrease-count/${item.product.id}/${currentFamily}`)
            if (response.data) {
                setProductsList(processProductList(response.data))
            }
        }

        return (
            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align="center">
                    {item.product.name}
                </TableCell>
                <TableCell align="center">
                    {item.product.weight}
                </TableCell>
                <TableCell align="center" sx={{whiteSpace: "nowrap"}}>
                    <button onClick={handleDecrease} className={'add-to-list-button'}><RemoveIcon/></button>
                    {item.count}
                    <button onClick={() => addProductToList(item.product.id)} className={'add-to-list-button'}><AddIcon/></button>
                </TableCell>
                <TableCell align="center">
                    <Image
                        src={storeImages[item.product.store]}
                        className={'shop-image'}></Image></TableCell>
                <TableCell align="center">{(item.product.price * item.count).toFixed(2)} грн</TableCell>
                <TableCell align="center">
                    <Button onClick={handleDelete} className={'add-to-list-button'}><DeleteOutlineIcon/></Button>
                </TableCell>
            </TableRow>
        )
    }

    return (
        <div className={'main-container'}>
            <EditProfilePopup open={openEditProfilePopup} setOpen={setOpenEditProfilePopup} updatePersonalInfo={fetchPersonalInfo} updatePersonalPhoto={fetchPhoto}/>
            <CreateFamilyPopup open={openCreateFamilyPopup} setOpen={setOpenCreateFamilyPopup} toogleFamily={fetchFamilies}/>
            <EditFamilyPopup open={openEditFamilyPopup} setOpen={setOpenEditFamilyPopup} familyId={currentFamily} myId={myId} toggleFamily={fetchFamilies} changeList={fetchParticipants}/>
            <div className={"top-container"}>
                <div className={'personal-info-container'}>
                    <Card body className="account-card" id={'account-card'}>
                        <Card.Body style={{padding: "0px 5px"}}>
                            <div className="card-container">
                                <div className="account-name">
                                    <Image className="account-card-image"
                                           src={accountPhoto}/>
                                    <div className="account-card-text-info">
                                        <p className="account-title">{accountName}</p>
                                        <p className="account-info">
                                            {accountEmail}
                                        </p>
                                        <p className="account-info">
                                            {weather.location.name}, {weather.location.country}
                                        </p>
                                        <div className={'with-icon'}>
                                            <p className="account-info">
                                                <DescriptionIcon
                                                    style={{height: '30px'}}/> {accountRecipesCount} рецептів
                                            </p>
                                            <p className="account-info info-likes"><FavoriteBorderIcon
                                                style={{height: '30px'}}/> {accountLikesCount} лайків</p>
                                        </div>
                                        <div className="recipe-likes">
                                            <button
                                                className={'account-edit-button'}
                                                onClick={() => setOpenEditProfilePopup(true)}
                                            >
                                                Редагувати профіль
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className={'family-info-container'}>
                    <div className={'all-family-info-container'}>
                        <select className="form-select form-select-family" aria-label="Default select example"
                                value={selectedList}
                                onChange={(event)=>setSelectedList(event.target.value)}
                        >

                            {families.map((family)=>(
                                <option
                                    key={family.id}
                                    id={family.id}
                                    value={family.name}
                                    selected={family.name === "Мій список"}
                                >
                                    {family.name}
                                </option>
                            ))}

                        </select>
                        <div className={'selected-family-info'}>
                            {selectedFamilyParticipants.map(participant => (
                                <SingleAccount
                                    key={participant.id}
                                    id={participant.id}
                                    pib={participant.pib}
                                    myId={myId}
                                />
                            ))}
                        </div>
                        <button className="create-family-button"
                                onClick={() => setOpenCreateFamilyPopup(true)}>
                            Створити сімʼю
                        </button>
                    </div>
                    <div className={'edit-family-buttons'}>
                        <EditIcon
                            aria-disabled={selectedList === "Мій список"}
                            onClick={() => {
                                if (selectedList !== "Мій список") {
                                    setOpenEditFamilyPopup(true);
                                }
                            }}
                            style={{ pointerEvents: selectedList === "Мій список" ? 'none' : 'auto' ,
                                color: selectedList === "Мій список" ? '#C1D7AE' : '#3D6827'}}/>

                    </div>
                </div>
            </div>
            <div className={'bottom-container'}>
                <Tabs
                    id="controlled-tab-example"
                    // value={selectedTab}
                    // onChange={handleTabChange}
                >
                    <Tab eventKey="recepts" title="Мої рецепти">
                        <div className={'own-recipes-container'}>
                            {ownRecipes.map((recipe) => (
                                <SimpleRecipeCard
                                    key={recipe.id}
                                    id={recipe.id}
                                    title={recipe.name}
                                    likes={recipe.countOfLikes}
                                    comments={recipe.countOfComments}
                                    isLiked={recipe.iliked}
                                    status={recipe.status}
                                    updateMyRecipes={fetchOwnRecipes}
                                    showStatus={true}
                                />
                            ))}
                        </div>

                    </Tab>
                    <Tab eventKey="likes-recipes" title="Вподобані">
                        <div className={'liked-recipe-card'}>
                            {likedRecipes.map((recipe) => (
                                <LikedRecipeCard
                                    key={recipe.id}
                                    id={recipe.id}
                                    name={recipe.name}
                                    ingredients={recipe.ingredients}
                                    author={recipe.author.pib}
                                    likes={recipe.countOfLikes}
                                    toggleLikes={onToggleLike}
                                />
                            ))}
                        </div>
                    </Tab>
                    <Tab eventKey="product-list" title="Список продуктів">
                        <div className={'own-product-list'}>
                            <div className={'searching-container'}>
                                <div className={'input-table-container'}>
                                    <TextField
                                        fullWidth
                                        id="standard-basic"
                                        label="Введіть назву продукту"
                                        value={ingredient}
                                        onChange={(e) => {
                                            const current=e.target.value;
                                            setIngredient(current)
                                            if(current==='')setOfferedProducts([]);
                                        }
                                        }
                                        variant="standard"
                                    />
                                    <button className="add-ingredient-button"
                                            disabled={ingredient === ''}
                                            onClick={handleAddProduct}
                                    >
                                        <SearchIcon/>
                                    </button>
                                </div>
                                <div className={'proposal-table-container'}>
                                    <TableContainer component={Paper} style={{maxHeight: "900px", maxWidth: "650px"}}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center"></TableCell>
                                                    <TableCell align="center">Назва продукту</TableCell>
                                                    <TableCell align="center">Кількість</TableCell>
                                                    <TableCell align="center">Магазин</TableCell>
                                                    <TableCell align="center">Ціна</TableCell>
                                                    <TableCell align="center">До списку</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    offeredProducts.map((offered) => (
                                                        <OfferedRow key={offered.id} offered={offered}/>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <button
                                        className="add-ingredient-button"
                                        onClick={() => {
                                            handleAddProduct();
                                        }}
                                        disabled={limit === 100 || ingredient === ''}
                                    >
                                        Показати ще
                                    </button>
                                </div>
                            </div>
                            <div className={'product-list-container'}>
                                <div className={'main-product-list-container'}>
                                    <span className={'product-list-title'}>{selectedList}</span>
                                    <TableContainer component={Paper} sx={{backgroundColor: '#F9FAEE', padding: '0 15px'}}>
                                        <Table sx={{minWidth: 650}} aria-label="simple table">
                                            <TableHead>
                                                <TableRow sx={{'& td, & th': {width: 150}}}>
                                                    <TableCell align="center">Назва</TableCell>
                                                    <TableCell align="center">Розмірність</TableCell>
                                                    <TableCell align="center">К-сть</TableCell>
                                                    <TableCell align="center">Магазин</TableCell>
                                                    <TableCell align="center">Ціна</TableCell>
                                                    <TableCell align="center">Видалити</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {productsList.map((product) => (
                                                    <ListRow item={product}/>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="friend-requests" title="Запити">
                        <div className={'friend-request-card'}>
                            {friendRequests.map((req) => (
                                <FriendRequestCard
                                    key={req.id}
                                    id={req.id}
                                    reqName={req.name}
                                    participants={req.participants}
                                    toggleResponse={onToggleResponse}
                                />
                                ))}
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>

    );
}
export default AccountPage;