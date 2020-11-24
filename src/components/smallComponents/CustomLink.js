import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const CustomLink = ({ children, path, important }) => (<>
    {important ? <Background><StyledLink exact={true} style={{ color: "white" }} activeStyle={{ color: "white", fontWeight: "700" }} to={path}>{children}</StyledLink></Background > : <StyledLink exact={true} activeStyle={{ color: "#37bef8", fontWeight: "700" }} to={path}>{children}</StyledLink>}

</>)



const Background = styled.div`
background-color: #37bef8;
width: 120px;
border-radius: 5px;
z-index: -1;
height: 50px;
display:flex;
justify-content:center;
align-items:center;`



const StyledLink = styled(NavLink)`
text-decoration: none;
font-weight: 500;
font-size: 20px;
color: black;
`

export default CustomLink