import React from 'react';

type Props = {
  data?: Object | null,
  isLoading?: boolean,
  requestExample: Function
};

export default class extends React.Component {
  props: Props
  static defaultProps = {
    requestExample() { /* do nothing */ }
  };

  componentDidMount() {
    if (!this.props.data) {
      this.props.requestExample();
    }
  }

  render() {
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        { JSON.stringify(this.props.data) }
      </div>
    );
  }
}
