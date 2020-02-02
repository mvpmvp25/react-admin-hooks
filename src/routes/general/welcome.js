import React, { useState } from 'react';
import CardList from 'components/order/cardList';
import welcomeStyle from './welcome.scss';

function Welcome() {
  const [buttonText, setButtonText] = useState('Click me,   please');

  function handleClick() {
    return setButtonText('Thanks, been clicked!');
  }

  return (
    <div className={`main-box ${welcomeStyle.pageBox}`}>
      <CardList />
      <img src={require('assets/img/tab-my-pre.svg')} />
      <button className={welcomeStyle.hi} onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default Welcome;
