import React from 'react'
import "./timeoutButton.less"

const TimeoutButton = ({style, disableVal, onClick, buttonText}) => {
  return(
    <button
      style={style}
      className="timeoutButton"
      disabled={disableVal}
      onClick={onClick}
    >
      {buttonText}
    </button>
  )
}

export default TimeoutButton