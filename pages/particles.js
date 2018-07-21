import { Component } from "react";
import _ from "underscore";
import Layout from "../layout";
import WebMidi from "webmidi";
import draw from "../lib/draw";

const MIDIevents = {
  nothing: 248,
  on: 144,
  off: 128,
  pedal: 176
};

function MIDIController() {
  this.listener = undefined;

  this.newEvent = function(data) {
    if (this.listener instanceof Function) {
      this.listener(data);
    }
  }.bind(this);
}

const midiController = new MIDIController();

class Particles extends Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext("2d");
    WebMidi.enable(() => {
      console.log(WebMidi.inputs);
      this.input = WebMidi.inputs[0];
      this.input.addListener("noteon", "all", this.handleEvent);
      this.input.addListener("noteoff", "all", this.handleEvent);
      new Processing(this.canvas, p => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        p.size(width, height, p.JAVA2D);
        p.background(0);
        p.draw = new draw(p, this.ctx, midiController).loop;
      });
    });
  }

  handleEvent = event => {
    var data = event.data;

    if (
      data[0] !== MIDIevents.nothing &&
      data[0] !== MIDIevents.off &&
      data[0] !== MIDIevents.pedal
    ) {
      midiController.newEvent(data);
    }
  };

  render() {
    return (
      <Layout>
        <h1>Particles Example</h1>
        <canvas ref={el => (this.canvas = el)} />
      </Layout>
    );
  }
}

export default Particles;
