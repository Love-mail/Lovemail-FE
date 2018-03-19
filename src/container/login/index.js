import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email:'',
      password: '',
      errorMessage: '',
      loginMes: '登录',
    }
  }
  handleInput(key,e){
    this.setState({
      [key]: e.target.value
    })
  }
  checkAllInfo(){
    let { email, password } = this.state
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
    }else {
      this.setState({
        errorMessage: ''
      })
      return true
    }
  }
  
  register(){
    let { email, password } = this.state
    if (this.checkAllInfo()) {
      this.setState({
        loginMes: '正在登录'
      })
      axios({
        url: '/signin',
        method: 'post',
        data: {
          email,
          password,
        }
      }).then(result => {
        if (result.status === 200) {
            this.props.history.push('/about')
        }
      }).catch(e => {
        this.setState({
          errorMessage: e.response.data.msg,
          loginMes: '登录'
        })
      })
    }
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
    
    const formBox = {
      position: 'relative',
    }
    const WellComeTextBox = styled.div`
      height: 120px;
      h1, h3{
        color: #6075a0;
      }
    `
    const errMes = {
      color: 'red',
      height: '20px',
      marginTop: '10px'
    }
    const LoginButton = styled.button`
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
            <h3>很高兴，再次遇见你</h3>
          </WellComeTextBox>
          <div style={formBox}>
            <input style={Input} value={this.state.email} onChange={e => this.handleInput('email',e)} placeholder="Email" type="text"/>
            <input style={Input} value={this.state.password} onChange={e => this.handleInput('password',e)} placeholder="Password" type="password"/>
          </div>
          <div style={errMes}>
            {this.state.errorMessage}
          </div>
          <LoginButton onClick={this.register.bind(this)}>{this.state.loginMes}</LoginButton>
          <div style={{padding: '0 16px'}}>
            <p style={{marginTop: '20px', color: '#b7b7b7', cursor: 'pointer', float: 'left'}} onClick={() => this.props.history.push('/register')}>立即注册</p>
            <p style={{marginTop: '20px', color: '#b7b7b7', cursor: 'pointer',float: 'right'}} onClick={() => this.props.history.push('/reset')}>找回密码</p>
          </div>
        </div>
      </div>
      
    )
  }
}

export default Login