import React, { Component, PropTypes } from 'react';

import DiffText from './DiffText';

import '../../styles/InfoBox.css';

const indent = 15;
const boxWidth = 170;
const boxHeight = 75;
const cornerRadius = 5;
const xDatePadding = 15;
const yDatePadding = 30;
const yValuePadding = 27;

import { formatSum, formatDate } from '../../helpers';

class InfoBox extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    data: PropTypes.object
  }

  render() {
    const { data, x, y } = this.props;

    const xCol1 = x + xDatePadding;
    const xCol2 = x + xDatePadding + 80;
    const yRow1 = y - boxHeight - indent + yDatePadding;
    const yRow2 = yRow1 + yValuePadding;

    return (
      <g className="InfoBox">
        <rect className="InfoBox-rect" rx={cornerRadius} ry={cornerRadius} x={x} y={y - boxHeight - indent} width={boxWidth} height={boxHeight} filter="url(#shadow-filter)" />
        <text className="InfoBox-text-date" x={xCol1} y={yRow1}>{formatDate(data.time)}</text>
        <text className="InfoBox-text-value" x={xCol1} y={yRow2}>{formatSum(data.value, `$`)}</text>
        <DiffText x={xCol2} y={yRow2} value={data.diff} />
      </g>
    );
  }
}

export default InfoBox;
