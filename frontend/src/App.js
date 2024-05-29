
import './App.css';
import AccountPage from "./pages/AccountPage";
import RecipePage from "./pages/RecipePage";
import AllRecipesPage from "./pages/AllRecipesPage";
import CreateRecipeForm from "./components/CreateRecipeForm";
import SignUpForm from "./pages/SignUpForm";
import LogInForm from "./pages/LogInForm";

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
      <AccountPage/>
      {/*  <RecipePage/>*/}
      {/*  <LogInForm open={true}/>*/}
      {/*  <AllRecipesPage/>*/}
      {/*  <CreateRecipeForm open={true}/>*/}
      {/*  <SignUpForm open={true}/>*/}
    </div>

  );
}

export default App;
