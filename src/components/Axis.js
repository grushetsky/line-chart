import React, { Component, PropTypes } from 'react';

import '../styles/Axis.css';

class Axis extends Component {
  static propTypes = {
    chartWidth: PropTypes.number,
    chartHeight: PropTypes.number,
    horizontal: PropTypes.bool,
    domainKind: PropTypes.oneOf([`time`]),
    domainRange: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string
    }),
    ticks: PropTypes.arrayOf(PropTypes.object)
  }

  getCoordinates() {
    const { horizontal, chartWidth, chartHeight } = this.props;

    if (horizontal) {
      return {
        x1: 0,
        y1: chartHeight,
        x2: chartWidth,
        y2: chartHeight
      };
    } else {
      return {
        x1: 0,
        y1: chartHeight,
        x2: 0,
        y2: 0,
      };
    }
  }

  render() {
    const { horizontal } = this.props;

    const coordinates = this.getCoordinates();

    return (
      <g className="Axis">
        <line className={`Axis-${horizontal ? `x` : `y`}`} {...coordinates} />
      </g>
    );
  }
}

export default Axis;
