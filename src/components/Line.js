import React, { Component, PropTypes } from 'react';

import '../styles/Line.css';

import moment from 'moment';

class Line extends Component {
  static propTypes = {
    data: PropTypes.array,
    xStep: PropTypes.number,
    maxHeight: PropTypes.number,
    chartHeight: PropTypes.number,
  }

  static defaultProps = {
    data: []
  }

  composeLineExpression() {
    const { data, chartHeight, maxHeight, xStep } = this.props;

    return data.reduce((result, dataItem, index) => {
      const x = moment(dataItem.time).dayOfYear() * xStep;
      const y = ((maxHeight - dataItem.value) * chartHeight) / maxHeight;

      if (!index) {
        return [`M ${x} ${y}`]
      } else {
        return [...result, `L ${x} ${y}`]
      }
    }, []).join(` `);
  }

  render() {
    return (
      <g className="Line">
        <path className="Line-path" d={this.composeLineExpression()} />
      </g>
    );
  }
}

export default Line;
