import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      value: ''
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
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
      username: '',
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
      roomId: -1 (fill with info from prop from app component)
    });
    e.target.reset();
  }

  render() {
    return(
      <div>
        <form onSubmit={(e) => this.onSubmit(e)} >
          <label>
            New Message:
            <input type="text" name={this.state.value} onChange={(e) => this.onUpdate(e)}/>
          </label>
          <input type="submit" name="Submit" />
        </form>
      </div>
    )
  }
}