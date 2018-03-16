import React from 'react'
import styled from "styled-components";


class Nav extends React.Component {

  render() {
    const Nav = styled.div`
      width:100%;
      height: 100px;
      min-width: 1000px;
      position: absolute;
      top: 0;
      left: 0;
      /* background: pink; */
      img{
        margin-top: 20px; 
        margin-left: 35px;
        width: 320px;
        height: 65px;
        cursor: pointer;
      }
      
      div{
        float: right;
        margin-top: 35px;
        font-size: 22px;
        color: #F7F5F7;
        padding-right: 20px;
        ul{
          list-style: none;
          color: #f5f5f5;
          li{
            cursor: pointer;
            display: block;
            /* margin-left: 20px; */
            margin: 0 12px;
            float: left;
          }
          li:hover{
            color: #CA5892;
          }
        }
      }
    `;
    const SignBox = styled.ul`
        float: right;
        list-style: none;
        color: white;
        padding: 0 10px 0 0;
        margin-top: 34px;
        li{
          display: inline-block;
          margin-right: 15px;
          border: 1px solid white;
          border-radius: 3px;
          height: 32px;
          width: 60px;
          line-height: 32px;
          text-align: center;
          cursor: pointer;
        }
        li:nth-child(2){
          background: #DB4F94;
          width: 62px;
          border: 1px solid #DB4F94;
        }
        li:nth-child(2):hover{
          background: #fd5cab;
        }
        li:nth-child(1):hover{
          background-color:rgba(0,0,0,0.6);
        }
    `;
    return (
      <Nav>
        <img src="http://p0ml8s4qd.bkt.clouddn.com/lovemaillogo.png" alt=""/>
        <SignBox>
          <li>登录</li>
          <li>注册</li>
        </SignBox>
        <div>
          <ul>
            <li>案例</li>
            <li>模板</li>
            <li>私人定制</li>
            <li>关于</li>
          </ul>
        </div>
        
      </Nav>
    )
  }
}

export default Nav