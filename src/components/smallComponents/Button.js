import React from 'react';
import styled from 'styled-components';

const Button = ({ children, disabled, type, BackgroundColor, margin, onClick }) => (<StyledButton BackgroundColor={BackgroundColor} style={{ margin: margin }} disabled={disabled} type={type} onClick={onClick}>{children}</StyledButton>)


const StyledButton = styled.button`
width: 130px;
height: 38px;
border: 1px solid gray;
background-color: ${props => props.BackgroundColor};
color: white;
padding: 3px 10px;
border-radius: 5px;
font-weight: 700;
font-size: 12px;
margin-top: 10px;

`


export default Button