import { connect } from 'react-redux';
import Component from './Dashboard';
import { actions, getExampleData, getExampleLoadingStatus } from '~/state/example';

const mapStateToProps = (state) => ({
  data: getExampleData(state),
  isLoading: getExampleLoadingStatus(state)
});

const mapDispatchToProps = {
  requestExample: actions.requestExample
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
