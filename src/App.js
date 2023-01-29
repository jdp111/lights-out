import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */
const nrows = 3
const ncols = 3
const chanceLightStartsOn = 0.5
function App() {
  return (
    <div className="App">
      <Board nrows = {nrows} ncols = {ncols} chanceLightStartsOn = {chanceLightStartsOn}/>
    </div>
  );
}

export default App;
