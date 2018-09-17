import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      value: '',
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms:this.state.rooms.concat( room ) })
    });
  }

  handleNewRoom(newRoomName) {
    this.setState({value: newRoomName.target.value});
  }

  createRoom() {
    this.roomsRef.push({
      name: this.state.value
    });
  }

  render() {
    return(
      <div>
        {
          this.state.rooms.map( (rooms, index) =>
            <tr className="chatRooms" key={index}>
              <td>{rooms.name}</td>
            </tr>
          )
        }
        <form onSubmit={this.state.createRoom}>
          <label>
            New Room Name:
            <input type="text" name={this.state.value} onChange={this.handleNewRoom} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default RoomList
