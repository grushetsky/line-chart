import React, { Component, PropTypes } from 'react';

import '../styles/ValueGuide.css';

import cn from 'classnames';

const clickZoneWidth = 7;

class Line extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    chartHeight: PropTypes.number,
    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func,
    hovered: PropTypes.bool
  }

  render() {
    const { chartHeight, x, y, onMouseOver, onMouseLeave, hovered } = this.props;

    return (
      <g className="ValueGuide">
        <rect className="ValueGuide-click-target"
          x={x - (clickZoneWidth / 2)} y={y} width={clickZoneWidth} height={chartHeight - y}
          onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} />
        <line className={cn(`ValueGuide-line`, hovered && `ValueGuide-line-hovered`)}
          x1={x} y1={y} x2={x} y2={chartHeight} />
      </g>
    );
  }
}

export default Line;
