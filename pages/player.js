import { Component } from "react";
import io from "socket.io-client";
import initReactFastClick from "react-fastclick";
import Layout from "../layout";

import instruments from "../lib/instruments";

console.log(instruments);

initReactFastClick();

const randomItem = collection =>
  collection[Math.floor(Math.random() * collection.length)];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      composer: "",
      instrument: randomItem(instruments)
    };
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on("composerName", data => {
      this.setState({
        composer: data.message
      });
    });
  }

  playNote = (note, channel) => {
    this.socket.emit("playNote", {
      channel: channel,
      note
    });
  };

  stopNote = (note, channel) => {
    this.socket.emit("stopNote", {
      channel: channel,
      note
    });
  };

  render() {
    const { instrument, composer } = this.state;
    const notes = instrument.notes.sort(() => 0.5 - Math.random()).slice(0, 9);
    return (
      <Layout>
        <h1>{composer}</h1>
        <h2>{instrument.name}</h2>
        <div syles={{ width: "100%" }}>
          {notes.map(note => (
            <button
              style={{ width: "32%", height: 100 }}
              onMouseDown={() => this.playNote(note, instrument.channel)}
              onMouseUp={() => this.stopNote(note, instrument.channel)}
              key={note}
            >
              {note}
            </button>
          ))}
        </div>
      </Layout>
    );
  }
}

export default Index;
