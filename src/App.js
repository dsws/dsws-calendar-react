import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DailyCalendar from "./comps/DailyCalendar/DailyCalendar";

const events = [
  { start: 30, end: 640 },
  { start: 540, end: 600 },
  { start: 560, end: 620 },
  { start: 610, end: 670 },
  { start: 110, end: 125 }
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>DailyCalendar by DSWS</h1>
        <small>React fork of https://github.com/meijiao/calendar</small>
      </header>
      <DailyCalendar events={events} />
    </div>
  );
}

export default App;
