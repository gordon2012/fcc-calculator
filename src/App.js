import React, { Component } from 'react';

class App extends Component {
  state = {
    // display: '3+5*6-2/4'
    // display: '2+3*4' // should be 14, not 20
    display: '2+3*4-5' // should be 9, not 15
  };

  clear = () => {
    this.setState({
      display: '0'
    });
  };

  number = num => {
    // console.log(num);

    if (this.state.display == '0') {
      this.setState({ display: num });
    } else {
      this.setState({ display: `${this.state.display}${num}` });
    }
  };

  equals = () => {
    console.log(this.state.display);

    const add = (a, c) => {
      console.log('+', Number(a), Number(c), Number(a) + Number(c));
      return Number(a) + Number(c);
    };
    const sub = (a, c) => {
      console.log('-', Number(a), Number(c), Number(c) - Number(a));
      return Number(a) - Number(c);
    };
    const mlt = (a, c) => {
      console.log('*', Number(a), Number(c), Number(a) * Number(c));
      return Number(a) * Number(c);
    };
    const div = (a, c) => {
      console.log('/', Number(a), Number(c), Number(a) / Number(c));
      return Number(a) / Number(c);
    };

    // var val1 = this.state.display.split('+');
    // console.log(val1);
    // var val1_1 = val1.map(e => e.split('*').reduce(mlt, 1));
    // console.log(val1_1);
    // var val2 = val1_1.reduce(add, 0);

    // var val1 = this.state.display.split('+');
    // var val1_1 = this.state.display.split('+').map(e => e.split('*').reduce(mlt, 1));
    var val2 = this.state.display
      .split('+')
      .map(a =>
        a
          .split('-')
          .map(b => b.split('*').reduce(mlt, 1))
          .reduce(sub, 0)
      )
      .reduce(add, 0);

    // var val2 = val1.reduce(mlt, val1_1);
    // this.state.display.split('+').map(x => ).reduce(add, 0);

    console.log(val2);
  };

  render() {
    const buttons = [
      // { id: 'equals', display: '=', click: this.number },
      { id: 'zero', display: '0', click: this.number },
      { id: 'one', display: '1', click: this.number },
      { id: 'two', display: '2', click: this.number },
      { id: 'three', display: '3', click: this.number },
      { id: 'four', display: '4', click: this.number },
      { id: 'five', display: '5', click: this.number },
      { id: 'six', display: '6', click: this.number },
      { id: 'seven', display: '7', click: this.number },
      { id: 'eight', display: '8', click: this.number },
      { id: 'nine', display: '9', click: this.number },
      { id: 'add', display: '+', click: this.number },
      { id: 'subtract', display: '-', click: this.number },
      { id: 'multiply', display: '*', click: this.number },
      { id: 'divide', display: '/', click: this.number },
      { id: 'decimal', display: '.', click: this.number },
      { id: 'clear', display: 'C', click: this.clear }
    ];
    return (
      <div className="App">
        <div>
          <div id="display">{this.state.display}</div>

          <button id="equals" onClick={this.equals}>
            =
          </button>

          {buttons.map(button => (
            <button
              key={button.id}
              id={button.id}
              onClick={button.click.bind(this, button.display)}
            >
              {button.display}
            </button>
          ))}

          {/* <button id="equals">=</button>
          <button id="zero">0</button>
          <button id="one" onClick={this.number.bind(this, 1)}>
            1
          </button>
          <button id="two">2</button>
          <button id="three">3</button>
          <button id="four">4</button>
          <button id="five">5</button>
          <button id="six">6</button>
          <button id="seven">7</button>
          <button id="eight">8</button>
          <button id="nine">9</button>
          <button id="add">+</button>
          <button id="subtract">-</button>
          <button id="multiply">*</button>
          <button id="divide">/</button>
          <button id="decimal">.</button>
          <button id="clear" onClick={this.clear}>
            C
          </button> */}
        </div>
      </div>
    );
  }
}

export default App;
