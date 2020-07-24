import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

function LengthBox(props) {
  const {
    boxID, title, incrementID, decrementID, lengthID, length,
  } = props;
  return (
    <div id={boxID}>
      <h3>{title}</h3>
      <button id={incrementID} type="button"><FontAwesomeIcon icon={faAngleUp} /></button>
      <div id={lengthID}>{length}</div>
      <button id={decrementID} type="button"><FontAwesomeIcon icon={faAngleDown} /></button>
    </div>
  );
}

export default LengthBox;
