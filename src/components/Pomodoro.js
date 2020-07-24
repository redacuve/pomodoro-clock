import React from 'react';
import LengthBox from './LengthBox';
import Display from './Display';

class Pomodoro extends React.Component {
  constructor() {
    super();
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      sessionTime: 1500000,
    };
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
        />
        <LengthBox
          boxID="session-label"
          title="Session Length"
          incrementID="session-increment"
          decrementID="session-decrement"
          lengthID="session-length"
          length={sessionLength}
        />
        <Display title="Session" timeLeft={sessionTime} />
      </div>
    );
  }
}

export default Pomodoro;
