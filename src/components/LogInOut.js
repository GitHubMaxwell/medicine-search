import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser, logOut, logIn } from '../reducer/user-reducer';

class LogInOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    let obj = {
      username: this.state.name,
      password: this.state.password
    };
    if (this.state.name && this.state.password) {
      if (event.target.id === 'signup') {
        this.props.createUser(obj);
      }
      if (event.target.id === 'login') {
        this.props.logIn(this.state.name);
      }
    } else {
      this.setState({
        name: '',
        password: ''
      });
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      alert('Missing field(s)');
    }
  }
  logOut() {
    this.props.logOut(this.props.state);
  }
  render() {
    if (this.props.loggedIn) {
      return (
        <form>
          <button id="logout" onClick={this.logOut} type="submit">
            Log Out
          </button>
        </form>
      );
    } else {
      return (
        <form>
          <input
            type="text"
            id="username"
            name="name"
            placeholder="Username"
            onChange={this.onChange}
          />
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Password"
            onChange={this.onChange}
          />
          <button id="signup" onClick={this.onSubmit} type="submit">
            Sign Up
          </button>
          <button id="login" onClick={this.onSubmit} type="submit">
            Log In
          </button>
        </form>
      );
    }
  }
}
const mapStateToProps = state => ({
  loggedIn: state.userReducer.loggedIn,
  state: state.userReducer,
  topSearches: state.userReducer.topSearches
});

const mapDispatchToProps = dispatch => ({
  createUser: payload => dispatch(createUser(payload)),
  logOut: payload => dispatch(logOut(payload)),
  logIn: payload => dispatch(logIn(payload)),
  initialLoad: payload => dispatch(initialLoad(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInOut);
