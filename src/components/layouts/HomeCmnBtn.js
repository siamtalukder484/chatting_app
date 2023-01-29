import React from 'react'

const HomeCmnBtn = ({title,className, onClick}) => {
  return (
    <button className={className} onClick={onClick}>{title}</button>
  )
}

export default HomeCmnBtn