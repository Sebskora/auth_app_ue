import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import styled from 'styled-components';
import { AuthUserContext } from '../Session';
import CustomLink from '../smallComponents/CustomLink';

const Navigation = () => (
  <NavigationContainer>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>

  </NavigationContainer>
);

const NavigationAuth = () => (
  <NavigationElementsContainer>
    <li>
      <CustomLink path={ROUTES.LANDING}>Landing</CustomLink>
    </li>
    <li>
      <CustomLink path={ROUTES.HOME}>Home</CustomLink>
    </li>
    <li>
      <CustomLink path={ROUTES.ACCOUNT}>Konto</CustomLink>
    </li>
    <li>
      <CustomLink path={ROUTES.ADMIN}>Admin</CustomLink>
    </li>
    <li>
      <SignOutButton />
    </li>
  </NavigationElementsContainer>
);

const NavigationNonAuth = () => (
  <NavigationElementsContainer>
    <li>
      <CustomLink path={ROUTES.LANDING}>Landing</CustomLink>
    </li>
    <li>
      <CustomLink important path={ROUTES.SIGN_IN}>Zaloguj się</CustomLink>
    </li>
  </NavigationElementsContainer>
);

const NavigationElementsContainer = styled.ul`
display: flex;
text-decoration: none;
list-style-type: none;
justify-content: space-around;
align-items: center;
height: 100%;
width: 20%;
margin: 0;
`



const NavigationContainer = styled.div`
position: absolute;
top: 0;
width: 100vw;
height: 80px;
box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
display:flex;
justify-content: center;
`


export default Navigation;
