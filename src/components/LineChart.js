import React, { PropTypes, Component } from 'react';

import Axis from './Axis';
import Grid from './Grid';
import ShadowFilter from './InfoBox/ShadowFilter';

import '../styles/LineChart.css';

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
    range: PropTypes.shape({
      from: PropTypes.number,
      to: PropTypes.number,
      kind: PropTypes.oneOf([`hours`, `days`, `weeks`])
    }),
    yGridStep: PropTypes.number
  }

  static defaultProps = {
    data: []
  }

  render() {
    const { width, height, xAxis, yAxis, range, data, yGridStep, children } = this.props;

    const maxValue = Math.max(...data.map(dataItem => dataItem.value));
    const maxHeight = maxValue - (maxValue % yGridStep) + yGridStep;

    return (
      <svg className="LineChart" width={width} height={height} viewBox={`-20 -50 ${width} ${height + 50}`} version="1.1">
        <ShadowFilter />
        {xAxis && <Axis chartWidth={width} chartHeight={height} domainRange={{ from: range.from, to: range.to }} horizontal />}
        {yAxis && <Axis chartWidth={width} chartHeight={height} />}
        <Grid chartWidth={width} chartHeight={height} maxHeight={maxHeight} yStep={yGridStep} />
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            ...child.props, data, maxHeight,
            chartHeight: height, chartWidth: width,
            xStep: width / range.to
          })
        )}
      </svg>
    );
  }
}

export default LineChart;
