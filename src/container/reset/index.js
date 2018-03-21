import React from "react";
import axios from "../../config/axios";

import InputCom from "../../components/input"
import FormTopText from "../../components/formTopText"
import FromButton from "../../components/button/formButton"
import FormOtherBox from "../../components/otherBox/formOtherBox"
import TimeoutButton from "../../components/button/timeoutButton"
import FormerrMsg from "../../components/tipMes/formerrMsg"

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
            resetMes: "重置密码成功"
          });
          setTimeout(() => {
            this.props.history.push("/login");
          }, 1000);
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
        <div className="reset-box vertical-center">
          <FormTopText sloganValue="我就在这里，等风也等你" />
          <div className="form-box fadeInDown">
          <InputCom typeValue="text" textValue={this.state.email} placeholderVal="邮箱" keyVal="email" handleInput={this.handleInput.bind(this)} />
          <InputCom typeValue="text" textValue={this.state.code} placeholderVal="验证码" keyVal="code" handleInput={this.handleInput.bind(this)} />
          <InputCom typeValue="password" textValue={this.state.password} placeholderVal="密码" keyVal="password" handleInput={this.handleInput.bind(this)} />
          <TimeoutButton style={{bottom: '66px'}} disableVal={this.state.codeDisable} onClick={this.getCode.bind(this)} buttonText={this.state.codeSended
                ? `${this.state.timeCount} s `
                : this.state.checkText} />
          </div>
          <FormerrMsg msgValue={this.state.errorMessage} />
          <FromButton onClick={this.reset.bind(this)} buttonText={this.state.resetMes} />
          <FormOtherBox otherOne={{router:"/login",textValue:"立即登录"}} otherTwo={{router:"/register",textValue:"立即注册"}} />
        </div>
      </div>
    );
  }
}

export default Reset;
