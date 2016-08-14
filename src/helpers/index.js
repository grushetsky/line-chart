import moment from 'moment';
moment.locale(`ru`);

export const formatSum = (value, currency) => `${currency ? `${currency} ` : ``}${(value / 100).toFixed(2)}`.replace(`.`, `,`);

export const formatDate = (value) => moment(value).format(`DD MMMM YYYY`);

export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
