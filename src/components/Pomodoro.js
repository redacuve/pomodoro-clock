import React from 'react';
import LengthBox from './LengthBox';
import Display from './Display';
import beep from '../assets/beep.mp3';

class Pomodoro extends React.Component {
  constructor() {
    super();
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      sessionTime: 1500,
      breakTime: 300,
      timerLabel: 'Session',
      timer: 'stop',
      timeoutFunc: '',
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
    const { breakLength, timer } = this.state;
    if (command === 'UP') {
      if (breakLength < 60 && timer !== 'running') {
        this.setState(state => ({
          breakLength: state.breakLength + 1,
          breakTime: state.breakTime * 60 + 60,
        }));
      } else if (breakLength < 60) {
        this.setState(state => ({ breakLength: state.breakLength + 1 }));
      }
    }
    if (command === 'DOWN') {
      if (breakLength > 1 && timer !== 'running') {
        this.setState(state => ({
          breakLength: state.breakLength - 1,
          breakTime: state.breakTime * 60 - 60,
        }));
      } else if (breakLength > 1) {
        this.setState(state => ({ breakLength: state.breakLength - 1 }));
      }
    }
  }

  decrementSessionTimer() {
    const { sessionTime, timeoutFunc, timerLabel } = this.state;
    if (sessionTime > 0) {
      this.setState(state => ({ sessionTime: state.sessionTime - 1 }));
    } else {
      clearTimeout(timeoutFunc);
      document.querySelector('#beep').play();
      this.setState(state => ({ timeoutFunc: '', sessionTime: state.sessionLength * 60, breakTime: state.breakLength * 60 }));
      if (timerLabel === 'Session') {
        this.setState({ timerLabel: 'Break' });
        this.startTimer('Break');
      } else {
        this.setState({ timerLabel: 'Session' });
        this.startTimer('Session');
      }
    }
  }

  decrementBreakTimer() {
    const { breakTime, timeoutFunc, timerLabel } = this.state;
    if (breakTime > 0) {
      this.setState(state => ({ breakTime: state.breakTime - 1 }));
    } else {
      clearTimeout(timeoutFunc);
      document.querySelector('#beep').play();
      this.setState(state => ({ timeoutFunc: '', sessionTime: state.sessionLength * 60, breakTime: state.breakLength * 60 }));
      if (timerLabel === 'Session') {
        this.setState({ timerLabel: 'Break' });
        this.startTimer('Break');
      } else {
        this.setState({ timerLabel: 'Session' });
        this.startTimer('Session');
      }
    }
  }

  startTimer(tLabel) {
    if (tLabel === 'Session') {
      this.setState({
        timeoutFunc: setInterval(() => {
          this.decrementSessionTimer();
        }, 1000),
      });
    } else {
      this.setState({
        timeoutFunc: setInterval(() => {
          this.decrementBreakTimer();
        }, 1000),
      });
    }
  }

  playPauseHandler() {
    const { timer, timeoutFunc, timerLabel } = this.state;
    switch (timer) {
      case 'running':
        this.setState({ timer: 'pause' });
        clearTimeout(timeoutFunc);
        break;
      case 'pause':
        clearTimeout(timeoutFunc);
        this.setState({ timer: 'running' });
        this.startTimer(timerLabel);
        break;
      case 'stop':
        clearTimeout(timeoutFunc);
        this.setState({ timer: 'running' });
        this.startTimer(timerLabel);
        break;
      default:
        break;
    }
  }

  resetHandler() {
    const { timeoutFunc } = this.state;
    clearTimeout(timeoutFunc);
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      sessionTime: 1500,
      breakTime: 300,
      timer: 'stop',
      timeoutFunc: '',
      timerLabel: 'Session',
    });
    const sound = document.querySelector('#beep');
    sound.pause();
    sound.currentTime = 0;
  }

  render() {
    const {
      breakLength, sessionTime, sessionLength, timerLabel, breakTime,
    } = this.state;
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
          title={timerLabel}
          timeLeft={timerLabel === 'Session' ? sessionTime : breakTime}
          resetHandler={this.resetHandler}
          playPauseHandler={this.playPauseHandler}
        />
        { /* eslint-disable-next-line jsx-a11y/media-has-caption */ }
        <audio id="beep" src={beep} />
      </div>
    );
  }
}

export default Pomodoro;
