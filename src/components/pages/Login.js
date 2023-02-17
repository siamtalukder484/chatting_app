import React, { useState } from 'react'
import Header from '../heading/Header'
import Heading from '../heading/Heading'
import Grid from '@mui/material/Grid';
import Images from '../layouts/Images';
import InputBox from '../heading/InputBox';
import CmnButton from '../layouts/CmnButton';
import Authentication from '../authentication/Authentication';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { activeUser } from '../../slices/userSlices';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { yellow } from '@mui/material/colors';


const Login = () => {

    const CommonBtn = styled(Button)({
        width: "395px",
        textTransform: 'capitalize',
        padding: '10px 0',
        border: 'none',
        backgroundColor: '#5F35F5',
        borderRadius: "5px",
        color:"#fff",
        fontFamily: "font-family: 'Nunito', sans-serif;",
        fontSize: "20.64px",
        fontWeight: "500",
        '&:hover': {
          backgroundColor: '#000',
          borderColor: '#0062cc',
          boxShadow: 'none',
          color:"#fff",
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#0062cc',
          borderColor: '#005cbf',
        },
        '&:focus': {
          boxShadow: 'none',
        },
      });
      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 460,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      let auth = getAuth();
      const provider = new GoogleAuthProvider();
      let navigate = useNavigate();
      let dispatch = useDispatch();
      
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

      let [formData, setFormdata] = useState({
        email: "",
        password: "",
        emailfgp: "",
      });
    
      let [error, setError] = useState({
        email: "",
        password: "",
      
      })
      let hundleForm = (e) =>{
        let {name,value} = e.target
        setFormdata ({
          ...formData,
          [name]:value
        })
        setError({...error,[name]: ""})
      }
      let fgpClick = () =>{
        sendPasswordResetEmail(auth,formData.emailfgp)
        .then(() => {
          toast("Email send successfully");
        })
      }
      let hundleClick = () =>{
        let email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(formData.email === ""){
          setError({...error,email: "Email address required"})
        }
        else if(!email_regex.test(formData.email)){
          setError({...error,email: "Valid Email address required"})
        }
        else if(formData.password === ""){
          setError({...error,password: "Password required"})
        }
        else{
          signInWithEmailAndPassword(auth, formData.email, formData.password)
          .then((userCredential) => {
              dispatch(activeUser(userCredential.user))
              localStorage.setItem("userInfo",JSON.stringify(userCredential.user))
              if(userCredential.user.emailVerified){
                navigate("/minder")
              }else{
                toast("Please verify your email first.");
              }
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast("Incorrect email or password");
          });
        }
      }

      let hundleGoogleAuth = () =>{
        signInWithPopup(auth, provider)
        .then((result) => {
            navigate("/minder")
        })
      }
      let buttonstyle={
        backgroundColor: "red",
      }

  return (
    <>
        <Grid container spacing={2}>
        <ToastContainer />
            <Grid className='reg_left_main' item xs={6}>
            <div className='reg_left'>
                <Header>
                    <Heading title="Login to your account!" className='reg_title' as="h1"/>
                        <Images onClick={hundleGoogleAuth} className='google_auth_img' src='assets/images/google_login.png'/>
                    {/* <Link to='#'>
                    </Link> */}
                </Header>
                <div className='input_main'>
                    <InputBox textChange={hundleForm} className='reg_email' name="email" type='email' label='Email Address' variant='standard'/>
                    {error.email &&
                      <Alert className='reg_error_alert' variant="filled" severity="error">
                          {error.email}
                      </Alert>
                    }
                    <InputBox textChange={hundleForm} className='reg_password' name="password" type='password' label='Password' variant='standard'/>
                    {error.password &&
                      <Alert className='reg_error_alert' variant="filled" severity="error">
                          {error.password}
                      </Alert>
                    }
                </div>
                <div className='reg_btn'>
                    <CmnButton click={hundleClick} bname={CommonBtn} title="Login to Continue"/>
                    <Authentication className='reg_auth' title="Don't have an account?" href='/registration' hreftitle='sign up'/>
                    <Authentication onClick={handleOpen} className='reg_auth forgot_auth' title="Reset your password?" hreftitle='Click here'/>
                    {/* <Button onClick={handleOpen}>Forgot Password</Button> */}
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          Forgot Password
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <InputBox textChange={hundleForm} className='reg_password fgp_input' name="emailfgp" type='email' label='Email' variant='standard'/>
                          <CmnButton style={buttonstyle} className="fgp_btn" click={fgpClick} bname={CommonBtn} title="Send Email"/>
                        </Typography>
                      </Box>
                    </Modal>
                </div>
            </div>
            </Grid>
            <Grid item xs={6}>
                <Images src='assets/images/login_img.jpg' className='reg_img'/>
            </Grid> 
        </Grid> 
    </>
  )
}

export default Login