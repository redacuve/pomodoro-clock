import React from 'react';

function Pomodoro() {
  return (
    <div className="pomodoro">
      Pomodoro Clock
      <div id="break-label">
        Break Label
        <button id="break-increment" type="button"></button>
        <div id="break-length">5</div>
        <button id="break-decrement" type="button"></button>
      </div>
      <div id="session-label">
        Session Length
        <button id="session-increment" type="button"></button>
        <div id="session-length">25</div>
        <button id="session-decrement" type="button"></button>
      </div>
      <div id="timer-label">
        Session
      </div>
      <div id="time-left">25:00</div>
      <button type="button" id="start_stop"></button>
      <button type="button" id="reset"></button>
    </div>
  );
}

export default Pomodoro;
