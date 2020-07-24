import React from 'react';
import LengthBox from './LengthBox';
import Display from './Display';

class Pomodoro extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="pomodoro">
        <h1>Pomodoro Clock</h1>
        <LengthBox
          boxID="break-label"
          title="Break Length"
          incrementID="break-increment"
          decrementID="break-decrement"
          lengthID="break-length"
          length="5"
        />
        <LengthBox
          boxID="session-label"
          title="Session Length"
          incrementID="session-increment"
          decrementID="session-decrement"
          lengthID="session-length"
          length="25"
        />
        <Display title="Session" timeLeft="25:00" />
      </div>
    );
  }
}

export default Pomodoro;
