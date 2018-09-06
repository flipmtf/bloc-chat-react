import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <main>
          <RoomList firebase= { firebase } />
        </main>
      </div>
    );
  }
}

export default App;
