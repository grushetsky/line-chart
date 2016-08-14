import React, { Component } from 'react';

import LineChart from './components/LineChart';
import Line from './components/Line';

import './styles/App.css';

import data from './mock/data';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Line Chart</h2>
        </div>
        <div className="App-body">
          <LineChart width={800} height={400} data={data}>
            <Line />
          </LineChart>
        </div>
      </div>
    );
  }
}

export default App;
