import React, { Component } from "react";
import "./App.css";

export default class Card extends Component {
  constructor(props) {
    console.log("constructor");
    super(props);
    let rot = Math.random() * 90 - 45;
    let x = Math.random() * 40 - 20;
    let y = Math.random() * 40 - 20;
    this._transform = `translate(${x}px,${y}px) rotate(${rot}deg)`;
  }
  render() {
    // console.log(styles);
    console.log("render");
    return (
      <img
        style={{ transform: this._transform }}
        className="card"
        src={this.props.img}
        alt={this.props.name}
      />
    );
  }
}
