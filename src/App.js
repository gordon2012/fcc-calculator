import React, { Component } from 'react';
import * as math from 'mathjs';
window.math = math;

class App extends Component {
  state = {
    display: '0'
  };

  handleButton = btn => {
    if (btn === 'C') {
      this.clear();
      return;
    }

    if (btn === '=') {
      this.equals();
      return;
    }

    if (this.state.display === '0') {
      if (btn === '.') {
        this.setState({ display: '0.' });
      } else {
        this.setState({ display: btn });
      }
      return;
    }

    // new op erases previous
    if (/[+\-*/]+/.test(this.state.display.slice(-1))) {
      if (/[+\-*/]+/.test(btn)) {
        this.setState({ display: `${this.state.display.slice(0, -1)}${btn}` });
        return;
      }
    }

    if (btn === '.') {
      // no dot already
      if (
        this.state.display
          .split(/[+\-*/]+/)
          .pop()
          .split('.').length < 2
      ) {
        this.setState({ display: `${this.state.display}${btn}` });
      }
      return;
    }

    // survived all that, must be a number
    this.setState({ display: `${this.state.display}${btn}` });
  };

  clear = () => {
    this.setState({
      display: '0'
    });
  };

  equals = () => {
    this.setState({ display: String(math.eval(this.state.display)) });
  };

  render() {
    const buttons = [
      { id: 'clear', display: 'C' },
      { id: 'divide', display: '/' },
      { id: 'multiply', display: '*' },
      { id: 'subtract', display: '-' },
      { id: 'seven', display: '7' },
      { id: 'eight', display: '8' },
      { id: 'nine', display: '9' },
      { id: 'add', display: '+' },
      { id: 'four', display: '4' },
      { id: 'five', display: '5' },
      { id: 'six', display: '6' },
      { id: 'one', display: '1' },
      { id: 'two', display: '2' },
      { id: 'three', display: '3' },
      { id: 'equals', display: '=' },
      { id: 'zero', display: '0' },
      { id: 'decimal', display: '.' }
    ];
    return (
      <div className="App">
        <div id="calculator">
          <div id="display">{this.state.display}</div>
          {buttons.map(btn => (
            <button
              key={btn.id}
              id={btn.id}
              onClick={this.handleButton.bind(this, btn.display)}
            >
              {btn.display}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
