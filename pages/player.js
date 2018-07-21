import { Component } from "react";
import io from "socket.io-client";
import initReactFastClick from "react-fastclick";
import Layout from "../layout";

initReactFastClick();

const octaves = [2, 3, 4, 5];
const accidentals = ["", "#", "b"];
const notes = ["A", "B", "C", "D", "F", "G"];
const channels = [1, 2, 3];

const randomItem = collection =>
  collection[Math.floor(Math.random() * collection.length)];

const generateRandomNote = () =>
  `${randomItem(notes)}${randomItem(accidentals)}${randomItem(octaves)}`;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: ""
    };
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on("composerName", data => {
      this.setState({
        hello: data.message,
        channel: randomItem(channels),
        notes: [
          generateRandomNote(),
          generateRandomNote(),
          generateRandomNote(),
          generateRandomNote(),
          generateRandomNote()
        ]
      });
    });
  }

  playNote = note => {
    this.socket.emit("playNote", {
      channel: this.state.channel,
      note
    });
  };

  stopNote = note => {
    this.socket.emit("stopNote", {
      channel: this.state.channel,
      note
    });
  };

  render() {
    return (
      <Layout>
        <h1>{this.state.hello}</h1>
        {this.state.notes &&
          this.state.notes.map(note => (
            <button
              style={{ width: 60, height: 100, margin: 20 }}
              onMouseDown={() => this.playNote(note)}
              onMouseUp={() => this.stopNote(note)}
            >
              {note}
            </button>
          ))}
      </Layout>
    );
  }
}

export default Index;
