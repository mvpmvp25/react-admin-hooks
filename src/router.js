import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import appHistory from './history';
import BasicLayout from './components/layout/basicLayout';
import { routeList } from 'config/__system';

function RouterConfig() {
  return (
    <Router history={appHistory}>
      {/* <Switch> */}
      {/* <Route path="/user" exact component={UserPage} /> */}
      {/* <Route path="/products" exact component={Products} /> */}
      <BasicLayout>
        <Switch>
          {routeList.map((item, index) => {
            return <Route key={index} path={item.path} exact component={item.component} />;
          })}
        </Switch>
      </BasicLayout>
      {/* </Switch> */}
    </Router>
  );
}

export default RouterConfig;
