import React, { Component, PropTypes } from 'react';

import SelectionDot from './SelectionDot';
import InfoBox from './InfoBox';
import ValueGuide from './ValueGuide';

import '../styles/Line.css';

import moment from 'moment';

class Line extends Component {
  state = {
    hoveredValue: {}
  }

  static propTypes = {
    data: PropTypes.array,
    xStep: PropTypes.number,
    maxHeight: PropTypes.number,
    chartHeight: PropTypes.number,
  }

  static defaultProps = {
    data: []
  }

  getCoordinatesFromData() {
    const { data, chartHeight, maxHeight, xStep } = this.props;

    return data.reduce((result, dataItem, index) => {
      const x = moment(dataItem.time).dayOfYear() * xStep;
      const y = ((maxHeight - dataItem.value) * chartHeight) / maxHeight;

      return [...result, { ...dataItem, x, y }];
    }, []);
  }

  composeLineExpression() {
    return this.getCoordinatesFromData().map(({ x, y }, index) => {
      return !index ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(` `);
  }

  render() {
    const { chartHeight } = this.props;

    return (
      <g className="Line">
        <path className="Line-path" d={this.composeLineExpression()} />
        {this.getCoordinatesFromData().map((dataItem, index) =>
          <g key={index}>
            {this.state.hoveredValue.index === index && <SelectionDot x={dataItem.x} y={dataItem.y} />}
            {this.state.hoveredValue.index === index && <InfoBox x={dataItem.x} y={dataItem.y} data={dataItem} />}
            <ValueGuide x={dataItem.x} y={dataItem.y} chartHeight={chartHeight} hovered={this.state.hoveredValue.index === index}
              onMouseOver={() => this.setState({ hoveredValue: { index, ...dataItem } })}
              onMouseLeave={() => this.setState({ hoveredValue: {} })} />
          </g>
        )}
      </g>
    );
  }
}

export default Line;
