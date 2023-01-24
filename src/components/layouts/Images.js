import React from 'react'

const Images = ({ src,className,onClick }) => {
  return (
    <img onClick={onClick} src={src} alt="Not_Found" className={className}/>
  )
}

export default Images