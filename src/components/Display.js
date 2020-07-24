import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndoAlt, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

function secondsToString(seconds) {
  let sec = seconds;
  const minutes = Math.floor(sec / 60)
    .toString()
    .padStart(2, '0');
  sec %= 60;
  sec = sec.toString()
    .padStart(2, '0');
  return `${minutes}:${sec}`;
}
function Display(props) {
  const {
    title, timeLeft, playPauseHandler, resetHandler,
  } = props;
  const format = secondsToString(timeLeft);
  return (
    <div className="display">
      <h1 id="timer-label">{title}</h1>
      <div id="time-left">{format}</div>
      <button type="button" id="start_stop" onClick={playPauseHandler}>
        <FontAwesomeIcon icon={faPlay} />
        <FontAwesomeIcon icon={faPause} />
      </button>
      <button type="button" id="reset" onClick={resetHandler}>
        <FontAwesomeIcon icon={faUndoAlt} />
      </button>
    </div>
  );
}

Display.propTypes = {
  title: PropTypes.string.isRequired,
  timeLeft: PropTypes.number.isRequired,
  playPauseHandler: PropTypes.func.isRequired,
  resetHandler: PropTypes.func.isRequired,
};

export default Display;
