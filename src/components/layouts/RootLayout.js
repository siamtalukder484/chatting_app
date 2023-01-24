import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import Images from './Images';
import {AiOutlineHome, AiOutlineMessage,AiOutlineSetting,AiOutlineLogout} from "react-icons/ai"
import {IoMdNotificationsOutline} from "react-icons/io"
import { getAuth, signOut, onAuthStateChanged  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { activeUser } from '../../slices/userSlices';
// import { useSelector } from 'react-redux';


const RootLayout = () => {
    let authname = useSelector((state) => state)



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

  return (
    <>  
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <div className='sidebar_main'>
                    <div className='sidebar'>
                        <div className='pro_img_main'>
                            <Images src="assets/images/profile.png" className='profile_img'/>
                        </div>
                        <div className='auth_name'>
                            <h4>{authname.userData.userInfo.displayName}</h4>
                        </div>
                        <div className='side_nav'>
                            <AiOutlineHome className='nav_icon'/>
                            <AiOutlineMessage className='nav_icon'/>
                            <IoMdNotificationsOutline className='nav_icon'/>
                            <AiOutlineSetting className='nav_icon'/>
                            <AiOutlineLogout onClick={hundleLogout} className='nav_icon'/>
                        </div>
                    </div>
                </div>
            </Grid>
            <Outlet/>
        </Grid>
        
    </>
  )
}

export default RootLayout