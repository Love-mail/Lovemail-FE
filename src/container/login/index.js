import React from "react"
import axios from "../../config/axios"

import InputCom from "../../components/input"
import FormTopText from "../../components/formTopText"
import FromButton from "../../components/button/formButton"
import FormOtherBox from "../../components/otherBox/formOtherBox"
import FormerrMsg from "../../components/tipMes/formerrMsg"

import { setCookie } from "../../config/token"

import "./login.less";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      loginMes: "登录"
    };
  }
  handleInput(key, e) {
    this.setState({
      [key]: e.target.value
    });
  }
  checkAllInfo() {
    let { email, password } = this.state;
    let reg = new RegExp(
      "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
    );
    if (!reg.test(email)) {
      this.setState({
        errorMessage: "请输入正确的邮箱"
      });
      return false;
    } else if (password.length <= 3) {
      console.log(password.length);
      this.setState({
        errorMessage: "请输入正确的密码(4位以上)"
      });
      return false;
    } else {
      this.setState({
        errorMessage: ""
      });
      return true;
    }
  }

  async login() {
    let { email, password } = this.state;
    if (this.checkAllInfo()) {
      this.setState({
        loginMes: "正在登录"
      });
      const loginData = axios.post('/signin',{
          email,
          password
      })
      try {
        let result = await loginData
        if (result.status === 200) {
          setCookie('token', result.data.data.accessToken)
          this.props.history.push("/about");
        }
      } catch (e) {
        if(e.response){  //请求发出去后收到服务器错误响应
          this.setState({
            errorMessage: e.response.data.msg,
            loginMes: "登录"
          })
        } else {  // 请求发送失败本地错误响应
          this.setState({
            errorMessage: e.message,
            loginMes: "登录"
          })
        }
      }
    }
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-box">
          <FormTopText sloganValue="很高兴，再次遇见你, 测试" />
          <div className="form-box">
            <InputCom autoFocus typeValue="text" textValue={this.state.email} placeholderVal="邮箱" keyVal="email" handleInput={this.handleInput.bind(this)} />
            <InputCom typeValue="password" textValue={this.state.password} placeholderVal="密码" keyVal="password" handleInput={this.handleInput.bind(this)} />
          </div>
          <FormerrMsg msgValue={this.state.errorMessage} />
          <FromButton onClick={this.login.bind(this)} buttonText={this.state.loginMes} />
          <FormOtherBox otherOne={{router:"/register",textValue:"立即注册"}} otherTwo={{router:"/reset",textValue:"找回密码"}} />
        </div>
      </div>
    );
  }
}

export default Login;
