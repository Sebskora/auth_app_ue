import React from 'react';

import { withFirebase } from '../Firebase';
import Button from '../smallComponents/Button';

const SignOutButton = ({ firebase }) => (
  <Button margin="0" BackgroundColor="red" type="button" onClick={firebase.doSignOut}>
    Wyloguj
  </Button>
);

export default withFirebase(SignOutButton);
