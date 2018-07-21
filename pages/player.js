import { Component } from "react";
import io from "socket.io-client";
import initReactFastClick from "react-fastclick";
import Layout from "../layout";

initReactFastClick();

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      composer: "",
      ready: false,
      instrument: {
        name: ""
      },
      notes: []
    };
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on("composerName", ({ composer, instrument, ready, notes }) => {
      this.setState({
        composer,
        instrument,
        ready,
        notes
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
        {composer &&
          !ready && (
            <button
              style={{ width: "32%", height: 100 }}
              onMouseDown={() =>
                this.playNote(instrument.tune, instrument.channel)
              }
              onMouseUp={() =>
                this.stopNote(instrument.tune, instrument.channel)
              }
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
