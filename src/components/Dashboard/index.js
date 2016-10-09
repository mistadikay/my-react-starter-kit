import { connect } from 'react-redux';
import Component from './Dashboard';
import { getExampleData, getExampleLoadingStatus } from '~/store/selectors/example';
import { requestExample } from '~/store/actions/example';

const mapStateToProps = (state) => ({
  data: getExampleData(state),
  isLoading: getExampleLoadingStatus(state)
});

const mapDispatchToProps = {
  requestExample
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
