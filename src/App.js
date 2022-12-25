import {RouterProvider,createBrowserRouter,createRoutesFromElements,Route} from "react-router-dom"
import Login from "./components/pages/Login";
import Register from './components/pages/Register';


const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/registration" element={<Register/>}></Route>
    <Route path="/" element={<Login/>}></Route>
  </>
))

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
