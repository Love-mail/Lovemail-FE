import React from 'react'
import history from "../../config/history"

import "./formTopText.less"

const FormTopText = ({sloganValue}) => {
  return(
    <div className="wellcome-box fadeInDown">
          <h1 onClick={() => history.push('/')}>LoveMail</h1>
          <h3>{sloganValue}</h3>
        </div>
  )
}

export default FormTopText