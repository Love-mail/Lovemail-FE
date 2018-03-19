import React from "react";
import axios from "axios";
import styled from "styled-components";

import "./register.less";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      code: "",
      timeCount: 99,
      codeDisable: false,
      codeSended: false,
      errorMessage: "",
      registerMes: "注册",
      checkText: "获取验证码"
    };
  }
  handleInput(key, e) {
    this.setState({
      [key]: e.target.value
    });
  }
  checkAllInfo() {
    let { email, password, code } = this.state;
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
    } else if (code.length <= 0) {
      this.setState({
        errorMessage: "请输入验证码"
      });
      return false;
    } else {
      this.setState({
        errorMessage: ""
      });
      return true;
    }
  }
  async getCode() {
    let { email } = this.state;
    let reg = new RegExp(
      "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
    );
    if (!reg.test(email)) {
      this.setState({
        errorMessage: "请输入正确的邮箱"
      });
      return false;
    } else {
      this.setState({
        errorMessage: "",
        checkText: "正在发送",
        codeDisable: true
      });
      var that = this;
      const getValidata = axios.post("/email/validate", {
        email: that.state.email,
        type: "SIGNUP"
      });
      try {
        let result = await getValidata;
        if (result.status === 200) {
          this.countdown(); //100秒内无法再次获取验证码
          this.setState({
            checkText: "已发送",
            codeSended: true
          });
        }
      } catch (e) {
        this.setState({
          errorMessage: e.response.data.msg,
          checkText: "获取验证码",
          codeDisable: false
        });
      }
    }
  }
  async register() {
    let { email, password, code } = this.state;
    if (this.checkAllInfo()) {
      this.setState({
        registerMes: "正在注册"
      });
      const registerData = axios.post("/signup", {
        email,
        password,
        code
      })
      try {
        let result = await registerData
        if (result.status === 201) {
          this.setState({
            registerMes: "注册成功,3秒后进入登录页"
          });
          setTimeout(() => {
            this.props.history.push("/login");
          }, 3000);
        }
      } catch (e) {
        this.setState({
          errorMessage: e.response.data.msg,
          registerMes: "注册"
        });
      }
    }
  }
  countdown() {
    let timeOut = 99;
    let that = this;
    function timeDown() {
      timeOut--;
      that.setState({
        timeCount: timeOut
      });
      if (timeOut === 0) {
        clearInterval(a);
        that.setState({
          timeCount: 99,
          codeDisable: false,
          codeSended: false,
          checkText: "获取验证码"
        });
      }
    }
    let a = setInterval(timeDown, 1000);
  }
  render() {
    return (
      <div className="register-container">
        <div className="register-box">
          <div className="wellcome-box">
            <h1>LoveMail</h1>
            <h3>你的到来，就是最好的礼物</h3>
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
            <input
              value={this.state.code}
              onChange={e => this.handleInput("code", e)}
              placeholder="验证码"
              type="text"
            />
            <button
              disabled={this.state.codeDisable}
              onClick={this.getCode.bind(this)}
            >
              {this.state.codeSended
                ? `(${this.state.timeCount}s) 已发送`
                : this.state.checkText}
            </button>
          </div>
          <div className="errMes">{this.state.errorMessage}</div>
          <button
            className="register-button"
            onClick={this.register.bind(this)}
          >
            {this.state.registerMes}
          </button>
          <div className="other-box">
            <p onClick={() => this.props.history.push("/login")}>
              已有账号？ 立即登录
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
