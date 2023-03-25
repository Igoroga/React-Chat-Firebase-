import {BrowserRouter} from "react-router-dom"
import './App.css';
import AppRouter from "./components/AppRouter";
import MenuAppBar from "./components/MenuAppBar";
import { getAuth } from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth"
import Loader from "./components/Loader";

function App() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return(
    <Loader/>
    )
  }

  return (
    <BrowserRouter>
    <MenuAppBar/>
    <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
