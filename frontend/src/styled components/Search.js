import {styled} from "@mui/material";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '30px',
    backgroundColor: '#E2F0D2',
    '&:hover': {
        backgroundColor: '#E2F0D2',
    },
    marginLeft: 0,
    marginRight: '30px',
    width: '100%',
    maxHeight: '42px',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

export default Search;