import React, { Component, PropTypes } from 'react';

import '../styles/SelectionDot.css';

const radius = 6;

class SelectionDot extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number
  }

  render() {
    const { x, y } = this.props;

    return (
      <g className="SelectionDot">
        <circle className="SelectionDot-circle" cx={x} cy={y} r={radius} />
      </g>
    );
  }
}

export default SelectionDot;
