import {RouterProvider,createBrowserRouter,createRoutesFromElements,Route} from "react-router-dom"
import Login from "./components/pages/Login";
import Register from './components/pages/Register';
import Home from './components/pages/Home'
import RootLayout from "./components/layouts/RootLayout";
import Message from "./components/pages/Message";
import Notification from "./components/pages/Notification";
import Settings from "./components/pages/Settings";




const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/registration" element={<Register/>}></Route>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/minder" element={<RootLayout/>}>
      <Route index element={<Home/>}></Route>
      <Route path="message" element={<Message/>}></Route>
      <Route path="notification" element={<Notification/>}></Route>
      <Route path="settings" element={<Settings/>}></Route>
    </Route>
  </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
