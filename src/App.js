import React, { Component } from 'react';
import * as math from 'mathjs';
window.math = math;

class App extends Component {
  state = {
    // display: '3+5*6-2/4' // 32.5, not 11.5
    // display: '2+3*4' // 14, not 20
    // display: '2+3*4-5' // 9, not 15
    display: '1+2-3.14'
  };

  clear = () => {
    this.setState({
      display: '0'
    });
  };

  number = num => {
    // console.log(num);
    // var display = this.state.display;
    // const lastIsOp = /[+\-*/]+/.test(this.state.display.slice(-1));
    // var last = display.slice(-1);

    // just been cleared or initial
    // TODO: disallow operators?
    if (this.state.display == '0') {
      if (num == '.') {
        this.setState({ display: '0.' });
      } else {
        this.setState({ display: num });
      }
      return;
    }
    console.log(this.state.display);
    const lastIsOp = /[+\-*/]+/.test(this.state.display.slice(-1));
    if (lastIsOp) {
      // if incoming is op, erase previous
      if (/[+\-*/]+/.test(num)) {
        this.setState({ display: `${this.state.display.slice(0, -1)}${num}` });
        return;
      } /*else {*/
      // this.setState({ display: `${this.state.display}${num}` });

      // TODO: check for dot?
    }

    if (num == '.') {
      // no dot already
      var prevNum = this.state.display.split(/[+\-*/]+/).pop();
      // console.log(prevNum.split('.').length);
      if (
        this.state.display
          .split(/[+\-*/]+/)
          .pop()
          .split('.').length < 2
      ) {
        this.setState({ display: `${this.state.display}${num}` });
        // return;
      }
      return;
    }

    // survived, must be a number
    this.setState({ display: `${this.state.display}${num}` });

    // if (this.state.display == '0' || lastIsOp) {
    //   if (num == '.') {
    //     this.setState({ display: `${this.state.display}.` });
    //   } else {
    //     this.setState({ display: num });
    //   }
    // } else {
    //   if (num == '.') {
    //     console.log(this.state.display);
    //     //'1+2-3/4*5'.split(/[+-/*]+/)
    //     //'1+2-3/4*5333.1'.split(/[+\-*/]+/).pop().split('.').length
    //     if (
    //       this.state.display
    //         .split(/[+\-*/]+/)
    //         .pop()
    //         .split('.').length < 1
    //     ) {
    //       // if (this.state.display.slice(-1) != '.') {
    //       this.setState({ display: `${this.state.display}${num}` });
    //     }
    //   } else {
    //     this.setState({ display: `${this.state.display}${num}` });
    //   }
    // }
  };

  equals = () => {
    // this.setState({ display: math.eval(this.state.display) }, () => {
    //   window.state = this.state;
    // });

    this.setState({ display: String(math.eval(this.state.display)) }, () => {
      window.state = this.state;
    });

    // this.setState({ display: String(math.eval(this.state.display)) });
    // this.state.display.split('+').map(x => ).reduce(add, 0);
    return;
    console.log(math.eval(this.state.display));
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
