import axios from 'axios';

const { protocol, hostname } = location;
axios.defaults.baseURL = `${protocol}//${hostname}:10010/`;
axios.defaults.withCredentials = true;

export function get(path) {
  return axios.get(path).then(res => {
    return res.data.data;
  }).catch(res => {
    // TODO:
  });

}