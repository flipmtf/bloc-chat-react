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

    var rooms = this.firebase.RoomList.props.rooms

    this.state = {
      rooms: rooms,
      currentRoom: null,
    }
  }

  setActiveRoom(room) {
    this.setState({ currentRoom: room });
  }

  handleRoomClick(room) {
    const isActiveRoom = this.state.currentRoom === room;
    if (isActiveRoom) {
      return this.props.MessageList.roomId
    } else {
      return this.props.MessageList
    }
  }

  render() {
    return (
      <div className="App">
        <main>
          {
            this.state.rooms.map( (rooms, index) =>
              <RoomList className="rooms" key={index} onClick={() => this.handleRoomClick(rooms)} firebase = { firebase } />
          )}
          <MessageList firebase = { firebase } />
        </main>
      </div>
    );
  }
}

export default App;
