import React from 'react';
import styled from 'styled-components';

const Button = ({ children, disabled, type, margin, onClick, customColor, primary }) => (<StyledButton primary={primary} customColor={customColor} style={{ margin: margin }} disabled={disabled} type={type} onClick={onClick}>{children}</StyledButton>)


const StyledButton = styled.button`
width: 130px;
height: 38px;
border: 1px solid gray;
background-color: ${props => props.primary ? "#1fe61f" : 'red'};
background-color: ${props => props.customColor ? props.customColor : null};
color: white;
padding: 3px 10px;
border-radius: 5px;
font-weight: 700;
font-size: 12px;
margin-top: 10px;

`


export default Button