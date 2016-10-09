import React from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import App from '~/components/App';
import Login from '~/components/Login';
import Dashboard from '~/components/Dashboard';
import Editor from '~/components/Editor';
import EmptyPage from '~/components/EmptyPage';

type Props = {
  onUpdate: Function
};

export default class extends React.Component {
  props: Props
  static defaultProps = {
    onUpdate() { /* do nothing */ }
  }

  render() {
    return (
      <Router history={ browserHistory } onUpdate={ this.props.onUpdate }>
        <Route name="ADMIN" path="/" component={ App }>
          <IndexRoute component={ Login } />
          <Route component={ Dashboard }>
            <Route path="editor" component={ Editor } />
            <Route path="*" component={ EmptyPage } />
          </Route>
        </Route>
      </Router>
    );
  }
}
