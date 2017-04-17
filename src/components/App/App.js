// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '~/components/Login';
import Dashboard from '~/components/Dashboard';

import styles from './index.css';

export default function App(): React$Element<*> {
  return (
    <div className={styles.app}>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route component={Dashboard}/>
      </Switch>
    </div>
  );
}
