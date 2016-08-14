import React, { Component, PropTypes } from 'react';

import '../styles/InfoBox.css';

const indent = 15;
const boxWidth = 200;
const boxHeight = 75;
const cornerRadius = 5;
const xDatePadding = 15;
const yDatePadding = 30;
const yValuePadding = 25;

import moment from 'moment';
moment.locale(`ru`);

class InfoBox extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    data: PropTypes.object
  }

  render() {
    const { data, x, y } = this.props;

    return (
      <g className="InfoBox">
        <rect className="InfoBox-rect" rx={cornerRadius} ry={cornerRadius} x={x} y={y - boxHeight - indent} width={boxWidth} height={boxHeight} />
        <text className="InfoBox-text-date" x={x + xDatePadding} y={y - boxHeight - indent + yDatePadding}>{moment(data.time).format(`DD MMMM YYYY`)}</text>
        <text className="InfoBox-text-value" x={x + xDatePadding} y={y - boxHeight - indent + yDatePadding + yValuePadding}>{`$ ${(data.value / 100).toFixed(2)}`.replace(`.`, `,`)}</text>
      </g>
    );
  }
}

export default InfoBox;
