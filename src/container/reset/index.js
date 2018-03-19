import React from "react";
import axios from "axios";
import styled from "styled-components";

import "./reset.less";

class Reset extends React.Component {
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
      resetMes: "重置密码",
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
      const validata = axios.post('/email/validate',{
        email: that.state.email,
          type: "RESET"
      })
      try {
        let result = await validata
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
        })
      }
    }
  }
  async reset() {
    let { email, password, code } = this.state;
    if (this.checkAllInfo()) {
      this.setState({
        resetMes: "正在重置密码"
      });
      const resetData = axios.patch('/user/reset',{
        email,
          password,
          code
      })
      try {
        let result = await resetData
        if (result.status === 200) {
          this.setState({
            resetMes: "重置密码成功,3秒后进入登录页"
          });
          setTimeout(() => {
            this.props.history.push("/login");
          }, 3000);
        }
      } catch (e) {
        this.setState({
          errorMessage: e.response.data.msg,
          resetMes: "重置密码"
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
      <div className="reset-container">
        <div className="reset-box">
          <div className="wellcome-box">
            <h1>LoveMail</h1>
            <h3>我就在这里，等风也等你</h3>
          </div>
          <div className="form-box">
            <input
              value={this.state.email}
              onChange={e => this.handleInput("email", e)}
              placeholder="Email"
              type="text"
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
            <input
              value={this.state.password}
              onChange={e => this.handleInput("password", e)}
              placeholder="New Password"
              type="password"
            />
          </div>
          <div className="errMes">{this.state.errorMessage}</div>
          <button className="reset-button" onClick={this.reset.bind(this)}>
            {this.state.resetMes}
          </button>
          <div className="other-box">
            <p
              style={{ float: "left" }}
              onClick={() => this.props.history.push("/login")}
            >
              立即登录
            </p>
            <p
              style={{ float: "right" }}
              onClick={() => this.props.history.push("/register")}
            >
              立即注册
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Reset;
