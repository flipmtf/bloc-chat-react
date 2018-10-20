import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCciiU2F1clCA9D6_JhkI6NRk9JOVYeXOo",
  authDomain: "bloc-chat-7ad36.firebaseapp.com",
  databaseURL: "https://bloc-chat-7ad36.firebaseio.com",
  projectId: "bloc-chat-7ad36",
  storageBucket: "bloc-chat-7ad36.appspot.com",
  messagingSenderId: "379288617418"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      currentRoom: {},
    }
  }

  setActiveRoom(room) {
    this.setState({ currentRoom: room });
  }

  render() {
    return (
      <div className="App">
        <main>
          <RoomList setActiveRoom={(room) => this.setActiveRoom(room)} activeRoom={this.state.currentRoom} firebase = { firebase } />
          <MessageList firebase = { firebase } setActiveRoom={(room) => this.setActiveRoom(room)} activeRoom={this.state.currentRoom} />
        </main>
      </div>
    );
  }
}

export default App;
