import React, { Component } from 'react';
import Display from './Display';
import Keypad from './Keypad';

const ADD = 'add';
const SUBTRACT = 'subtract';
const MULTIPLY = 'multiply';
const DIVIDE = 'divide';

const MAX_DISPLAY_CHARS = 14;

export class CalculatorApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedValue: 0,
      currentDisplay: '0',
      currentOperation: null,
      isNewOp: true
    };
  }

  /**
   * Reset to default state
   */
  reset = () => {
    this.setOperation(ADD);
    this.updateDisplay('0');
    this.setState({
      savedValue: 0
    });
  };

  /**
   * Delegate a button press event to the appropriate method depending
   * on the type of the button which was pressed. The button types are:
   *  number-btn, operation-btn, clear, and equals
   */
  onButtonPress = e => {
    const classList = e.target.classList;
    const id = e.target.id;

    if (classList.contains('number-btn')) {
      this.numberPressed(e.target.innerText);
    } else if (classList.contains('operation-btn')) {
      this.operationPressed(id);
    } else if (id === 'clear') {
      this.reset();
    } else if (id === 'equals') {
      this.equalsPressed();
    }
  };

  /**
   * Update the display string in global state
   */
  updateDisplay = num => {
    this.setState({ currentDisplay: num.toString() });
  };

  /**
   * Update the current operation in global state
   */
  setOperation = operation => {
    this.setState({ currentOperation: operation, isNewOp: true });
  };

  /**
   * Round display value in order to fit comfortably on display
   */
  roundDisplay = val => {
    let str = val.toString();
    if (!str.includes('.')) return val;

    console.log(str);
    const [integer, fractional] = str.split('.');
    console.log(integer, fractional);
    const decimalPlaces = Math.min(
      str.length - integer.length - 1,
      MAX_DISPLAY_CHARS - integer.length - 1
    );
    console.log(decimalPlaces);

    return (
      Math.round(parseFloat(str) * Math.pow(10, decimalPlaces)) /
      Math.pow(10, decimalPlaces)
    );
  };

  /**
   * Handle press event on 'number' buttons. This includes the
   * decimal '.'
   */
  numberPressed = num => {
    let currentDisplay = this.state.currentDisplay;

    // We're entering a new operation
    if (this.state.isNewOp) {
      currentDisplay = '';
      this.setState({ isNewOp: false });
    }

    // Ignore decimal if display already has a decimal
    if (num === '.' && currentDisplay.includes('.')) return;

    // If num is 0, ignore if display is already 0, otherwise clear display
    if (currentDisplay === '0') {
      if (num === '0') return;
      else currentDisplay = '';
    }

    this.setState({
      currentDisplay: `${currentDisplay}${num}`
    });
  };

  /**
   * Handle press event for operation button
   */
  operationPressed = operation => {
    this.performOperation(this.state.currentOperation);
    this.setOperation(operation);
  };

  /**
   * Handle press event for equals button
   */
  equalsPressed = () => {
    this.performOperation(this.state.currentOperation);
    this.setOperation(null);
  };

  /**
   * Perform the current operation
   */
  performOperation = operation => {
    // If we haven't entered a number for a new operation yet, ignore
    if (this.state.isNewOp) return;

    let newValue = this.state.savedValue;
    let currentValue = parseFloat(this.state.currentDisplay);

    switch (operation) {
      case ADD:
        newValue += currentValue;
        break;
      case SUBTRACT:
        newValue -= currentValue;
        break;
      case MULTIPLY:
        newValue *= currentValue;
        break;
      case DIVIDE:
        if (currentValue === 0) console.error('DIVIDE BY ZERO');
        newValue /= currentValue;
        break;
      case null:
        newValue = currentValue;
        break;
      default:
        break;
    }

    newValue = this.roundDisplay(newValue);

    this.setState({
      savedValue: newValue,
      currentDisplay: newValue.toString()
    });
  };

  render() {
    return (
      <div id='calculator-app'>
        <Display displayValue={this.state.currentDisplay} />
        <Keypad onButtonPress={this.onButtonPress} />
      </div>
    );
  }
}

export default CalculatorApp;
