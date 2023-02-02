import React, { useEffect,useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import Images from './Images';
import {AiOutlineHome, AiOutlineMessage,AiOutlineSetting,AiOutlineLogout} from "react-icons/ai"
import { getAuth, updateProfile } from "firebase/auth";
import {IoMdNotificationsOutline} from "react-icons/io"
import {FiEdit2} from "react-icons/fi"
import {signOut, onAuthStateChanged  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { activeUser } from '../../slices/userSlices';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString,getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
// import { useSelector } from 'react-redux';

// const defaultSrc = "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
const RootLayout = () => {

    let dispatch = useDispatch()
    let navigate = useNavigate()
    const auth = getAuth();
  
    // ===== Crop Image Start =====
    const [image, setImage] = useState();
    const [profile, setProfile] = useState("");
    const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState();

    const onChange = (e) => {
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
      if (typeof cropper !== "undefined") {
        setCropData(cropper.getCroppedCanvas().toDataURL());
        const storage = getStorage();
        const storageRef = ref(storage, `profile_photo/${authname.userData.userInfo.uid}`);
        const message4 = cropper.getCroppedCanvas().toDataURL();
          uploadString(storageRef, message4, 'data_url').then((snapshot) => {
              // console.log('Uploaded a data_url string!');
              setOpen(false)
              setImage("")
              getDownloadURL(storageRef).then((downloadURL) => {
                updateProfile(auth.currentUser, {
                  photoURL: downloadURL,
                }).then(()=>{
                  toast("Profile Picture Upload Successfully..");
                  dispatch(activeUser(auth.currentUser))
                  localStorage.setItem("userInfo",JSON.stringify(auth.currentUser))
                })
              });
        });       
      }
    };
    // ===== Crop Image End =====


    let authname = useSelector((state) => state)
    // console.log(authname.userData.userInfo)
    
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

  // ======= Modal Part Start ========
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  // ======= Modal Part End ========
  <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
/>
  useEffect(()=>{
    setProfile(authname.userData.userInfo.photoURL)
  },[authname])

  return (
    <>  
        <Grid container spacing={2}>
          <ToastContainer />
            <Grid item xs={2}>
                <div className='sidebar_main'>
                    <div className='sidebar'>
                      <div>
                          <div className='pro_img_holder'>
                              <div className='pro_img_main'>
                                {authname.userData.userInfo 
                                ? 
                                  authname.userData.userInfo.photoURL
                                  ?
                                  <Images src={authname.userData.userInfo.photoURL} className='profile_img'/>
                                  :
                                  <Images src="assets/images/profile_avatar.png" className='profile_img'/>
                                :
                                <Images src="assets/images/profile_avatar.png" className='profile_img'/>
                                }
                              </div>
                              <div onClick={handleOpen} className='profile_edit_btn'>
                                <FiEdit2/>
                              </div>
                          </div>
                          <div className='auth_name'>
                            {authname.userData.userInfo 
                            ? 
                            <h4>{authname.userData.userInfo.displayName}</h4>
                            :
                            ""
                            }
                          </div>
                      </div>
                      <div>
                          <div className='side_nav'>
                                <NavLink to="">
                                    <AiOutlineHome className='nav_icon'/>
                                </NavLink>
                                <NavLink to="message">
                                    <AiOutlineMessage className='nav_icon'/>
                                </NavLink>
                                <NavLink to="notification">
                                    <IoMdNotificationsOutline className='nav_icon'/>
                                </NavLink>
                                <NavLink to="settings">
                                    <AiOutlineSetting className='nav_icon'/>
                                </NavLink>
                          </div>
                      </div>
                      <div className='logout_btn'>
                          <AiOutlineLogout onClick={hundleLogout} className='nav_icon'/>
                      </div>
                    </div>
                </div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      <h3 style={{textAlign:"center",marginBottom:"10px"}}>Choose Profile Photo</h3>
                      <div className='pro_edit_preview'>
                            {image ? (
                              <div className='img-preview'></div>
                            ) : 
                              authname.userData.userInfo ? (
                                  authname.userData.userInfo.photoURL
                                  ?
                                  <Images src={authname.userData.userInfo.photoURL} className='profile_img'/>
                                  :
                                  <Images src="assets/images/profile_avatar.png" className='profile_img'/>
                                ) : (
                                  <Images src="assets/images/profile_avatar.png" className='profile_img'/>
                                  
                              )
                            }
                              
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <input style={{textAlign:"center"}} onChange={onChange} type='file'/>
                      {image &&
                        <>
                        <Cropper
                          style={{ height: 400, width: "100%" }}
                          zoomTo={0.5}
                          initialAspectRatio={1}
                          preview=".img-preview"
                          src={image}
                          viewMode={1}
                          minCropBoxHeight={10}
                          minCropBoxWidth={10}
                          background={false}
                          responsive={true}
                          autoCropArea={1}
                          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                          onInitialized={(instance) => {
                            setCropper(instance);
                          }}
                          guides={true}
                        />
                        <button className='cropper_btn' onClick={getCropData}>Upload</button>
                        </>
                      }
                    </Typography>
                  </Box>
                </Modal>
            </Grid>
            <Outlet/>
        </Grid>        
    </>
  )
}

export default RootLayout