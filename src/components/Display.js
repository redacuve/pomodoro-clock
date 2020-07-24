import React from 'react';

function Display(props) {
  const { title, timeLeft } = props;
  return (
    <div className="display">
      <h1 id="timer-label">{title}</h1>
      <div id="time-left">{timeLeft}</div>
      <button type="button" id="start_stop" />
      <button type="button" id="reset" />
    </div>
  );
}

export default Display;
