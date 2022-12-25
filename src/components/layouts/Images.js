import React from 'react'

const Images = ({ src,className }) => {
  return (
    <img src={src} alt="Image_Not_Found" className={className}/>
  )
}

export default Images