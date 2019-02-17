import React, { Component, Fragment } from 'react';
import { populateList, altToggle } from '../reducer/search-reducer';
import { updateTopSearches } from '../reducer/user-reducer';
import { connect } from 'react-redux';
import ResultList from './ResultList';
import LogInOut from './LogInOut';
import CanvasLogo from '../assets/logo/canvas-logo.png';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.searchEntry = this.searchEntry.bind(this);
    this.backBtn = this.backBtn.bind(this);
  }

  searchEntry(event) {
    this.setState({ searchValue: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    let payload = {
      searchValue: this.state.searchValue
    };

    this.props.updateTopSearches(this.state.searchValue);
    this.state.searchValue ? this.props.populateList(payload) : alert('PLEASE ENTER VALUE');
    document.getElementById('search').value = '';
  }

  backBtn(event) {
    event.preventDefault();
    this.props.altToggle();
  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <nav className="container">
          <h1>PillBox</h1>
          <div className="right container">
            <LogInOut />
          </div>
        </nav>
      );
    } else {
      return (
        <Fragment>
          <nav className="container">
            <img src={CanvasLogo} alt="canvas logo" />
            <div className="right container">
              <form>
                {this.props.alt_toggle ? (
                  <button className="back" onClick={this.backBtn}>
                    Back
                  </button>
                ) : null}
                <input
                  id="search"
                  type="text"
                  name="search"
                  placeholder="Example: 'Advil'"
                  onChange={this.searchEntry}
                />
                <button className="search" onClick={this.onSubmit} type="submit">
                  Search
                </button>
                <Link to="/profile">
                  <button id="profile" type="submit">
                    Profile
                  </button>
                </Link>
              </form>
              <LogInOut />
            </div>
          </nav>
          <ResultList />
        </Fragment>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  populateList: payload => dispatch(populateList(payload)),
  altToggle: () => dispatch(altToggle()),
  updateTopSearches: payload => dispatch(updateTopSearches(payload))
});

const mapStateToProps = state => ({
  alt_toggle: state.searchReducer.alt_toggle,
  username: state.userReducer.name,
  password: state.userReducer.password,
  loggedIn: state.userReducer.loggedIn,
  topSearches: state.userReducer.topSearches
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
