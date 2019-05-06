import React, { Component } from 'react';
import Display from './Display';
import Keypad from './Keypad';

const ADD = 'add';
const SUBTRACT = 'subtract';
const MULTIPLY = 'multiply';
const DIVIDE = 'divide';
const DEFAULT_OPERATION = ADD;

const MAX_DISPLAY_CHARS = 14;

export class CalculatorApp extends Component {
  constructor(props) {
    super(props);

    /* NOTE: savedValue is a number; displayText is string */
    this.state = {
      savedValue: 0,
      displayText: '0',
      currentOperation: DEFAULT_OPERATION,
      isNewOp: true
    };
  }

  setSavedValue = newValue => {
    this.setState({ savedValue: newValue });
  };

  /**
   * Update the display string in global state
   */
  setDisplayText = displayText => {
    displayText = this.roundDisplay(displayText);
    this.setState({ displayText });
  };

  /**
   * Update the current operation in global state
   */
  setOperation = operation => {
    this.setState({ currentOperation: operation, isNewOp: true });
  };

  /**
   * Reset to default state
   */
  reset = () => {
    this.setOperation(DEFAULT_OPERATION);
    this.setDisplayText('0');
    this.setSavedValue(0);
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
    let displayText = this.state.displayText;

    // We're entering a new operation
    if (this.state.isNewOp) {
      displayText = '';
      this.setState({ isNewOp: false });
    }

    // Ignore decimal if display already has a decimal
    if (num === '.' && displayText.includes('.')) return;

    // If num is 0, ignore if display is already 0, otherwise clear display
    if (displayText === '0') {
      if (num === '0') return;
      else displayText = '';
    }

    this.setDisplayText(displayText + num);

    // this.setState({
    //   displayText: `${displayText}${num}`
    // });
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
    this.setOperation(DEFAULT_OPERATION);
  };

  /**
   * Perform the current operation
   */
  performOperation = operation => {
    // If we haven't entered a number for a new operation yet, ignore
    if (this.state.isNewOp) return;

    let newValue = this.state.savedValue;
    let currentValue = parseFloat(this.state.displayText);

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
      // case null:
      // newValue = currentValue;
      // break;
      default:
        alert('UNKNOWN OPERATION');
        break;
    }

    // newValue = this.roundDisplay(newValue);

    this.setState({
      savedValue: newValue,
      displayText: newValue.toString()
    });
  };

  render() {
    return (
      <div id='calculator-app'>
        <Display displayValue={this.state.displayText} />
        <Keypad onButtonPress={this.onButtonPress} />
      </div>
    );
  }
}

export default CalculatorApp;
