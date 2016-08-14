import moment from 'moment';

import chart from '../constants/LineChart';

import { getRandomNumber } from '../helpers';

const days = chart.range.to;
const sumRange = {
  from: 5900,
  to: 6500
};

const randomData = Array.from({ length: days }, (k, daysCount) => ({
  value: getRandomNumber(sumRange.from, sumRange.to),
  time: moment().subtract(1, `year`).add(daysCount, `days`).format()
})).reduce((result, dataItem, index, array) => [
  ...result,
  { ...dataItem, diff: !index ? 0 : dataItem.value - array[index - 1].value }
], []);

export default randomData;
