import { Component } from "react";
import WebMidi from "webmidi";
import Layout from "../layout";

class Demo1 extends Component {
  componentDidMount() {
    WebMidi.enable(() => {
      var output = WebMidi.outputs[0];
      console.log(output);
      // setInterval(() => {
      //   output.playNote("C3");
      // }, 1000);
    });
  }
  render() {
    return (
      <Layout>
        <h1>Demo 1</h1>
      </Layout>
    );
  }
}

export default Demo1;
