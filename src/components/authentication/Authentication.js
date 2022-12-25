import React from 'react'
import { Link } from 'react-router-dom'

const Authentication = ({className,title,href,hreftitle}) => {
  return (
    <p className={className}>
        {title}  
        <Link to={href}>{hreftitle}</Link>
    </p>
  )
}

export default Authentication