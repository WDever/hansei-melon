import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import * as api from '../lib/api';
import * as searchActions from '../store/modules/search';

class SearchBarContainer extends React.Component {
  componentDidMount = () => {
    
  }
  

  handleChange = e => {
    const { value } = e.target;
    const { SearchActions } = this.props;

    SearchActions.input(value);
  }

  render() {
    const { input } = this.props;
    const { handleChange } = this;
    return (
      <SearchBar
        value={input}
        onChange={handleChange}
      />
    );
  }
}

const mapStateToProps = ({ search }) => ({
  input: search.input
});

const mapDispatchToProps = dispatch => ({
  SearchActions: bindActionCreators(searchActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBarContainer);
