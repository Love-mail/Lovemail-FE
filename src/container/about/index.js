import React from 'react'
import { Row, Col } from 'antd';
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
  render() {
    return (
      <div>
        <button onClick={this.test.bind(this)}>test</button>
        <Row>
          <Col style={{background: 'red'}} xs={2} sm={4} md={6} lg={8} xl={10}>Col</Col>
          <Col style={{background: 'green'}} xs={20} sm={16} md={12} lg={8} xl={4}>Col</Col>
          <Col style={{background: 'pink'}} xs={2} sm={4} md={6} lg={8} xl={10}>Col</Col>
        </Row>
      </div>
    )
  }
}

export default About