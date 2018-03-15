import React from 'react';
import styled from "styled-components";

const Slogan = () => {
  const Sloganbox = styled.div`
    width: 500px;
    height: 300px;
    position: absolute;
    text-align: center;
    top: 300px;
    left: 100px;
    color: white;
    h1{
      font-size:66px;
      margin-bottom: 28px;
    }
    ul{
      list-style: none;
      padding: 0;
      li{
          display: inline-block;
          cursor: pointer;
          margin: 15px;
          height: 40px;
          width: 115px;
          line-height: 40px;
          border-radius: 4px;
      }      
      li:nth-child(1){
        background: #DB4F94;
        width: 120px;
        border: 1px solid #DB4F94;
      }
      li:nth-child(1):hover{
        background: #fd5cab;
      }
      li:nth-child(2){
        border: 1px solid white;
      }
      li:nth-child(2):hover{
        background-color:rgba(0,0,0,0.2);
      }
    }
  `;
  return(
    <Sloganbox>
      <h1>爱，从此刻出发</h1>
      <h2>永不舵机的服务器，坚守你的持之以恒</h2>
      <ul>
        <li>即刻开始</li>
        <li>一分钟了解</li>
      </ul>
    </Sloganbox>
  )
}

export default Slogan