import React from 'react'
import { Row, Col } from 'antd';
class About extends React.Component {
  render() {
    return (
      <div>
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