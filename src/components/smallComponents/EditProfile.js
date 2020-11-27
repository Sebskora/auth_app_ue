import React,{Component} from 'react';
import styled from 'styled-components';
import Slide from 'react-reveal/Slide';
import { withFirebase } from '../Firebase';
import Button from './Button';
import FormInput from './FormInput';

import TransitionGroup from 'react-transition-group/TransitionGroup';


class EditProfile extends Component {

    state = {
        email: "",
        usernameState: "",
        open: false
    }
    groupProps = {
        appear: true,
        enter: true,
        exit: true,
      };

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        
    }

    onSubmit = (event) => {
        const {userID, closeComponent} = this.props
        const {email, usernameState} = this.state
        console.log('poszlo');
        this.props.firebase.user(userID).set({
            email: email,
            username: usernameState
        })
        closeComponent();
        event.preventDefault();
    }
    render() {
    const {username, closeComponent} = this.props
    const {usernameState, email, open} = this.state
    const isInvalid =
    email === '' ||
    usernameState === '';

    return ( 
       
       <Container>
                      
        <Slide left >
            <h1 style={{textAlign: "center"}}>Aktualnie edytujesz: <span style={{color: "green"}}>{username}</span></h1>
        <form onSubmit={this.onSubmit} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
        <FormInput
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Adres E-mail"
        />
        <FormInput
          name="usernameState"
          value={usernameState}
          onChange={this.onChange}
          type="username"
          placeholder="Nazwa uzytkownika"
        />
        <Button primary disabled={isInvalid} type="submit">Potwierdź zmiany</Button>
        <Button onClick={closeComponent}>Zamknij X</Button>
      </form>
        </Slide>
        
      </Container>
      )
      
    }

}



const Container = styled.div`
padding-bottom: 30px;
`



export default withFirebase(EditProfile);