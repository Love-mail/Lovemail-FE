import React from 'react'
import { withRouter } from 'react-router-dom'

import "./formTopText.less"

@withRouter
class FormClass extends React.Component {
    render(){
      const { sloganValue } = this.props
      return(
        <div className="wellcome-box fadeInDown">
          <h1 onClick={() => this.props.history.push('/')}>LoveMail</h1>
          <h3>{sloganValue}</h3>
        </div>
      )
    }
}

export default FormClass