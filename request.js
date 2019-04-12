import axios from 'axios';
import openNotification from './noticeFilter';

const { href } = window.location;
const store = {
  token: 'user_token',
};

const serviceUrl = `http://${href.split('/')[2]}`;

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
  openNotification('error', error.code);
  Promise.reject(error);
});

export function CommonRequest(data, api, solve) {
  if (api.method === 'get') {
    return new Promise((resolve, reject) => {
      axios.get(serviceUrl + api.url, {
        params: data,
      }).then((response) => {
        if (response.data.code === 200) {
          resolve(response.data);
        } else if (solve) {
          resolve(response.data);
        } else {
          if (response.data.message) {
            openNotification('error', null, response.data.message);
          } else {
            openNotification('error', null, response.data.status);
          }
          reject();
        }
      }).catch((error) => {
        openNotification('error', error.code, null, api.desc);
      });
    });
  }
  return new Promise((resolve, reject) => {
    XHR({
      url: serviceUrl + api.url,
      method: api.method,
      data,
    }).then((response) => {
      if (response.data.code === 200) {
        resolve(response.data);
      } else if (solve) {
        resolve(response.data);
      } else {
        if (response.data.message) {
          openNotification('error', null, response.data.message);
        } else {
          openNotification('error', null, response.data.status);
        }
        reject();
      }
    }).catch((error) => {
      openNotification('error', error.code, null, api.desc);
    });
  });
}

export function postData(data, api, solve) {
  return new Promise((resolve, reject) => {
    XHR({
      url: serviceUrl + api.url,
      method: 'post',
      data,
    }).then((response) => {
      if (response.data.code === 200) {
        resolve(response.data);
      } else if (solve) {
        resolve(response.data);
      } else {
        if (response.data.message) {
          openNotification('error', null, response.data.message, api.desc);
        } else {
          openNotification('error', response.data.code, null, api.desc);
        }
        reject();
      }
    }).catch((error) => {
      openNotification('error', error.code, null, api.desc);
    });
  });
}

export function statisticsPostData(data, api, solve) {
  return new Promise((resolve, reject) => {
    XHR({
      url: serviceUrl + api.url,
      method: 'post',
      data,
    }).then((response) => {
      if (response.data.status === 'success') {
        resolve(response.data);
      } else if (solve) {
        resolve(response.data);
      } else {
        if (response.data.message) {
          openNotification('error', null, response.data.message);
        } else if (response.data.status) {
          openNotification('error', null, response.data.status);
        } else {
          openNotification('error', null, response.data.code);
        }
        reject();
      }
    }).catch((error) => {
      openNotification('error', error.code, null, api.desc);
    });
  });
}
