import { Component } from "react";
import io from "socket.io-client";
import WebMidi from "webmidi";
import Layout from "../layout";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }

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

    this.socket.on("players", players => this.setState({ players }));
  }

  orchestraReady = ready => {
    this.socket.emit("ready", ready);
  };

  render() {
    const { players } = this.state;
    return (
      <Layout>
        <h1>Red Badger Symphony</h1>
        <button onClick={() => this.orchestraReady(false)}>
          Tune Orchestra
        </button>
        <button onClick={() => this.orchestraReady(true)}>
          Orchestra Ready
        </button>
        <h2>Players</h2>
        <ul>
          {Object.keys(players).map(
            key => players[key] && <li key={key}>{players[key]}</li>
          )}
        </ul>
      </Layout>
    );
  }
}

export default Index;
