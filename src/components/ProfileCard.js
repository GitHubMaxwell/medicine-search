import React, { Component } from 'react';
import { deleteItem } from '../reducer/user-reducer';
import { connect } from 'react-redux';

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete(event) {
    let rxcui = event.target.parentNode.parentNode.parentNode.id;
    this.props.deleteItem(rxcui);
  }

  render() {
    let rxcui = this.props.details.rxcui;
    return (
      <li id={rxcui}>
        <div className="list-item-container container">
          <h2>{this.props.details.name}</h2>
          <div className="save-btn">
            <button id="undo" onClick={this.delete} type="submit">
              Undo
            </button>
          </div>
        </div>
      </li>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteItem: payload => dispatch(deleteItem(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(ProfileCard);
