import { Component } from "react";
import io from "socket.io-client";

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
        note: generateRandomNote()
      });
    });
  }

  playNote = () => {
    this.socket.emit("note", this.state.note);
    console.log("emitted", this.state.note);
  };

  render() {
    return (
      <div>
        <h1>{this.state.hello}</h1>
        <button onClick={this.playNote}>{this.state.note}</button>
      </div>
    );
  }
}

export default Index;
