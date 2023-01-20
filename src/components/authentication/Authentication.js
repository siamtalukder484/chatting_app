import React from 'react'
import { Link } from 'react-router-dom'

const Authentication = ({className,title,href,hreftitle,onClick}) => {
  return (
    <p className={className}>
        {title}  
        <Link onClick={onClick} to={href}>{hreftitle}</Link>
    </p>
  )
}

export default Authentication