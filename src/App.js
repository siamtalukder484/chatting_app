import {RouterProvider,createBrowserRouter,createRoutesFromElements,Route} from "react-router-dom"
import Login from "./components/pages/Login";
import Register from './components/pages/Register';
import Home from './components/pages/Home'



const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/registration" element={<Register/>}></Route>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/home" element={<Home/>}></Route>
  </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
