import React from 'react'
import "./input.less"

class InputCom extends React.Component{
  render(){
    const {textValue,typeValue,placeholderVal,keyVal,handleInput} = this.props
    return(
      <input  className="input-com" type={typeValue} value={textValue}  placeholder={placeholderVal} onChange={(e)=>handleInput(keyVal,e)} />
    )
  }

}


export default InputCom