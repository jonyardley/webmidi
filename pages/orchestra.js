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
    this.socket.on("playNote", ({ note, channel }) => {
      this.output.playNote(note, channel);
    });
    this.socket.on("stopNote", ({ note, channel }) => {
      this.output.stopNote(note, channel);
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
