import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Display extends Component {
  render() {
    return <div id='display'>{this.props.displayValue}</div>;
  }
}

Display.propTypes = {
  displayValue: PropTypes.string.isRequired
};

export default Display;
