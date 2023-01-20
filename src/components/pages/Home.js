import React, { useEffect } from 'react'
import { getAuth, signOut, onAuthStateChanged  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { activeUser } from '../../slices/userSlices';


const Home = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const auth = getAuth();
  useEffect(()=>{
    if(!data.userData.userInfo){
      console.log("ki ki")
      navigate("/")
    }
  },[])

  let data= useSelector(state => state)
  console.log(data.userData.userInfo)
  if(!data.userData.userInfo){
    // console.log("ki ki")
  }

  let hundleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("userInfo")
      dispatch(activeUser(null))
      navigate("/")
    }).catch((error) => {
      // An error happened.
    });
  }

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log(user)
  //     dispatch(activeUser(user))
  //   } 
  //   else {
  //     navigate("/")
  //   }
  // });

  return (
    <>
      <h1>This is Home Page</h1>
      <button onClick={hundleLogout}>Logout</button>
    </>
  )
}

export default Home