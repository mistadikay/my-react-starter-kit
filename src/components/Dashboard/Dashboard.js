import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Editor from '~/components/Editor';
import EmptyPage from '~/components/EmptyPage';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/">back</Link>
      <Switch>
        <Route path="/editor" component={Editor}/>
        <Route component={EmptyPage}/>
      </Switch>
    </div>
  );
}
