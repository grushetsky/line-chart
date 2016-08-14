import React, { Component, PropTypes } from 'react';

import '../styles/Grid.css';

class Grid extends Component {
  static propTypes = {
    chartWidth: PropTypes.number,
    chartHeight: PropTypes.number,
    maxHeight: PropTypes.number,
    step: PropTypes.number
  }

  static defaultProps = {
    step: 2000
  }

  render() {
    const { chartWidth, chartHeight, maxHeight, step } = this.props;

    const segmentsCount = Math.round(maxHeight / step);
    const lines = Array.from({ length: segmentsCount + 1 }, (value, index) => (
        { text: `${(index * step) / 100}`, height: ((segmentsCount - index) * step * chartHeight) / maxHeight }
      )
    ).reverse();

    return (
      <g className="Grid">
        {lines.map((lineItem, index) =>
          <g key={index}>
            <line className="Grid-line" stroke="#e5e7e9" strokeWidth="2" strokeLinecap="round" x1="0" y1={lineItem.height} x2={chartWidth} y2={lineItem.height} />
            <text textAnchor="end" x="-18" y={lineItem.height - 2} fill="#afb4ba">{lineItem.text}</text>
          </g>
        )}
      </g>
    );
  }
}

export default Grid;
