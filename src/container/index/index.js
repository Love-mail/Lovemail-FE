import React from 'react'
import styled from "styled-components";

import Slogan from '../../components/slogan'


class Index extends React.Component {
  render() {
    const Bgindex = styled.div`
      position:fixed;
      top: 0;
      left: 0;
      width:100%;
      height:100%;
      min-width: 1000px;
      z-index:-100;
      zoom: 1;
      background-image: url('http://p0ml8s4qd.bkt.clouddn.com/lovemailBg%20%281%29.jpg');
      background-color: #fff;
      background-repeat: no-repeat;
      background-size: cover;
      -webkit-background-size: cover;
      -o-background-size: cover;
      background-position: center 0;
    `
    return (
      <div>
        <Bgindex />
        <Slogan />
      </div>
      
    )
  }
}

export default Index