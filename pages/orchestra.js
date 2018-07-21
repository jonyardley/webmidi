import { Component } from "react";
import io from "socket.io-client";
import WebMidi from "webmidi";

class Index extends Component {
  componentDidMount() {
    WebMidi.enable(() => {
      this.output = WebMidi.outputs[0];
    });
    this.socket = io();
    this.socket.on("note", note => {
      this.output.playNote(note, 1, { duration: 100 });
    });
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
