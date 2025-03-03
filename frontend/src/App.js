
import './App.css';
import Routes from "./routes";
import AuthProvider from "./provider/authProvider";

function App() {
  return (
      <AuthProvider>
          <Routes/>
      </AuthProvider>

  );
}

export default App;
