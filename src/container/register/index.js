import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email:'',
      password: '',
      code:'',
      timeCount: 99,
      codeDisable: false,
      codeSended: false,
      errorMessage: '',
      registerMes: '注册',
      checkText: '获取验证码'
    }
  }
  handleInput(key,e){
    this.setState({
      [key]: e.target.value
    })
  }
  checkAllInfo(){
    let { email, password, code } = this.state
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (!reg.test(email)) {
      this.setState({
        errorMessage: '请输入正确的邮箱'
      })
      return false
    } else if(password.length <= 3) {
      console.log(password.length)
      this.setState({
        errorMessage: '请输入正确的密码(4位以上)'
      })
      return false
    }else if(code.length <= 0) {
      this.setState({
        errorMessage: '请输入验证码'
      })
      return false
    } else {
      this.setState({
        errorMessage: ''
      })
      return true
    }
  }
  getCode() {
    let { email } = this.state
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (!reg.test(email)) {
      this.setState({
        errorMessage: '请输入正确的邮箱'
      })
      return false
    } else {
      this.setState({
        errorMessage: '',
        checkText: '正在发送',
        codeDisable: true
      })
      var that = this
      axios({
        url:'/email/validate',
        method: 'post',
        data: {
          email: that.state.email,
          type: 'SIGNUP'
        }
      }).then(result => {
        if(result.status === 200){
          this.countdown() //100秒内无法再次获取验证码
          this.setState({
            checkText: '已发送',
            codeSended: true
          })
        }
      }).catch(e => {
        this.setState({
          errorMessage: e.response.data.msg,
          checkText: '获取验证码',
          codeDisable: false
        })
      })
    }
  }
  register(){
    let { email, password, code } = this.state
    if (this.checkAllInfo()) {
      this.setState({
        registerMes: '正在注册'
      })
      axios({
        url: '/signup',
        method: 'post',
        data: {
          email,
          password,
          code
        }
      }).then(result => {
        if (result.status === 201) {
          this.setState({
            registerMes: '注册成功,3秒后进入登录页'
          })
          setTimeout(()=>{
            this.props.history.push('/login')
          }, 3000)
        }
      }).catch(e => {
        this.setState({
          errorMessage: e.response.data.msg,
          registerMes: '注册'
        })
      })
    }
  }
  countdown(){
    let timeOut=99;
    let that = this;
    function timeDown(){
        timeOut--;
        that.setState({
            timeCount:timeOut
        })
        if(timeOut===0){
            clearInterval(a);
            that.setState({
                timeCount:99,
                codeDisable: false,
                codeSended: false,
                checkText: '获取验证码'
            })
        }
    }
    let a=setInterval(timeDown,1000)
}
  render() {
    const Input = {
      width:'290px',
      height:'42px',
      marginTop: '15px',
      fontSize: '16px',
      borderWidth:0,
      borderBottom: '1px solid #96a4c3',
      background: '#F7F5F7'
    }
    const registerBox = {
      width: '320px',
      height: '420px',
      textAlign: 'center',
      position: 'relative',
      top:'160px',
      margin: '0 auto'
    }
    const CheckButton = styled.button`
      position: absolute;
      bottom: 9px;
      right: 17px;
      width: 88px;
      height: 32px;
      color: #a7a7a7;
      cursor: pointer;
      background-color: transparent;
      border: 1px solid #81a6f9;
      border-radius: 3px;
      :hover{
      border-color: #243763;
      }
      `
    const formBox = {
      position: 'relative',
    }
    const WellComeTextBox = styled.div`
      height: 120px;
      h1, h3{
        color: #6075a0;
      }
    `
    const checkbox = {
      ...Input,
      width: '150px'
    }
    const errMes = {
      color: 'red',
      height: '20px',
      marginTop: '10px'
    }
    const RegisterButton = styled.button`
      cursor: pointer;
      margin-top: 20px;
      width: 290px;
      height: 35px;
      color: white;
      font-size: 16px;
      background-color: #6D85B9;
      border-width: 0;
      border-radius: 3px;
      :hover{
      background-color: #7b97d4;
      }
      `
    return (
      <div style={{position: 'fixed',width:'100%', height:'100%', background: '#F7F5F7'}}>
        <div style={registerBox}>
          <WellComeTextBox>
            <h1>LoveMail</h1>
            <h3>你的到来,就是最好的礼物</h3>
          </WellComeTextBox>
          <div style={formBox}>
            <input style={Input} value={this.state.email} onChange={e => this.handleInput('email',e)} placeholder="Email" type="text"/>
            <input style={Input} value={this.state.password} onChange={e => this.handleInput('password',e)} placeholder="Password" type="password"/>
            <input style={Input} value={this.state.code} onChange={e => this.handleInput('code',e)} placeholder="验证码" type="text"/>
            <CheckButton disabled={this.state.codeDisable} onClick={this.getCode.bind(this)} >{this.state.codeSended ? `(${this.state.timeCount}) 已发送` : this.state.checkText}</CheckButton>
          </div>
          <div style={errMes}>
            {this.state.errorMessage}
          </div>
          <RegisterButton onClick={this.register.bind(this)}>{this.state.registerMes}</RegisterButton>
          <p style={{marginTop: '20px', color: '#b7b7b7', cursor: 'pointer'}} onClick={() => this.props.history.push('/login')}>已有账号？ 立即登录</p>
        </div>
      </div>
      
    )
  }
}

export default Register