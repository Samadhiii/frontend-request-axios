import axios from 'axios';

const { href } = window.location;
const store = {
  token: 'user_token',
};

const serviceUrl = `http://${href.split('/')[2]}`; // service addr

const XHR = axios.create({
  baseURl: '',
  timeout: 30e3,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  // withCredentials: true,
  validateStatus(status) {
    return status >= 200 && status < 300; // default
  },
});

XHR.interceptors.request.use((request) => {
  if (store.token === 'user') {
    request.headers['X-Token'] = store.token;
  }
  return request;
}, (error) => {
  // 提示报错，终止promise
  alert(error.message);
  Promise.reject(error);
});

// api: {
//   url: '',  api url
//   methos: '',  request method
// }

export function CommonRequest(data, api, solve) {
  if (api.method === 'get') {
    return new Promise((resolve, reject) => {
      axios.get(`${serviceUrl}${api.url}`, {
        params: data,
      }).then((response) => {
        if (response.data.code === 200) {
          resolve(response.data);
        } else if (solve) {
          resolve(response.data);
        } else {
          alert(response.data.message);
          reject(response.data.message);
        }
      }).catch((error) => {
        alert(error.message);
      });
    });
  }
  return new Promise((resolve, reject) => {
    XHR({
      url: `${serviceUrl}${api.url}`,
      method: api.method,
      data,
    }).then((response) => {
      if (response.data.code === 200) {
        resolve(response.data);
      } else if (solve) {
        resolve(response.data);
      } else {
        alert(response.data.message);
        reject(response.data.message);
      }
    }).catch((error) => {
      alert(error.message);
    });
  });
}

