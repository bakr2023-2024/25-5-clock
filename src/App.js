import "./App.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mins: 25,
      secs: 0,
      sessionLength: 25,
      breakLength: 5,
      isRunning: false,
      timer: "",
      timerLabel: "session",
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.switchTimers = this.switchTimers.bind(this);
    this.countdown = this.countdown.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset() {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    clearInterval(this.state.timer);
    this.setState((state) => ({
      mins: 25,
      secs: 0,
      sessionLength: 25,
      breakLength: 5,
      isRunning: false,
      timer: "",
      timerLabel: "session",
    }));
  }
  handleClick(event) {
    if (!this.state.isRunning) {
      if (
        event.target.id === "session-increment" &&
        this.state.sessionLength < 60
      ) {
        this.setState((state) => ({
          sessionLength: state.sessionLength + 1,
          mins:
            state.timerLabel === "session"
              ? state.sessionLength + 1
              : state.mins,
          secs: state.timerLabel === "session" ? 0 : state.secs,
        }));
      } else if (
        event.target.id === "session-decrement" &&
        this.state.sessionLength > 1
      ) {
        this.setState((state) => ({
          sessionLength: state.sessionLength - 1,
          mins:
            state.timerLabel === "session"
              ? state.sessionLength - 1
              : state.mins,
          secs: state.timerLabel === "session" ? 0 : state.secs,
        }));
      } else if (
        event.target.id === "break-increment" &&
        this.state.breakLength < 60
      ) {
        this.setState((state) => ({
          breakLength: state.breakLength + 1,
          mins:
            state.timerLabel === "break" ? state.breakLength + 1 : state.mins,
          secs: state.timerLabel === "break" ? 0 : state.secs,
        }));
      } else if (
        event.target.id === "break-decrement" &&
        this.state.breakLength > 1
      ) {
        this.setState((state) => ({
          breakLength: state.breakLength - 1,
          mins:
            state.timerLabel === "break" ? state.breakLength - 1 : state.mins,
          secs: state.timerLabel === "break" ? 0 : state.secs,
        }));
      }
    }
  }
  toggleTimer(event) {
    if (event.target.id === "start_stop") {
      if (!this.state.isRunning) {
        this.setState((state) => ({
          isRunning: true,
          timer: setInterval(this.countdown, 1000),
        }));
      } else if (this.state.isRunning) {
        clearInterval(this.state.timer);
        this.setState(() => ({
          isRunning: false,
          timer: "",
        }));
      }
    }
  }
  switchTimers() {
    clearInterval(this.state.timer);
    this.setState((state) => ({
      mins:
        state.timerLabel === "session"
          ? state.breakLength
          : state.sessionLength,
      secs: 0,
      timerLabel: state.timerLabel === "session" ? "break" : "session",
      timer: setInterval(this.countdown, 1000),
    }));
  }
  countdown() {
    if (this.state.mins > 0 && this.state.secs === 0) {
      this.setState((state) => ({
        mins: state.mins - 1,
        secs: 60,
      }));
    }

    if (this.state.mins === 0 && this.state.secs === 0) {
      document.getElementById("beep").play();
      this.switchTimers();
    } else {
      this.setState((state) => ({
        secs: state.secs - 1,
      }));
    }
  }
  render() {
    return (
      <div className="w-50 d-flex flex-column justify-content-center">
        <h2 className="text-center">25+5 Clock</h2>

        <div className="d-flex justify-content-between">
          <div id="break" className="text-center">
            <h3 id="break-label">Break Length</h3>
            <h3 id="break-length">{this.state.breakLength}</h3>
            <button
              className="btn btn-dark btn-outline-light m-1"
              id="break-decrement"
              onClick={this.handleClick}
            >
              -
            </button>

            <button
              className="btn btn-dark btn-outline-light m-1"
              id="break-increment"
              onClick={this.handleClick}
            >
              +
            </button>
          </div>

          <div id="session" className="text-center">
            <h3 id="session-label">Session Length</h3>
            <h3 id="session-length">{this.state.sessionLength}</h3>
            <button
              className="btn btn-dark btn-outline-light m-1"
              id="session-decrement"
              onClick={this.handleClick}
            >
              -
            </button>

            <button
              className="btn btn-dark btn-outline-light m-1"
              id="session-increment"
              onClick={this.handleClick}
            >
              +
            </button>
          </div>
        </div>
        <div id="timer" className=" text-center">
          <h3 id="timer-label">{this.state.timerLabel}</h3>
          <h1 id="time-left">{`${String(this.state.mins).padStart(
            2,
            "0"
          )}:${String(this.state.secs).padStart(2, "0")}`}</h1>
          <button
            className="btn btn-dark btn-outline-light m-1"
            id="start_stop"
            onClick={this.toggleTimer}
          >
            Start/Stop
          </button>
          <button
            className="btn btn-dark btn-outline-light m-1"
            id="reset"
            onClick={this.reset}
          >
            Reset
          </button>
        </div>

        <audio
          id="beep"
          src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    );
  }
}

export default App;
