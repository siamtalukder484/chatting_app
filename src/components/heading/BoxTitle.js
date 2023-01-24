import React from 'react'

const BoxTitle = (children) => {
  return (
    <h3 className={children.className}>{children.title}</h3>
  )
}

export default BoxTitle