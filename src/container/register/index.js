import React from "react"

import { connect } from "react-redux"
import { register, getCode } from "../../redux/user.redux"

import InputCom from "../../components/input"
import FormTopText from "../../components/formTopText"
import FromButton from "../../components/button/formButton"
import FormOtherBox from "../../components/otherBox/formOtherBox"
import TimeoutButton from "../../components/button/timeoutButton"
import FormerrMsg from "../../components/tipMes/formerrMsg"

import "./register.less"

@connect(
  state => state.user,
  { register, getCode }
)
class Register extends React.Component {
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
    this.props.getCode("SIGNUP",email)
  }
  
  async register() {
    let { email, password, code } = this.state;
    this.props.register(email, password, code)
  }
  
  render() {
    return (
      <div className="register-container">
        <div className="register-box vertical-center">
          <FormTopText sloganValue="你的到来，就是最好的礼物" />
          <div className="form-box fadeInDown">
            <InputCom typeValue="text" textValue={this.state.email} placeholderVal="邮箱" keyVal="email" handleInput={this.handleInput.bind(this)} />
            <InputCom typeValue="password" textValue={this.state.password} placeholderVal="密码" keyVal="password" handleInput={this.handleInput.bind(this)} />
            <InputCom typeValue="text" textValue={this.state.code} placeholderVal="验证码" keyVal="code" handleInput={this.handleInput.bind(this)} />
            <TimeoutButton style={{bottom: '9px'}} disableVal={this.props.codeDisable} onClick={this.getCode.bind(this)} buttonText={this.props.timeOut === 0 ? this.props.checkText : `${this.props.timeOut }s`}/>
          </div>
          <FormerrMsg msgValue={this.props.errMsg} />
          <FromButton onClick={this.register.bind(this)} buttonText={this.props.registerMsg} />
          <FormOtherBox otherOne={{router:"/login",textValue:"已有账号？ 立即登录"}} />
        </div>
      </div>
    );
  }
}

export default Register