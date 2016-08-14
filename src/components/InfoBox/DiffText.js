import React, { Component, PropTypes } from 'react';

import '../../styles/InfoBox.css';

import { formatSum } from '../../helpers';

const iconPoints = {
  higher: `0,10 6,0 12,10`,
  lower: `0,0 6,10 12,0`,
  stable: `0,0 0,10 12,10 12,0`
};

class InfoBox extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    value: PropTypes.number
  }

  selectClassType() {
    const { value } = this.props;

    if (value > 0) {
      return `higher`;
    } else if (value < 0) {
      return `lower`;
    } else {
      return `stable`;
    }
  }

  render() {
    const { value, x, y } = this.props;
    const classKind = this.selectClassType();

    return (
      <g className={`InfoBox-diff-${classKind}`} transform={`translate(${x},${y - 10})`}>
        <polygon points={iconPoints[classKind]} />
        <text x={18} y={10}>{formatSum(Math.abs(value))}</text>
      </g>
    );
  }
}

export default InfoBox;
