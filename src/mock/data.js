import moment from 'moment';

import { getRandomNumber } from '../helpers';

const days = 50;

const data = Array.from({ length: days }, (k, dasyCount) => ({
  value: getRandomNumber(6000, 6700),
  time: moment().subtract(1, `year`).add(dasyCount, `days`).format()
})).reduce((result, dataItem, index, array) => [
  ...result,
  { ...dataItem, diff: !index ? 0 : dataItem.value - array[index - 1].value }
], []);

export default data;
