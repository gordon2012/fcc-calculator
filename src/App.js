import React, { Component } from 'react';
import * as math from 'mathjs';
window.math = math;

class App extends Component {
  state = {
    display: '0'
  };

  clear = () => {
    this.setState({
      display: '0'
    });
  };

  number = num => {
    if (this.state.display === '0') {
      if (num === '.') {
        this.setState({ display: '0.' });
      } else {
        this.setState({ display: num });
      }
      return;
    }

    // new op erases previous
    if (/[+\-*/]+/.test(this.state.display.slice(-1))) {
      if (/[+\-*/]+/.test(num)) {
        this.setState({ display: `${this.state.display.slice(0, -1)}${num}` });
        return;
      }
    }

    if (num === '.') {
      // no dot already
      if (
        this.state.display
          .split(/[+\-*/]+/)
          .pop()
          .split('.').length < 2
      ) {
        this.setState({ display: `${this.state.display}${num}` });
      }
      return;
    }

    // survived all that, must be a number
    this.setState({ display: `${this.state.display}${num}` });
  };

  equals = () => {
    this.setState({ display: String(math.eval(this.state.display)) });
  };

  render() {
    const numberButtons = [
      { id: 'zero', display: '0' },
      { id: 'one', display: '1' },
      { id: 'two', display: '2' },
      { id: 'three', display: '3' },
      { id: 'four', display: '4' },
      { id: 'five', display: '5' },
      { id: 'six', display: '6' },
      { id: 'seven', display: '7' },
      { id: 'eight', display: '8' },
      { id: 'nine', display: '9' },
      { id: 'add', display: '+' },
      { id: 'subtract', display: '-' },
      { id: 'multiply', display: '*' },
      { id: 'divide', display: '/' },
      { id: 'decimal', display: '.' }
    ];
    return (
      <div className="App">
        <div>
          <div id="display">{this.state.display}</div>
          <button id="equals" onClick={this.equals}>
            =
          </button>
          {numberButtons.map(button => (
            <button
              key={button.id}
              id={button.id}
              onClick={this.number.bind(this, button.display)}
            >
              {button.display}
            </button>
          ))}
          <button id="clear" onClick={this.clear}>
            =
          </button>
        </div>
      </div>
    );
  }
}

export default App;
