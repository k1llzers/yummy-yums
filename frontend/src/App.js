import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from "./pages/HomePage";
import CreateRecipeForm from "./components/CreateRecipeForm";
import RecipePage from "./pages/RecipePage";
import SimpleRecipeCard from "./components/SimpleRecipeCard";
import RecipeCard from "./components/RecipeCard";

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
      {/*<NavBar/>*/}
      {/*  <HomePage/>*/}
      {/*  <CreateRecipeForm open={true}/>*/}
        <RecipePage/>
      {/*  <NavBar/>*/}
      {/*  <SimpleRecipeCard/>*/}
      {/*  <RecipeCard/>*/}
    </div>

  );
}

export default App;
