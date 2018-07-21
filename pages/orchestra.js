import { Component } from "react";
import io from "socket.io-client";

class Index extends Component {
  componentDidMount() {
    this.socket = io();
    this.socket.on("note", console.log);
  }

  render() {
    return (
      <div>
        <h1>Red Badger Symphony</h1>
      </div>
    );
  }
}

export default Index;
