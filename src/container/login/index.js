import React from "react";
import axios from "axios";
import styled from "styled-components";

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
        let result = loginData
        if (result.status === 200) {
          this.props.history.push("/about");
        }
      } catch (e) {
        this.setState({
          errorMessage: e.response.data.msg,
          loginMes: "登录"
        })
      }
    }
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="wellcome-box">
            <h1>LoveMail</h1>
            <h3>很高兴，再次遇见你</h3>
          </div>
          <div className="form-box">
            <input
              value={this.state.email}
              onChange={e => this.handleInput("email", e)}
              placeholder="Email"
              type="text"
            />
            <input
              value={this.state.password}
              onChange={e => this.handleInput("password", e)}
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="errMes">{this.state.errorMessage}</div>
          <button className="login-button" onClick={this.login.bind(this)}>
            {this.state.loginMes}
          </button>
          <div className="other-box">
            <p
              style={{ float: "left" }}
              onClick={() => this.props.history.push("/register")}
            >
              立即注册
            </p>
            <p
              style={{ float: "right" }}
              onClick={() => this.props.history.push("/reset")}
            >
              找回密码
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
