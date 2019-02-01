import React, { Component, Fragment } from 'react';
import ResultCard from './ResultCard';
import { connect } from 'react-redux';

class ResultList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <ul className="container">
          {this.props.alt_toggle
            ? this.props.alternatives.map(ele => <ResultCard key={ele.rxcui} details={ele} />)
            : this.props.searchResults.map(ele => <ResultCard key={ele.rxcui} details={ele} />)}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.searchReducer.searchResults,
  alternatives: state.searchReducer.alternatives,
  alt_toggle: state.searchReducer.alt_toggle,
  initial: state.searchReducer.initial,
  favorites: state.searchReducer.favorites
});

export default connect(mapStateToProps)(ResultList);
