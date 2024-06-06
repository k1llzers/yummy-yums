import Dialog from "@mui/material/Dialog";
import {Button, DialogContent, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import AddIcon from "@mui/icons-material/Add";
import Image from "react-bootstrap/Image";
import {useEffect, useState} from "react";

const AddProductsPopup = ({open, setOpen, product}) => {

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {

    }



    return (
        <Dialog open={open} maxWidth="md" fullWidth>
            <DialogContent sx={{backgroundColor: '#F9FAEE'}}>
                <p className="recipe-page-add-products-label">Додайте продукт до власного списку</p>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 220, width: '50%' }}>
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
                        onClick={() => setOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 25,
                            top: 15,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon fontSize="large"/>
                    </IconButton>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">Назва продукту</TableCell>
                                <TableCell align="center">Кількість</TableCell>
                                <TableCell align="center">Магазин</TableCell>
                                <TableCell align="center">Ціна</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">
                                    <Image className="popup-product-photo" src="https://winetime.com.ua/uploads/public/goods/3656/1585225128_63618_502_378.jpg"></Image>
                                </TableCell>
                                <TableCell align="center">Банан</TableCell>
                                <TableCell align="center">1 шт</TableCell>
                                <TableCell align="center">
                                    <Image
                                        src={'https://cdn.picodi.com/ua/files/shop-description/a/atbmarket/atb-logo.png?v=6656'}
                                        className={'shop-image'}></Image>
                                </TableCell>
                                <TableCell align="center">20 грн</TableCell>
                                <TableCell align="center">
                                    <Button><AddIcon/></Button>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">
                                    <Image className="popup-product-photo" src="https://cooker.net.ua/upload/iblock/12a/pomidor-500-600g-1033.jpg"></Image>
                                </TableCell>
                                <TableCell align="center">Помідор</TableCell>
                                <TableCell align="center">1 шт</TableCell>
                                <TableCell align="center">
                                    <Image
                                        src={'https://cdn.picodi.com/ua/files/shop-description/a/atbmarket/atb-logo.png?v=6656'}
                                        className={'shop-image'}></Image>
                                </TableCell>
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

export default AddProductsPopup;