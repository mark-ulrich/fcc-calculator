import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Keypad extends Component {
  render() {
    return (
      <div id='keypad'>
        <button
          className='keypad-btn equals-btn'
          id='equals'
          onClick={this.props.onButtonPress}
        >
          =
        </button>
        <button
          className='keypad-btn number-btn'
          id='zero'
          onClick={this.props.onButtonPress}
        >
          0
        </button>
        <button
          className='keypad-btn number-btn'
          id='one'
          onClick={this.props.onButtonPress}
        >
          1
        </button>
        <button
          className='keypad-btn number-btn'
          id='two'
          onClick={this.props.onButtonPress}
        >
          2
        </button>
        <button
          className='keypad-btn number-btn'
          id='three'
          onClick={this.props.onButtonPress}
        >
          3
        </button>
        <button
          className='keypad-btn number-btn'
          id='four'
          onClick={this.props.onButtonPress}
        >
          4
        </button>
        <button
          className='keypad-btn number-btn'
          id='five'
          onClick={this.props.onButtonPress}
        >
          5
        </button>
        <button
          className='keypad-btn number-btn'
          id='six'
          onClick={this.props.onButtonPress}
        >
          6
        </button>
        <button
          className='keypad-btn number-btn'
          id='seven'
          onClick={this.props.onButtonPress}
        >
          7
        </button>
        <button
          className='keypad-btn number-btn'
          id='eight'
          onClick={this.props.onButtonPress}
        >
          8
        </button>
        <button
          className='keypad-btn number-btn'
          id='nine'
          onClick={this.props.onButtonPress}
        >
          9
        </button>
        <button
          className='keypad-btn operation-btn'
          id='add'
          onClick={this.props.onButtonPress}
        >
          +
        </button>
        <button
          className='keypad-btn operation-btn'
          id='subtract'
          onClick={this.props.onButtonPress}
        >
          -
        </button>
        <button
          className='keypad-btn operation-btn'
          id='multiply'
          onClick={this.props.onButtonPress}
        >
          &times;
        </button>
        <button
          className='keypad-btn operation-btn'
          id='divide'
          onClick={this.props.onButtonPress}
        >
          &divide;
        </button>
        <button
          className='keypad-btn number-btn'
          id='decimal'
          onClick={this.props.onButtonPress}
        >
          .
        </button>
        <button
          className='keypad-btn clear-btn'
          id='clear'
          onClick={this.props.onButtonPress}
        >
          AC
        </button>
      </div>
    );
  }
}

Keypad.propTypes = {
  onButtonPress: PropTypes.func.isRequired
};

export default Keypad;
