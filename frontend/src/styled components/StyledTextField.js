import {styled} from "@mui/material";
import TextField from "@mui/material/TextField";

const StyledTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#3D6827',
        fontSize: '1.2rem',
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: '#E0E3E7',
    },
    '& .MuiInput-underline:hover:before': {
        borderBottomColor: '#3D6827',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: '#3D6827',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#3D6827',
    },
    '& .MuiInputBase-input': {
        color: '#5b5e59',
        fontFamily: 'Gentium Plus',
        fontSize: '1.2rem',
    },
    '& .MuiFormLabel-root': {
        fontFamily: 'Gentium Plus',
        fontSize: '1.2rem',
    },
    margin: '0 0 30px 0',
});

export default StyledTextField;