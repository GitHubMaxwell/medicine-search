import React, { Component, Fragment } from 'react';
import ProfileCard from './ProfileCard';
import { connect } from 'react-redux';
import CanvasLogo from '../assets/logo/canvas-logo.png';
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <nav className="container">
          <img src={CanvasLogo} alt="canvas logo" />
          <div className="right container">
            <Link to="/">
              <button className="home" type="submit">
                Home
              </button>
            </Link>
          </div>
        </nav>
        <ul>
          {Object.values(this.props.savedItems).map(ele => (
            <ProfileCard key={ele.rxcui} details={ele} />
          ))}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  alt_toggle: state.searchReducer.alt_toggle,
  savedItems: state.userReducer.savedItems
});

export default connect(mapStateToProps)(Profile);
