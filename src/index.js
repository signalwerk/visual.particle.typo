import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Bubble from "./Bubble";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Bubble />
    <p>
      check{" "}
      <a
        href="https://github.com/signalwerk/visual.particle.typo"
        target="_blank"
        rel="noopener noreferrer"
      >
        code
      </a>{" "}
      here
    </p>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
