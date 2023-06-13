import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;
const MOMO_USER_URL = process.env.REACT_APP_MOMO_API_USER_URL;
const USER_TOKEN_URL = process.env.REACT_APP_TOKEN_URL;

const SubscriptionService = {
  getRates: () => axios.get(`${API_URL}api/v1/subscriptions/getRates`, authHeader()),
  getSubscriptions: (userId, page, perPage) => axios.get(`${API_URL}api/v1/subscriptions/getSubscriptions/${userId}/${page}/${perPage}`, authHeader()),
  addSubscription: (subscription) => axios.post(`${API_URL}api/v1/subscriptions/addSubscription`, subscription, authHeader()),
  addAPIUser: (header, data) => axios.post(`${MOMO_USER_URL}`, data, header),
  getAPIUser: (refid, header) => axios.get(`${MOMO_USER_URL}/${refid}`, header),
  getAPIKey: (refId, header) => axios.post(`${MOMO_USER_URL}/${refId}/apikey`, header),
  getToken: (header) => axios.post(`${USER_TOKEN_URL}`, header),
  //   addAPIUser: (header, data) => {
  //     const requestOptions = {
  //       method: 'post',
  //       url: MOMO_USER_URL,
  //       body: data,
  //       headers: header,
  //       mode: 'no-cors',
  //     };

//     return axios(requestOptions);
//   },
};

export default SubscriptionService;
