import React, { useState } from 'react';
// import '../../style/welcome.scss';

function UserList() {
  const [buttonText, setButtonText] = useState('3333');

  function handleClick() {
    return setButtonText('Thanks, been clicked!');
  }

  return (
    <div className="main-box">
      <button onClick={handleClick}>{buttonText}</button>
    </div>
  );
}

// UserList.propTypes = {

// };

export default UserList;
