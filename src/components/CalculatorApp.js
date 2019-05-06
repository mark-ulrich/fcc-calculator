import React, { Component } from 'react';
import Display from './Display';
import Keypad from './Keypad';

const ADD = 'add';
const SUBTRACT = 'subtract';
const MULTIPLY = 'multiply';
const DIVIDE = 'divide';

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

  // componentWillUpdate() {
  //   console.log(
  //     'TCL: CalculatorApp -> componentWillUpdate -> savedValue',
  //     this.state.savedValue
  //   );
  // }

  // componentDidMount() {
  //   console.log(
  //     'TCL: CalculatorApp -> componentDidMount -> savedValue',
  //     this.state.savedValue
  //   );
  //   console.log(
  //     'TCL: CalculatorApp -> componentDidMount -> currentDisplay',
  //     this.state.currentDisplay
  //   );
  // }

  // componentDidUpdate() {
  //   console.log(
  //     'TCL: CalculatorApp -> componentDidUpdate -> savedValue',
  //     this.state.savedValue
  //   );
  //   console.log(
  //     'TCL: CalculatorApp -> componentDidUpdate -> currentDisplay',
  //     this.state.currentDisplay
  //   );
  // }

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
   * on the type of the button which was pressed.
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

  setOperation = operation => {
    this.setState({ currentOperation: operation, isNewOp: true });
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

  operationPressed = operation => {
    this.performOperation(this.state.currentOperation);
    this.setOperation(operation);
  };

  equalsPressed = () => {
    this.performOperation(this.state.currentOperation);
    this.setOperation(null);
  };

  performOperation = operation => {
    if (this.state.isNewOp) return;

    let newValue = this.state.savedValue;
    let currentValue = parseFloat(this.state.currentDisplay);

    console.log('Performing operation: ', this.state.currentOperation);
    console.log('TCL: CalculatorApp -> newValue', newValue);
    console.log('TCL: CalculatorApp -> currentValue', currentValue);

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
        console.log('in null');
        newValue = currentValue;
        break;
      default:
        break;
    }

    console.log('TCL: CalculatorApp -> newValue', newValue);

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
