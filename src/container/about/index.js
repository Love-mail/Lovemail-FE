import React from 'react'
import { connect } from "react-redux"

import { login, userDateUpdate, logout, saveSetting } from "../../redux/user.redux"
import { getTempData } from "../../redux/temp.redux"
import { getCityData } from "../../redux/city.redux"

import { Row, Col } from 'antd'

import axios from '../../config/axios'

import InputCom from '../../components/input'

import "./about.less"

@connect(
  state => state,
  { login, userDateUpdate, logout, saveSetting, getTempData, getCityData }
)
class About extends React.Component {
  testApi() {
    let promise = new Promise(function(resolve, reject){
      setTimeout(()=>{
        resolve('yyyyy')
        // console.log()
      }, 3000)
    })
    return promise
  }
  async test(){
    let gg = await this.testApi()
    console.log(gg)
  }
  handleInput(key,e) {
    console.log(key)
    console.log(e.target.value)
  }
  testApi() {
    this.props.userDateUpdate()
  }
  logout() {
    this.props.logout()
  }
  saveSetting(){
    this.props.saveSetting({
      "nickname": "6666",
      "love_email": "xxx@xxx.com",
      "love_time": "6666",
      "love_date": "6666",
      "love_city": "6666",
      "love_color": "6666",
      "love_temp": "6666",
      "isStart": true
    })
  }
  gettemp() {
    this.props.getTempData()
    console.log(this.props)
  }
  city(){
    this.props.getCityData()
  }
  render() {
    return (
      <div>
        <button onClick={this.city.bind(this)} >city</button>        
        <button onClick={this.gettemp.bind(this)} >temp</button>        
        <button onClick={this.saveSetting.bind(this)} >setting</button>        
        <button onClick={this.logout.bind(this)} >logout</button>
        <button onClick={this.testApi.bind(this)} >testAPI</button>
        <div ref="haha" >asdf</div>
        <InputCom autoFocus ref="testinput" placeholderVal="Email" keyVal="email" handleInput={this.handleInput.bind(this)} />
        <h1 className="htest">h1h1h1h1</h1>
        <button onClick={this.test.bind(this)}>test</button>
        <Row>
          <Col style={{background: 'red'}} xs={2} sm={4} md={6} lg={8} xl={10}>Col</Col>
          <Col style={{background: 'green'}} xs={20} sm={16} md={12} lg={8} xl={4}>Col</Col>
          <Col style={{background: 'pink'}} xs={2} sm={4} md={6} lg={8} xl={10}>Col</Col>
        </Row>
        <h1 className="slideOutUp">h1h1h1</h1>
      </div>
    )
  }
}

export default About