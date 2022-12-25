import React from 'react'
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

  return (
    <>
        <Grid container spacing={2}>
            <Grid className='reg_left_main' item xs={6}>
            <div className='reg_left'>
                <Header>
                    <Heading title="Login to your account!" className='reg_title' as="h1"/>
                    <Link to='#'>
                        <Images className='google_auth_img' src='assets/images/google_login.png'/>
                    </Link>
                </Header>
                <div className='input_main'>
                    <InputBox className='reg_email' type='email' label='Email Address' variant='standard'/>
                    <InputBox className='reg_password' type='password' label='Password' variant='standard'/>
                </div>
                <div className='reg_btn'>
                    <CmnButton bname={CommonBtn} title="Login to Continue"/>
                    <Authentication className='reg_auth' title="Don't have an account?" href='/registration' hreftitle='sign up'/>
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