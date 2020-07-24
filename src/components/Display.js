import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndoAlt, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

function Display(props) {
  const { title, timeLeft } = props;
  return (
    <div className="display">
      <h1 id="timer-label">{title}</h1>
      <div id="time-left">{timeLeft}</div>
      <button type="button" id="start_stop">
        <FontAwesomeIcon icon={faPlay} />
        <FontAwesomeIcon icon={faPause} />
      </button>
      <button type="button" id="reset">
        <FontAwesomeIcon icon={faUndoAlt} />
      </button>
    </div>
  );
}

Display.propTypes = {
  title: PropTypes.string.isRequired,
  timeLeft: PropTypes.number.isRequired,
};

export default Display;
