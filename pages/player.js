import { Component } from "react";
import io from "socket.io-client";
import initReactFastClick from "react-fastclick";
import Layout from "../layout";

initReactFastClick();

const buttonStyles = {
  width: "32%",
  background: "#CCC",
  padding: "40px 0",
  textAlign: "center",
  display: "inline-block",
  border: "2px solid #FFF",
  "user-select": "none",
  "-moz-user-select": "none",
  "-khtml-user-select": "none",
  "-webkit-user-select": "none",
  "-o-user-select": "none"
};

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
    this.socket.on("playerReady", ({ composer, instrument, ready, notes }) => {
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
            <div
              style={buttonStyles}
              onPointerDown={() =>
                this.playNote(instrument.tune, instrument.channel)
              }
              onPointerUp={() =>
                this.stopNote(instrument.tune, instrument.channel)
              }
              key={instrument.tune}
            >
              Tune up ({instrument.tune})
            </div>
          )}
        {ready && (
          <div syles={{ width: "100%" }}>
            {notes.map(note => (
              <div
                style={buttonStyles}
                onTouchStart={() => this.playNote(note, instrument.channel)}
                onMouseDown={() => this.playNote(note, instrument.channel)}
                onTouchEnd={() => this.stopNote(note, instrument.channel)}
                onMouseUp={() => this.stopNote(note, instrument.channel)}
                key={note}
              >
                {note}
              </div>
            ))}
          </div>
        )}
      </Layout>
    );
  }
}

export default Index;
