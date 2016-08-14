import React, { Component } from 'react';

import LineChart from './components/LineChart';
import Line from './components/Line';

import './styles/App.css';

import chart from './constants/LineChart';

import data from './mock/data';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Time-based Line Chart</h2>
        </div>
        <div className="App-body">
          <LineChart width={chart.width} height={chart.height} yGridStep={chart.yGridStep} range={chart.range} data={data}>
            <Line />
          </LineChart>
        </div>
      </div>
    );
  }
}

export default App;
