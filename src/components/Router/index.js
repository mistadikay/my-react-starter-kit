import { connect } from 'react-redux';
import Component from './Router';

const mapDispatchToProps = () => ({
  onUpdate() {
    // we can dispatch route change to use it in redux
    // `this.state` is coming from `Router` component
    // see https://github.com/ReactTraining/react-router/issues/1539#issuecomment-121499082
    // dispatch(changeRoute(this.state));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Component);
