/**
 * WARNING! This is an experimental component!
 */
import React, { PropTypes, Component } from 'react';

import '../styles/AxisLabel.css';

import moment from 'moment';

// TODO Extract into constants
const labelLength = 20;
const yLabelOffset = 25;

class AxisLabel extends Component {
  static propTypes = {
    chartWidth: PropTypes.number,
    chartHeight: PropTypes.number,
    data: PropTypes.array,
    xStep: PropTypes.number
  }

  render() {
    const { data, chartWidth, chartHeight, xStep } = this.props;

    // TODO Extract this monstrous logic into a separate library that operates with time ranges!
    const period = data.reduce((result, dataItem, index) => {
      const monthId = moment(dataItem.time).month();
      const yearId = moment(dataItem.time).year();

      return {
        ...result,
        [yearId]: {
          ...(result[yearId] || {}),
          [monthId]: {
            title: moment(dataItem.time).format(`MMMM`),
            width: result[yearId] && result[yearId][monthId] && result[yearId][monthId].width ? result[yearId][monthId].width + xStep : xStep
          }
        }
      };
    }, {});

    const periodWithOffset = Object.keys(period).reduce((periodResult, yearId) => {
      const months = Object.keys(period[yearId]).map((monthId, index, monthIds) => {
        const xBase = !index ? 0 : monthIds.slice(0, index).reduce((result, id) => result + period[yearId][id].width, 0);
        const width = period[yearId][monthId].width;
        const xExpected = xBase + (width / 2) - (labelLength / 2);

        return {
          x: xExpected,
          xBase,
          width,
          title: period[yearId][monthId].title,
        }
      });

      const lastMonth = months[months.length - 1];

      return {
        ...periodResult,
        [yearId]: {
          ...(periodResult[yearId] || {}),
          months,
          offset: lastMonth.xBase + lastMonth.width
        }
      }
    }, {})

    return (
      <g>
        {Object.keys(periodWithOffset).map((yearId, yearIndex, yearArray) =>
          periodWithOffset[yearId].months.map((month, index, months) => {

            const yearOffset = !yearIndex ? 0 : periodWithOffset[yearArray[yearIndex - 1]].offset;

            // Do not show the month label that doesn't fit into viewport
            if (month.xBase + month.width + yearOffset >= chartWidth) {
              return null;
            }

            return <text className="AxisLabel-text" x={month.x + yearOffset} y={chartHeight + yLabelOffset}>{month.title}</text>;
          })
        )}
      </g>
    );
  }
}

export default AxisLabel;
