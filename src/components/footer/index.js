import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  const FooterBox = styled.footer`
  height:50px;position:absolute;bottom:0px;left:0px;
  `;
  return(
    <FooterBox>
      <span>
      Copyright © 2018 All Rights Reserved. Made By Trevor & Vince
        
      </span>
    </FooterBox>
  )
}

export default Footer