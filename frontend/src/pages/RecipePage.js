import '../styles/RecipePage.css';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Image from 'react-bootstrap/Image';
import PlaceIcon from '@mui/icons-material/Place';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import {Button, DialogContent, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const RecipePage = () => {


    const AddProductsPopup = ({open}) => {
        return (
            <Dialog open={open} maxWidth="md" fullWidth>
                <DialogContent sx={{backgroundColor: '#F9FAEE'}}>
                    <p className="recipe-page-add-products-label">Додайте продукт до власного списку</p>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Оберіть список продуктів</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                        >
                            <MenuItem value={10}>Лялялял</MenuItem>
                            <MenuItem value={20}>Лялялял</MenuItem>
                            <MenuItem value={30}>Лялялял</MenuItem>
                        </Select>
                    </FormControl>
                    <TableContainer component={Paper}>
                        <IconButton
                            aria-label="close"
                            sx={{
                                position: 'absolute',
                                right: 25,
                                top: 15,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon fontSize="large"/>
                        </IconButton>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Назва продукту</TableCell>
                                    <TableCell align="center">Кількість</TableCell>
                                    <TableCell align="center">Магазин</TableCell>
                                    <TableCell align="center">Адреса</TableCell>
                                    <TableCell align="center">Ціна</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center">Помідори</TableCell>
                                    <TableCell align="center">1 шт</TableCell>
                                    <TableCell align="center">Сільпо</TableCell>
                                    <TableCell align="center">Закревського 95а</TableCell>
                                    <TableCell align="center">20 грн</TableCell>
                                    <TableCell align="center">
                                        <Button><AddIcon/></Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <>
            <div className="recipe-main-container">
                <NavBar/>
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
                            <p className="recipe-page-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vestibulum fermentum faucibus. Phasellus feugiat ligula ligula, sed convallis felis tristique ut. Vestibulum a semper neque, a viverra lectus.</p>
                        </div>
                        <Image className="recipe-page-img-left" src="https://images.unian.net/photos/2022_09/thumb_files/1200_0_1662892107-3846.jpg"></Image>
                        <Image className="recipe-page-img-right" src="https://images.unian.net/photos/2022_09/thumb_files/1200_0_1662892107-3846.jpg"></Image>
                        <p className="recipe-page-ingredients"><span className="recipe-page-ingredients-label">Інгредієнти: </span>сіль, помідори, огірки, вода</p>
                    </div>
                    <div className="recipe-page-add-products-container">
                        <AddProductsPopup open={true}/>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    )

}

export default RecipePage;