import React from 'react';

function LengthBox(props) {
  const {
    boxID, title, incrementID, decrementID, lengthID, length,
  } = props;
  return (
    <div id={boxID}>
      <h3>{title}</h3>
      <button id={incrementID} type="button" />
      <div id={lengthID}>{length}</div>
      <button id={decrementID} type="button" />
    </div>
  );
}

export default LengthBox;
