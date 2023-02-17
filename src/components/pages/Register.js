import React, { useState } from 'react'
import Header from '../heading/Header'
import Heading from '../heading/Heading'
import Grid from '@mui/material/Grid';
import Images from '../layouts/Images';
import InputBox from '../heading/InputBox';
import CmnButton from '../layouts/CmnButton';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Authentication from '../authentication/Authentication';
import Alert from '@mui/material/Alert';
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Puff } from  'react-loader-spinner'
import { getDatabase, set, ref, push } from "firebase/database";
// import InputBox from '../heading/InputBox'


const Register = () => {
  const database = getDatabase();
  const auth = getAuth();
  let navigate = useNavigate();

  const CommonBtn = styled(Button)({
    width: "395px",
    textTransform: 'capitalize',
    padding: '10px 0',
    border: 'none',
    backgroundColor: '#5F35F5',
    borderRadius: "50px",
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

  let [success, setSuccess] = useState();
  let [showPass, setPass] = useState(false);
  let [showcpass, setCpass] = useState(false);
  let [loader, setLoader] = useState(false);
  let [progress, setProgress] = useState(0);

  let [formData, setFormdata] = useState({
    email: "",
    full_name: "",
    password: "",
    c_password: "",
  });

  let [error, setError] = useState({
    email: "",
    full_name: "",
    password: "",
    c_password: "",
  })

  let hundleForm = (e) =>{
    let {name,value} = e.target 
    setFormdata ((prev)=>({
      ...prev,
      [name]:value
    }))
    let capital = /[A-Z]/
    let lower = /[a-z]/
    let number = /[0-9]/
    if(name == "password"){
      if(!capital.test(value)){
        setError({...error,password: "One capital letter required"})
        // setProgress(progress-25)
        return
      }
      // else{
      //   if(progress < 100){
      //     setProgress(progress+25)
      //   }
      // }
      else if(!lower.test(value)){
        setError({...error,password: "One lower letter required"})
        return
      }
      // else{
      //   if(progress < 100){
      //     setProgress(progress+25)
      //   }
      // }
      else if(!number.test(value)){
        setError({...error,password: "One number required"})
        return
      }
      // else{
      //   if(progress < 100){
      //     setProgress(progress+25)
      //   }
      // }
      else if(value.length < 8){
        setError({...error,password: "Password length atleast 8"})
        return
      }
      // else{
      //   if(progress < 100){
      //     setProgress(progress+25)
      //   }
      // }
    }

    setError({...error,[name]: ""})
    console.log(formData)
  }

  let hundleClick = () =>{
    // setLoader(true)
    let email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(formData.email === ""){
      setLoader(false)
      setError({...error,email: "Email address required"})
    }
    else if(!email_regex.test(formData.email)){
      setLoader(false)
      setError({...error,email: "Valid Email address required"})
    }
    else if(formData.full_name === ""){
      setLoader(false)
      setError({...error,full_name: "Name required"})
    }
    else if(formData.password === ""){
      setLoader(false)
      setError({...error,password: "Password required"})
    }
    else if(formData.c_password === ""){
      setLoader(false)
      setError({...error,c_password: "Confirm Password required"})
    }
    else if(formData.c_password !== formData.password){
      setLoader(false)
      setError({...error,c_password: "Confirm Password and Password not matched"})
    }
    else{
      setLoader(true)
      createUserWithEmailAndPassword(auth,formData.email,formData.password).then((user)=>{
        sendEmailVerification(auth.currentUser)
          .then(() =>{
            updateProfile(auth.currentUser, {
              displayName: formData.full_name,
            }).then(() => {
              set(ref(database, 'users/' + user.user.uid), {
                displayName: user.user.displayName,
                email: user.user.email,
              }).then(()=>{
                setLoader(false)
                toast("Registration Successfully");
                setTimeout(()=>{
                  navigate("/")
                },2000)
              })
            }).catch((error) => {
              // An error occurred
              // ...
            });
          })
      }).catch((error)=>{
        setLoader(false)
        const errorCode = error.code;
        if(errorCode.includes("auth/email-already-in-use")){
          setError({...error,email: "Email already existed"})
        };
        
      })
    }
  }
  // let hundleForm = (e) =>{
  //   if(e.target.name == "email"){
  //     setFormdata({...formData,email:e.target.value})
  //     console.log(formData)
  //   }else if(e.target.name == "full_name"){
  //     setFormdata({...formData,full_name:e.target.value})
  //     console.log(formData)
  //   }else{
  //     setFormdata({...formData,password:e.target.value})
  //     console.log(formData)
  //   };
  // }
// let hundleTextInput = (e) =>{
//   console.log(e.target.value);
// }


  return (
    <>
      <Grid container spacing={2}>
      <ToastContainer />
        <Grid className='reg_left_main' item xs={6}>
          <div className='reg_left'>
              <Header>
                  <Heading title="Get started with easily register" className='reg_title' as="h1"/>    
                  <p className='reg_subtitle'>Free register and you can enjoy it</p>
              </Header>
              <div className='input_main'>
                <div className='input_grp'>
                    {success &&
                      <Alert className='reg_suc_alert' variant="filled" severity="success">
                          {success}
                      </Alert>
                    }
                    <InputBox textChange={hundleForm} name="email" className='reg_email' type='email' label='Email Address' variant='outlined'/>
                    {error.email &&
                      <Alert className='reg_error_alert' variant="filled" severity="error">
                          {error.email}
                      </Alert>
                    }
                </div>
                <div className='input_grp'>
                    <InputBox textChange={hundleForm} name="full_name" className='reg_name' type='text' label='Full Name' variant='outlined'/>
                    {error.full_name &&
                      <Alert className='reg_error_alert' variant="filled" severity="error">
                          {error.full_name}
                      </Alert>
                    }
                </div>
                <div className='input_grp'>
                    <InputBox textChange={hundleForm} name="password" className='reg_password' type={showPass ? "text" : "password"} label='Password' variant='outlined'/>
                    {/* <LinearProgress variant="buffer" value={progress} className="pass_pro"/> */}
                    {showPass 
                    ?
                    <AiFillEye onClick={()=>setPass(false)} className='openeye'/>
                    :
                    <AiFillEyeInvisible onClick={()=>setPass(true)} className='openeye'/>
                    }
                    {error.password &&
                      <Alert className='reg_error_alert' variant="filled" severity="error">
                          {error.password}
                      </Alert>
                    }
                </div>
                <div className='input_grp'>
                    <InputBox textChange={hundleForm} name="c_password" className='reg_password' type={showcpass ? "text" : "password"} label='Confirm Password' variant='outlined'/>
                    {showcpass 
                    ?
                    <AiFillEye onClick={()=>setCpass(false)} className='openeye'/>
                    :
                    <AiFillEyeInvisible onClick={()=>setCpass(true)} className='openeye'/>
                    }
                    {error.c_password &&
                      <Alert className='reg_error_alert' variant="filled" severity="error">
                          {error.c_password}
                      </Alert>
                    }
                </div>
                
              </div>
              <div className='reg_btn'>
                
                {loader ?
                <Puff
                    height="80"
                    width="80"
                    radius={1}
                    color="#4fa94d"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                  :
                  <CmnButton click={hundleClick} bname={CommonBtn} title="sign up"/>
                }
                <Authentication className='reg_auth' title='Already have an account?' href='/' hreftitle='sign in'/>
              </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Images src='assets/images/registration_img.jpg' className='reg_img'/>
        </Grid>
        
      </Grid>  
    </>
  )
}



export default Register