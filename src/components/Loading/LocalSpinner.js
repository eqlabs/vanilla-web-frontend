import React, { Component } from "react";
import spinner from "./spinner.svg";

export class LocalSpinner extends Component {
  render() {
    const style = {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "white"
    };

    return (
      <div style={style}>
        <img src={spinner} alt="loading" />
      </div>
    );
  }
}
