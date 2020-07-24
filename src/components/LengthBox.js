import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

function LengthBox(props) {
  const {
    boxID, title, incrementID, decrementID, lengthID, length, clickHandler,
  } = props;

  return (
    <div id={boxID}>
      <h3>{title}</h3>
      <button id={incrementID} type="button" onClick={() => clickHandler('UP')}>
        <FontAwesomeIcon icon={faAngleUp} />
      </button>
      <div id={lengthID}>{length}</div>
      <button id={decrementID} type="button" onClick={() => clickHandler('DOWN')}>
        <FontAwesomeIcon icon={faAngleDown} />
      </button>
    </div>
  );
}

LengthBox.propTypes = {
  boxID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  incrementID: PropTypes.string.isRequired,
  decrementID: PropTypes.string.isRequired,
  lengthID: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  clickHandler: PropTypes.number.isRequired,
};

export default LengthBox;
