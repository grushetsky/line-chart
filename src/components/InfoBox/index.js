import React, { Component, PropTypes } from 'react';

import DiffText from './DiffText';

import '../../styles/InfoBox.css';

import { formatSum, formatDate } from '../../helpers';

import infoBox from '../../constants/InfoBox';
const padding = infoBox.padding;

class InfoBox extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    cornerRadius: PropTypes.number,
    data: PropTypes.object
  }

  render() {
    const { data, x, y, width, height, cornerRadius } = this.props;

    const xCol1 = x + padding.xCol1;
    const xCol2 = xCol1 + padding.xCol2;
    const yRow1 = y + padding.yRow1;
    const yRow2 = yRow1 + padding.yRow2;

    return (
      <g className="InfoBox">
        <rect className="InfoBox-rect" x={x} y={y} filter="url(#shadow-filter)"
          width={width} height={height} rx={cornerRadius} ry={cornerRadius} />
        <text className="InfoBox-text-date" x={xCol1} y={yRow1}>{formatDate(data.time)}</text>
        <text className="InfoBox-text-value" x={xCol1} y={yRow2}>{formatSum(data.value, `$`)}</text>
        <DiffText x={xCol2} y={yRow2} value={data.diff} />
      </g>
    );
  }
}

export default InfoBox;
