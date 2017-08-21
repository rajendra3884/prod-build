import axios from 'axios';

export function sendSellerDetails(data){
  return dispatch => {
    return axios.post('/api/seller', data);
  };
};
