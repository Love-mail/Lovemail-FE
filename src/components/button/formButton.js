import React from 'react'
import "./formButton.less"

const FromButton = ({buttonText,onClick}) => {
  return (
    <button onClick={onClick}  className="form-button">{buttonText}</button>
  )
}

export default FromButton