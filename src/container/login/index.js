import React from 'react';
import styled from 'styled-components';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      from:{}
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const Box = styled.div`
      position:absolute;
      padding: 0 10px;
      width: 320px;
      height: 500px;
      background: skyblue;
      left: 50%;
      margin-left: -150px;
      margin-top: 150px;
    `;
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{position:'absolute',padding: '0 10px',left: '50%',width: '320px',height: '500px',background: 'skyblue',marginLeft: '-150px',marginTop: '150px'}}>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入邮箱!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <a href="">立即注册!</a>
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button style={{background: 'pink'}} type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
         
        </FormItem>
      </Form>
      </div>
    )
  }
}
const Loginn = Form.create()(Login);

export default Loginn