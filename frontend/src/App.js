import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import AccountPage from "./pages/AccountPage";
import RecipePage from "./pages/RecipePage";
import AllRecipesPage from "./pages/AllRecipesPage";
import CreateRecipeForm from "./components/CreateRecipeForm";
import SignUpForm from "./pages/SignUpForm";

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
      {/*<AccountPage/>*/}
      {/*  <RecipePage/>*/}
        {/*<AccountPage/>*/}
        <AllRecipesPage/>
        {/*<CreateRecipeForm open={true}/>*/}
        {/*<SignUpForm open={true}/>*/}
    </div>

  );
}

export default App;
