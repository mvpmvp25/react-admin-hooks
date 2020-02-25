import React, { useState } from 'react';
import { dataCenter } from 'utils/tool';
import { CardList, CardSearch, CardInfo } from 'components/order/index';
import { themeChange } from 'config/__system';

import welcomeStyle from './welcome.scss';

function Welcome() {
  const [state, setState] = useState(
    dataCenter.fromJS({
      page: 'xxxx',
      age: 'qqqq',
      taskList: ['aa', 'bb'],
      list: []
    })
  );

  const handleClick = () => {
    themeChange('dark');
    setState(
      dataCenter.merge(state, {
        page: 'xxxx',
        age: 'qqqq',
        taskList: ['aa', 'bb'],
        list: [
          { ss: 'xx', ww: 'rr' },
          { ss: 'ee', ww: 'gg' }
        ]
      })
    );
  };

  const { page, list, taskList } = dataCenter.toJS(state);

  return (
    <div className={`main-box ${welcomeStyle.pageBox}`}>
      <CardSearch publics={{ page, list }} privates={{ taskList }} />
      <CardList publics={{ page, list }} privates={{ taskList }} />
      <CardInfo />
      <img src={require('assets/img/tab-my-pre.svg')} />
      <button className={welcomeStyle.hi} onClick={handleClick}>
        换肤
      </button>
    </div>
  );
}

export default Welcome;
