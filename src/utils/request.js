import {fetch} from 'dva';
import * as auth from '../services/auth'

const url = 'http://quran-api.devforislam.xyz/api';


export const getReqOption = () => (
  { 
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + auth.getToken()
    },  
  }
);

let reqOptions = getReqOption();

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} reqUrl       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(reqUrl, options) {
  const defaultOptions = getReqOption();
  options = {...defaultOptions, ...options};
  console.log(reqUrl, options);

  return fetch(reqUrl, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ( data ))
    .catch(err => ({ err }));
}

export {reqOptions, url};
