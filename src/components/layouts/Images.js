import React from 'react'

const Images = ({ src,className,onClick }) => {
  return (
    <img onClick={onClick} src={src} alt="img" className={className}/>
  )
}

export default Images