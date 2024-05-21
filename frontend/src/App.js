import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import SimpleRecipeCard from "./components/SimpleRecipeCard";
import RecipeCard from "./components/RecipeCard";
import HomePage from "./pages/HomePage";
import CreateRecipeForm from "./components/CreateRecipeForm";

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
      {/*  <NavBar/>*/}
      {/*  <SimpleRecipeCard/>*/}
      {/*  <RecipeCard/>*/}
        <CreateRecipeForm open={true}/>
        <HomePage/>

    </div>

  );
}

export default App;
