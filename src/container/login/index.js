import React from "react"
import axios from "../../config/axios"

import { connect } from "react-redux"
import { login, cleareMsg } from "../../redux/user.redux"

import InputCom from "../../components/input"
import FormTopText from "../../components/formTopText"
import FromButton from "../../components/button/formButton"
import FormOtherBox from "../../components/otherBox/formOtherBox"
import FormerrMsg from "../../components/tipMes/formerrMsg"


import "./login.less";


@connect(
  state => state.user,
  { login, cleareMsg }
)
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleInput(key, e) {
    this.setState({
      [key]: e.target.value
    });
  }
  login() {
    let { email, password } = this.state;
    this.props.login(email, password)
  }
  componentWillUnmount(){
    this.props.cleareMsg()
    console.log('login')
  }
  render() {
    return (
      <div className="login-container">
        <div className="login-box vertical-center">
          <FormTopText sloganValue="很高兴，再次遇见你" />
          <div className="form-box fadeInDown">
            <InputCom autoFocus typeValue="text" textValue={this.state.email} placeholderVal="邮箱" keyVal="email" handleInput={this.handleInput.bind(this)} />
            <InputCom typeValue="password" textValue={this.state.password} placeholderVal="密码" keyVal="password" handleInput={this.handleInput.bind(this)} />
          </div>
          <FormerrMsg msgValue={this.props.errMsg} />
          <FromButton onClick={this.login.bind(this)} buttonText="登录" />
          <FormOtherBox otherOne={{router:"/register",textValue:"立即注册"}} otherTwo={{router:"/reset",textValue:"找回密码"}} />
        </div>
      </div>
    );
  }
}

export default Login;
