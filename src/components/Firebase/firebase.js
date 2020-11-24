import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyCVSQLnnXQ0183zMK6GGDzL08ChJzcxf48",
  authDomain: "auth-app-dee6d.firebaseapp.com",
  databaseURL: "https://auth-app-dee6d.firebaseio.com",
  projectId: "auth-app-dee6d",
  storageBucket: "auth-app-dee6d.appspot.com",
  messagingSenderId: "863337107166",
  appId: "1:863337107166:web:a89b6dfb987b9e8035fc4f",
  measurementId: "G-WP28NXS0CK"
};


class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;
