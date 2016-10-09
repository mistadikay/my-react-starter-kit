// @flow

import React from 'react';

import styles from './index.css';

type Props = {
  children?: React$Element<*>
};

export default class extends React.Component {
  props: Props

  render(): React$Element<*> {
    return (
      <div className={ styles.app }>
        { this.props.children }
      </div>
    );
  }
}
