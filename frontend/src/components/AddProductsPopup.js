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

export default AddProductsPopup;