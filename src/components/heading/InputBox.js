import React from 'react'
import TextField from '@mui/material/TextField';
// import { alpha, styled } from '@mui/material/styles';
// import InputBase from '@mui/material/InputBase';


const InputBox = ({label,variant,className,type,textChange,name}) => {

  return (
    <>
        <TextField onChange={textChange} name={name} className={className} type={type} label={label} variant={variant} />
    </>
  )
}

export default InputBox