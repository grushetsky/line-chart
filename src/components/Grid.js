import React, { Component, PropTypes } from 'react';

import '../styles/Grid.css';

class Grid extends Component {
  static propTypes = {
    chartWidth: PropTypes.number,
    chartHeight: PropTypes.number,
    maxHeight: PropTypes.number,
    yStep: PropTypes.number
  }

  render() {
    const { chartWidth, chartHeight, maxHeight, yStep } = this.props;

    const segmentsCount = Math.round(maxHeight / yStep);
    const lines = Array.from({ length: segmentsCount + 1 }, (value, index) => ({
        text: `${(index * yStep) / 100}`,
        height: ((segmentsCount - index) * yStep * chartHeight) / maxHeight
      })
    ).reverse();

    return (
      <g className="Grid">
        {lines.map((lineItem, index) =>
          <g key={index}>
            <line className="Grid-line" x1="0" y1={lineItem.height} x2={chartWidth} y2={lineItem.height} />
            <text className="Grid-text" textAnchor="end" x="-18" y={lineItem.height - 2}>{lineItem.text}</text>
          </g>
        )}
      </g>
    );
  }
}

export default Grid;
