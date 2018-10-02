import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      value: '',
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

    this.handleNewRoom = this.handleNewRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms:this.state.rooms.concat( room ) })
    });
  }

  handleNewRoom(newRoomName) {
    this.setState({ value: newRoomName.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    if (!this.state.value) { return }
    this.roomsRef.push({
      name: this.state.value
    });
    e.target.reset();
  }

  render() {
    return(
      <div>
        <h2>{this.props.activeRoom ? this.props.activeRoom.name: ""}</h2>
        <table>
          <tbody>
            {
              this.state.rooms.map( (room, index) =>
                <tr className="chatRooms" key={index}>
                  <td onClick={() => this.props.setActiveRoom(room)}>{room.name}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <form onSubmit={(e) => this.createRoom(e)}>
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
