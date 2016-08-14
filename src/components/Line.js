import React, { Component, PropTypes } from 'react';

import SelectionDot from './SelectionDot';
import InfoBox from './InfoBox';
import ValueGuide from './ValueGuide';

import '../styles/Line.css';

import infoBox from '../constants/InfoBox';

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
      const x = index * xStep;
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
    const { chartHeight, chartWidth } = this.props;

    return (
      <g className="Line">
        <path className="Line-path" d={this.composeLineExpression()} />
        {this.getCoordinatesFromData().map((dataItem, index) => {
          const xInfoBox = chartWidth - dataItem.x - infoBox.width < infoBox.xMargin ? chartWidth - infoBox.width : dataItem.x;
          const yInfoBox = dataItem.y - infoBox.height - infoBox.yPointIndent < infoBox.yMargin ? infoBox.yMargin : dataItem.y - infoBox.height - infoBox.yPointIndent;

          const isValueHovered = this.state.hoveredValue.index === index;

          return (
            <g key={index}>
              {isValueHovered && <SelectionDot x={dataItem.x} y={dataItem.y} />}
              {isValueHovered &&
                <InfoBox x={xInfoBox} y={yInfoBox}
                  width={infoBox.width} height={infoBox.height}
                  cornerRadius={infoBox.cornerRadius} data={dataItem} />
              }
              <ValueGuide x={dataItem.x} y={dataItem.y} chartHeight={chartHeight} hovered={isValueHovered}
                onMouseOver={() => this.setState({ hoveredValue: { index, ...dataItem } })}
                onMouseLeave={() => this.setState({ hoveredValue: {} })} />
            </g>
          )
        })}
      </g>
    );
  }
}

export default Line;
