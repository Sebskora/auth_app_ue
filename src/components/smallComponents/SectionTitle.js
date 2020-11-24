import React from 'react';
import styled from 'styled-components';

const SectionTitle = ({ children }) => (<StyledTitle>{children}</StyledTitle>)


const StyledTitle = styled.h1`
text-align:center;
font-size: 26px;
`


export default SectionTitle