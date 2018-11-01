import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)

    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    const auth = new this.props.firebase.auth();
  }

  login() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider ).then((result) => {
      this.setState({
        user: result.user
      })
    })
  }

  logout() {
    this.props.firebase.auth().signOut().then((result) => {
      this.setState({
        user: null
      })
    })
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  render() {
    let authButton = this.props.user ?
      <button onClick={this.logout}>Log Out</button> :
      <button onClick={this.login}>Log In</button>
    return(
      <div>
        {authButton}
      </div>
    );
  }
}

export default User
