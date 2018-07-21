import { Component } from "react";
import io from "socket.io-client";
import initReactFastClick from "react-fastclick";

initReactFastClick();

const octaves = [0, 1, 2, 3, 4, 5, 6, 7];
const accidentals = ["", "#", "b"];
const notes = ["A", "B", "C", "D", "F", "G"];

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
    this.socket.emit("note", note);
    console.log("emitted", note);
  };

  render() {
    return (
      <div>
        <h1>{this.state.hello}</h1>
        {this.state.notes &&
          this.state.notes.map(note => (
            <button
              style={{ width: 60, height: 100, margin: 20 }}
              onClick={() => this.playNote(note)}
            >
              {note}
            </button>
          ))}
      </div>
    );
  }
}

export default Index;
