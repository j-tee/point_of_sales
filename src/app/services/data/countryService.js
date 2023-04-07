import axios from 'axios';

const getCountries = () => axios.post(
  'https://restcountries.com/v2/all',
  {
    contentType: 'application/json',
  },
);

export default getCountries;
