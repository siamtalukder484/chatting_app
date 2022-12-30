import React from 'react'


const CmnButton = (props) => {


  return (
    <props.bname onClick={props.click} variant="contained" disableRipple>{props.title}</props.bname>
  )
}

export default CmnButton