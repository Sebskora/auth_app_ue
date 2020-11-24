import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import SectionTitle from '../smallComponents/SectionTitle';
import FormInput from '../smallComponents/FormInput';
import Button from '../smallComponents/Button';

const SignUpPage = () => (
  <div>
    <SectionTitle>Zarejestruj się!</SectionTitle>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }} >
        <FormInput
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <FormInput
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <FormInput
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <FormInput
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <Button BackgroundColor="#1fe61f" disabled={isInvalid} type="submit">
          Sign Up
        </Button>

        {error && <p>{error.message}</p>}
      </ form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Nie posiadasz konta? <StyledLink to={ROUTES.SIGN_UP}>Zarejestruj się!</StyledLink>
  </p>
);

const StyledLink = styled(Link)`
text-decoration: none;
color: blue;
font-weight: 500;
`


const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
