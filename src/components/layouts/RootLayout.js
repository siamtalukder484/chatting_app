import React, { useEffect,useState } from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import Images from './Images';
import {AiOutlineHome, AiOutlineMessage,AiOutlineSetting,AiOutlineLogout} from "react-icons/ai"
import {IoMdNotificationsOutline} from "react-icons/io"
import {FiEdit2} from "react-icons/fi"
import { getAuth, signOut, onAuthStateChanged  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { activeUser } from '../../slices/userSlices';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
// import { useSelector } from 'react-redux';

const defaultSrc = "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
const RootLayout = () => {

  
    // ===== Crop Image Start =====
    const [image, setImage] = useState(defaultSrc);
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
      }
    };
    // ===== Crop Image End =====


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

  return (
    <>  
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <div className='sidebar_main'>
                    <div className='sidebar'>
                        <div className='pro_img_main'>
                            <Images src="assets/images/profile.png" className='profile_img'/>
                            <div onClick={handleOpen} className='profile_edit_btn'>
                              <FiEdit2/>
                            </div>
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
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Choose Profile Photo
                      <div className='pro_edit_preview'>
                            {/* <Images src="assets/images/profile.png" className='img-preview'/> */}
                            <div className='img-preview'></div>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <input onChange={onChange} type='file'/>
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
                    </Typography>
                  </Box>
                </Modal>
            </Grid>
            <Outlet/>
        </Grid>


        <Button >Open modal</Button>
        
        
    </>
  )
}

export default RootLayout