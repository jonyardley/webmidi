import { Component } from "react";
import io from "socket.io-client";
import WebMidi from "webmidi";
import Layout from "../layout";

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
      <Layout>
        <h1>Red Badger Symphony</h1>
      </Layout>
    );
  }
}

export default Index;
