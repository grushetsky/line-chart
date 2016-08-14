import React, { PropTypes, Component } from 'react';

import Axis from './Axis';
import Grid from './Grid';

import '../styles/LineChart.css';

import moment from 'moment';

// TODO Extract into constants
const rangeInDays = 366;

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
    domainRange: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string
    }),
    yStep: PropTypes.number
  }

  static defaultProps = {
    data: [],
    domainRange: {
      from: moment().subtract(1, `year`).format(),
      to: moment().format()
    },
    yStep: 2000
  }

  render() {
    const { width, height, xAxis, yAxis, domainRange, data, yStep, children } = this.props;

    const maxValue = Math.max(...data.map(dataItem => dataItem.value));
    const maxHeight = maxValue - (maxValue % yStep) + yStep;

    return (
      <svg className="LineChart" width={width} height={height} viewBox={`-20 -50 ${width} ${height + 50}`} version="1.1">
        <defs>
          <filter id="shadow-filter">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="1" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {xAxis && <Axis chartWidth={width} chartHeight={height} domainRange={domainRange} horizontal />}
        {yAxis && <Axis chartWidth={width} chartHeight={height} />}
        <Grid chartWidth={width} chartHeight={height} maxHeight={maxHeight} />
        {React.Children.map(children, child =>
          React.cloneElement(child, { ...child.props, data, maxHeight, chartHeight: height, xStep: width / rangeInDays })
        )}
      </svg>
    );
  }
}

export default LineChart;
