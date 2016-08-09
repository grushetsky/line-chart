import React, { Component } from 'react';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Line Chart</h2>
        </div>
        <div className="App-body">
        <svg viewBox="0 0 500 100" class="chart">
          <polyline
             fill="none"
             stroke="#0074d9"
             stroke-width="2"
             points="
               00,120
               20,60
               40,80
               60,20
               80,80
               100,80
               120,60
               140,100
               160,90
               180,80
               200, 110
               220, 10
               240, 70
               260, 100
               280, 100
               300, 40
               320, 0
               340, 100
               360, 100
               380, 120
               400, 60
               420, 70
               440, 80" />
          </svg>
        </div>
      </div>
    );
  }
}

export default App;
