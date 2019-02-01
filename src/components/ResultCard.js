import React, { Component } from 'react';
import { populateAlternatives, altToggle } from '../reducer/search-reducer';
import { saveItem, deleteItem } from '../reducer/user-reducer';
import { connect } from 'react-redux';

class ResultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false
    };
    this.toggleSave = this.toggleSave.bind(this);
  }

  toggleSave(event) {
    // move state to reducer
    event.preventDefault();
    this.setState(prevState => {
      return { saved: !prevState.saved };
    });
    let rxcui = event.target.parentNode.parentNode.parentNode.id;
    let name = event.target.parentNode.parentNode.firstChild.innerText;
    let payload = {
      rxcui,
      name
    };

    if (event.target.id === 'save') {
      this.props.saveItem(payload);
    } else {
      this.props.deleteItem(rxcui);
    }
  }

  render() {
    let rxcui = this.props.details.rxcui;
    return (
      <li id={rxcui}>
        <div className="list-item-container container">
          {this.props.alt_toggle ? (
            <h2>{this.props.details.synonym}</h2>
          ) : (
            <h2>{this.props.details.name}</h2>
          )}
          <div className="save-btn">
            {this.state.saved ? (
              <button id="undo" onClick={this.toggleSave} type="submit">
                Undo
              </button>
            ) : (
              <button id="save" onClick={this.toggleSave} type="submit">
                Save
              </button>
            )}
            {this.props.alt_toggle ? null : (
              <button id="alt" onClick={() => this.props.populateAlternatives(rxcui)} type="submit">
                Alternatives
              </button>
            )}
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => ({
  alt_toggle: state.searchReducer.alt_toggle
});

const mapDispatchToProps = dispatch => ({
  populateAlternatives: payload => dispatch(populateAlternatives(payload)),
  altToggle: () => dispatch(altToggle()),
  saveItem: payload => dispatch(saveItem(payload)),
  deleteItem: payload => dispatch(deleteItem(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultCard);
