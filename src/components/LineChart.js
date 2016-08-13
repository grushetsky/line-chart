import React, { PropTypes, Component } from 'react';

import Axis from './Axis';
import Grid from './Grid';

import '../styles/LineChart.css';

import moment from 'moment';

class LineChart extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    data: PropTypes.array,
    xAxis: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]),
    yAxis: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]),
    domainRange: React.PropTypes.shape({
      from: React.PropTypes.string,
      to: React.PropTypes.string
    }),
  }

  static defaultProps = {
    data: [],
    domainRange: {
      from: moment().subtract(1, `year`).format(),
      to: moment().format()
    }
  }

  render() {
    const { width, height, xAxis, yAxis, domainRange, data, children } = this.props;

    return (
      <svg className="LineChart" width={width} height={height} viewBox={`-20 -10 ${width} ${height + 20}`} version="1.1">
        {xAxis && <Axis chartWidth={width} chartHeight={height} domainRange={domainRange} horizontal />}
        {yAxis && <Axis chartWidth={width} chartHeight={height} />}
        <Grid chartWidth={width} chartHeight={height} maxValue={Math.max(...data.map(dataItem => dataItem.value))} />
        {children}
      </svg>
    );
  }
}

export default LineChart;
