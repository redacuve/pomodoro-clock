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
    this.handleLength = this.handleLength.bind(this);
    this.playPauseHandler = this.playPauseHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
  }

  handleLength(lengthID, command) {
    let stateL = '';
    if (lengthID === 'session-length') {
      stateL = 'sessionLength';
    } else {
      stateL = 'breakLength';
    }
    const { [stateL]: stateLen, timer } = this.state;
    const stateTime = lengthID === 'session-length' ? 'sessionTime' : 'breakTime';
    if (command === 'UP') {
      if (stateLen < 60 && timer !== 'running') {
        this.setState(state => ({
          [stateL]: state[stateL] + 1,
          [stateTime]: state[stateL] * 60 + 60,
        }));
      } else if (stateLen < 60) {
        this.setState(state => ({ [stateL]: state[stateL] + 1 }));
      }
    }
    if (command === 'DOWN') {
      if (stateLen > 1 && timer !== 'running') {
        this.setState(state => ({
          [stateL]: state[stateL] - 1,
          [stateTime]: state[stateL] * 60 - 60,
        }));
      } else if (stateLen > 1) {
        this.setState(state => ({ [stateL]: state[stateL] - 1 }));
      }
    }
  }

  decrementTimer(timerName) {
    const SBTime = timerName === 'session' ? 'sessionTime' : 'breakTime';
    const { [SBTime]: timeSB, timeoutFunc, timerLabel } = this.state;
    if (timeSB > 0) {
      this.setState(state => ({ [SBTime]: state[SBTime] - 1 }));
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
    this.setState({
      timeoutFunc: setInterval(() => {
        if (tLabel === 'Session') {
          this.decrementTimer('session');
        } else {
          this.decrementTimer('break');
        }
      }, 1000),
    });
  }

  playPauseHandler() {
    const { timer, timeoutFunc, timerLabel } = this.state;
    if (timer === 'running') {
      this.setState({ timer: 'stop' });
      clearTimeout(timeoutFunc);
    } else {
      clearTimeout(timeoutFunc);
      this.setState({ timer: 'running' });
      this.startTimer(timerLabel);
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
          clickHandler={this.handleLength}
        />
        <LengthBox
          boxID="session-label"
          title="Session Length"
          incrementID="session-increment"
          decrementID="session-decrement"
          lengthID="session-length"
          length={sessionLength}
          clickHandler={this.handleLength}
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
