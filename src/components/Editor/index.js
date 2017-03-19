import { connect } from 'react-redux';
import Component from './Editor';
import { actions, getExampleData } from '~/state/example';
import { getExampleProgress } from '~/state/progress';

const mapStateToProps = (state) => ({
  data: getExampleData(state),
  isLoading: getExampleProgress(state)
});

const mapDispatchToProps = {
  requestExample: actions.requestExample
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
