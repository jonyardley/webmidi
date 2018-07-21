import { Component } from "react";
import io from "socket.io-client";
import initReactFastClick from "react-fastclick";
import Layout from "../layout";

import instruments from "../lib/instruments";

initReactFastClick();

const randomItem = collection =>
  collection[Math.floor(Math.random() * collection.length)];

class Index extends Component {
  constructor(props) {
    super(props);
    const instrument = randomItem(instruments);
    this.state = {
      composer: "",
      instrument,
      notes: instrument.notes.sort(() => 0.5 - Math.random()).slice(0, 9)
    };
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on("composerName", data => {
      this.setState({
        composer: data.message,
        ready: data.ready
      });
    });
    this.socket.on("ready", ready => {
      this.setState({ ready });
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
    const { instrument, composer, ready, notes } = this.state;
    return (
      <Layout>
        <h1>{composer}</h1>
        <h2>{instrument.name}</h2>
        {!ready && (
          <button
            style={{ width: "32%", height: 100 }}
            onMouseDown={() =>
              this.playNote(instrument.tune, instrument.channel)
            }
            onMouseUp={() => this.stopNote(instrument.tune, instrument.channel)}
            key={instrument.tune}
          >
            Tune up ({instrument.tune})
          </button>
        )}
        {ready && (
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
        )}
      </Layout>
    );
  }
}

export default Index;
