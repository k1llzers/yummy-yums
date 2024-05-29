import { InputBase, styled } from "@mui/material";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#3D6827',
    fontFamily: 'Gentium Plus',
    fontSize: '1.1rem',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '18ch',
            '&:focus': {
                width: '30ch',
            },
        },
        '&::placeholder': {
            color: '#3D6827',
        },
    },
}));

export default StyledInputBase;