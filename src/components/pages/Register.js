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
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
// import InputBox from '../heading/InputBox'


const Register = () => {
  const auth = getAuth();

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

  let [show, setShow] = useState(false);
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
    setFormdata ({
      ...formData,
      [name]:value
    })
    setError({...error,[name]: ""})
  }

  let hundleClick = () =>{
    if(formData.email == ""){
      setError({...error,email: "Email dao"})
    }
    else if(formData.full_name == ""){
      setError({...error,full_name: "Name dao"})
    }
    else if(formData.password == ""){
      setError({...error,password: "password dao"})
    }
    else if(formData.c_password == ""){
      setError({...error,c_password: "Confirm Password dao"})
    }
    else{
      createUserWithEmailAndPassword(auth,formData.email,formData.password).then((user)=>{
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("Email send")
          });
      }).catch((error)=>{
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
        <Grid className='reg_left_main' item xs={6}>
          <div className='reg_left'>
              <Header>
                  <Heading title="Get started with easily register" className='reg_title' as="h1"/>    
                  <p className='reg_subtitle'>Free register and you can enjoy it</p>
              </Header>
              <div className='input_main'>
                <div className='input_grp'>
                    <InputBox textChange={hundleForm} name="email" className='reg_email' type='email' label='Email Address' variant='outlined'/>
                    {error.email &&
                      <Alert className='error' variant="filled" severity="error">
                          {error.email}
                      </Alert>
                    }
                </div>
                <div className='input_grp'>
                    <InputBox textChange={hundleForm} name="full_name" className='reg_name' type='text' label='Full Name' variant='outlined'/>
                    {error.full_name &&
                      <Alert className='error' variant="filled" severity="error">
                          {error.full_name}
                      </Alert>
                    }
                </div>
                <div className='input_grp'>
                    <InputBox textChange={hundleForm} name="password" className='reg_password' type={show ? "text" : "password"} label='Password' variant='outlined'/>
                    {show 
                    ?
                    <AiFillEye onClick={()=>setShow(false)} className='openeye'/>
                    :
                    <AiFillEyeInvisible onClick={()=>setShow(true)} className='openeye'/>
                    }
                    {error.password &&
                      <Alert className='error' variant="filled" severity="error">
                          {error.password}
                      </Alert>
                    }
                </div>
                <div className='input_grp'>
                    <InputBox textChange={hundleForm} name="c_password" className='reg_password' type='password' label='Confirm Password' variant='outlined'/>
                    {error.c_password &&
                      <Alert className='error' variant="filled" severity="error">
                          {error.c_password}
                      </Alert>
                    }
                </div>
                
              </div>
              <div className='reg_btn'>
                <CmnButton click={hundleClick} bname={CommonBtn} title="sign up"/>
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