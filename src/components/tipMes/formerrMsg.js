import React from 'react'

import "./formerrMsg.less"

const FormerrMsg = ({msgValue}) => {
  return(
    <div className="form-err-msg">{msgValue}</div>
  )
}

export default FormerrMsg