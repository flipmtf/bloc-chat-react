import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      value: ''
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages:this.state.messages.concat( message ) })
    });
  }

  onUpdate(e) {
    this.setState({ value: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    this.messagesRef.push({
      content: this.state.value,
      username: this.props.user ? this.props.user.displayName: "Guest",
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom ? this.props.activeRoom.key: -1,
    });
    e.target.reset();
  }

  render() {
    return(
      <div>
        {this.state.messages
          .filter( message => (this.props.activeRoom.key === message.roomId
          ))
          .map( (message, index) => (
            <div key={index}>From {message.username}: {message.content}</div>
          ))
        }
        {this.props.activeRoom && (<form onSubmit={(e) => this.onSubmit(e)} >
          <label>
            New Message:
            <input type="text" name={this.state.value} onChange={(e) => this.onUpdate(e)}/>
          </label>
          <input type="submit" name="Submit" />
        </form>)}
      </div>
    )
  }
}

export default MessageList
