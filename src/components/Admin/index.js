import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import styled from 'styled-components';
import Button from '../smallComponents/Button';
import EditProfile from '../smallComponents/EditProfile';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import TransitionGroup from 'react-transition-group/TransitionGroup';
class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isAuth: false,
      users: [],
      editProfileShow: false,
      userNameEditing: null,
      userIdEditing: null
    };
    this.groupProps = {
      appear: true,
      enter: true,
      exit: true,
    };
  }
  
  handleEditProfile = (username ,uid) => {
    this.setState((prevState) => ({
      editProfileShow: true,
      userNameEditing: username,
      userIdEditing: uid
    }))
  }
  closeComponent = () => {
    this.setState({
      editProfileShow: false
    })
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      // NO AUTH
      if (authUser.email !== "admin@o2.pl") {
        this.props.history.push(ROUTES.HOME);
      }

    })
    this.props.firebase.users().on('value', snapshot => {

      const usersObject = snapshot.val();
      console.log(usersObject)
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading, editProfileShow, userNameEditing, userIdEditing } = this.state;

    return (
      
      <AdminContainer>
        <h1>Admin</h1>

        
        {editProfileShow && <TransitionGroup {...this.groupProps}><Slide left><EditProfile closeComponent={this.closeComponent} username={userNameEditing} userID={userIdEditing}/></Slide></TransitionGroup>}

        
        <h2>Lista uzytkowników:</h2>
        {loading && <div>Loading ...</div>}
      
        <UserList handleEditProfile={this.handleEditProfile} users={users} />
      </AdminContainer>
      
    );
  }
}

const UserList = ({ users, handleEditProfile }) => (
  <UsersContainer>
    {users.map(user => (
      <div>
      <Fade bottom>
        <li key={user.uid}>
          <UserElement>
            <strong>ID:</strong> {user.uid}
          </UserElement>
          <UserElement>
            <strong>E-Mail:</strong> {user.email}
          </UserElement>
          <UserElement>

            <strong>Username:</strong> {user.username}
          </UserElement>
          <Button onClick={() => {handleEditProfile(user.username, user.uid)}}  margin="5px"primary>Edytuj</Button>
          <Button margin="5px">Zablokuj</Button>   
          <Button margin="5px">Usuń X</Button>   
        </li>
        </Fade>
      </div>
    ))}
    
  </UsersContainer>
);



const UsersContainer = styled.ul`
margin: 0;
list-style-type: none;
padding: 0;
`

const UserElement = styled.span`
padding: 0 5px;
`

const AdminContainer = styled.div`
padding: 0 10px;
`

const condition = authUser =>
  !!authUser

export default withFirebase(withAuthorization(condition)(AdminPage))
