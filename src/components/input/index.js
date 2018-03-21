import React from 'react'
import "./input.less"

const InputCom = ({textValue,typeValue,placeholderVal,keyVal,handleInput}) => {
  return(
    <input  className="input-com" type={typeValue} value={textValue}  placeholder={placeholderVal} onChange={(e)=>handleInput(keyVal,e)} />
  )
}

export default InputCom