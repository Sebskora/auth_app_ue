import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import SectionTitle from '../smallComponents/SectionTitle';
import FormInput from '../smallComponents/FormInput';
import Button from '../smallComponents/Button';

const PasswordForgetPage = () => (
  <div>
    <SectionTitle>Zapomniałem hasła</SectionTitle>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex", alignItems: "center" }}>
        <FormInput
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Button BackgroundColor="#1fe61f" disabled={isInvalid} type="submit">
          Zresetuj Hasło
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <StyledLink to={ROUTES.PASSWORD_FORGET}>Zapomniałem hasła!</StyledLink>
  </p>
);


const StyledLink = styled(Link)`
text-decoration: none;
color: blue;
font-weight: 500;
`

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
