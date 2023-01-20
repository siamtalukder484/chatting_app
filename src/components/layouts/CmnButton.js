import React from 'react'


const CmnButton = (props) => {


  return (
    <props.bname style={props.style} onClick={props.click} variant="contained" disableRipple>{props.title}</props.bname>
  )
}

export default CmnButton