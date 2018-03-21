import React from "react";
import axios from "../../config/axios";

import { connect } from "react-redux"
import { reset, getCode } from "../../redux/user.redux"

import InputCom from "../../components/input"
import FormTopText from "../../components/formTopText"
import FromButton from "../../components/button/formButton"
import FormOtherBox from "../../components/otherBox/formOtherBox"
import TimeoutButton from "../../components/button/timeoutButton"
import FormerrMsg from "../../components/tipMes/formerrMsg"

import "./reset.less";
@connect(
  state => state.user,
  { reset, getCode }
)
class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      code: "",
    };
  }
  handleInput(key, e) {
    this.setState({
      [key]: e.target.value
    });
  }
  getCode() {
    let { email } = this.state;
    this.props.getCode("RESET", email)
  }
  reset() {
    let { email, password, code } = this.state;
    this.props.reset(email, password, code)    
  }
  render() {
    return (
      <div className="reset-container">
        <div className="reset-box vertical-center">
          <FormTopText sloganValue="我就在这里，等风也等你" />
          <div className="form-box fadeInDown">
            <InputCom typeValue="text" textValue={this.state.email} placeholderVal="邮箱" keyVal="email" handleInput={this.handleInput.bind(this)} />
            <InputCom typeValue="text" textValue={this.state.code} placeholderVal="验证码" keyVal="code" handleInput={this.handleInput.bind(this)} />
            <InputCom typeValue="password" textValue={this.state.password} placeholderVal="密码" keyVal="password" handleInput={this.handleInput.bind(this)} />
            <TimeoutButton style={{bottom: '66px'}} disableVal={this.props.codeDisable} onClick={this.getCode.bind(this)} buttonText={this.props.timeOut === 0 ? this.props.checkText : `${this.props.timeOut }s`}/>
          </div>
          <FormerrMsg msgValue={this.props.errMsg} />
          <FromButton onClick={this.reset.bind(this)} buttonText={this.props.resetMsg} />
          <FormOtherBox otherOne={{router:"/login",textValue:"立即登录"}} otherTwo={{router:"/register",textValue:"立即注册"}} />
        </div>
      </div>
    );
  }
}

export default Reset;
