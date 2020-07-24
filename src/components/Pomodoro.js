import React from 'react';
import LengthBox from './LengthBox';
import Display from './Display';

class Pomodoro extends React.Component {
  constructor() {
    super();
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      sessionTime: 1500,
      timer: 'stop',
    };
    this.handleSessionLength = this.handleSessionLength.bind(this);
    this.handleBreakLength = this.handleBreakLength.bind(this);
    this.playPauseHandler = this.playPauseHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
  }

  handleSessionLength(command) {
    const { sessionLength, timer } = this.state;
    if (command === 'UP') {
      if (sessionLength < 60 && timer !== 'running') {
        this.setState(state => ({
          sessionLength: state.sessionLength + 1,
          sessionTime: state.sessionLength * 60 + 60,
        }));
      } else if (sessionLength < 60) {
        this.setState(state => ({ sessionLength: state.sessionLength + 1 }));
      }
    }
    if (command === 'DOWN') {
      if (sessionLength > 1 && timer !== 'running') {
        this.setState(state => ({
          sessionLength: state.sessionLength - 1,
          sessionTime: state.sessionLength * 60 - 60,
        }));
      } else if (sessionLength > 1) {
        this.setState(state => ({ sessionLength: state.sessionLength - 1 }));
      }
    }
  }

  handleBreakLength(command) {
    const { breakLength } = this.state;
    if (command === 'UP') {
      if (breakLength < 60) {
        this.setState(state => ({ breakLength: state.breakLength + 1 }));
      }
    }
    if (command === 'DOWN') {
      if (breakLength > 1) {
        this.setState(state => ({ breakLength: state.breakLength - 1 }));
      }
    }
  }

  playPauseHandler() {
    const { timer } = this.state;
    if (timer === 'running') {
      this.setState({ timer: 'pause' });
    } else if (timer === 'pause' || timer === 'stop') {
      this.setState({ timer: 'running' });
    }
  }

  resetHandler() {
    this.setState(state => ({
      sessionTime: state.sessionLength * 60,
      timer: 'stop',
    }));
  }

  render() {
    const { breakLength, sessionTime, sessionLength } = this.state;
    return (
      <div className="pomodoro">
        <h1>Pomodoro Clock</h1>
        <LengthBox
          boxID="break-label"
          title="Break Length"
          incrementID="break-increment"
          decrementID="break-decrement"
          lengthID="break-length"
          length={breakLength}
          clickHandler={this.handleBreakLength}
        />
        <LengthBox
          boxID="session-label"
          title="Session Length"
          incrementID="session-increment"
          decrementID="session-decrement"
          lengthID="session-length"
          length={sessionLength}
          clickHandler={this.handleSessionLength}
        />
        <Display
          title="Session"
          timeLeft={sessionTime}
          resetHandler={this.resetHandler}
          playPauseHandler={this.playPauseHandler}
        />
      </div>
    );
  }
}

export default Pomodoro;
