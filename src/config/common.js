import {restApiSettings} from './api'
import axios from 'axios';

export const jsonQuery = function (path, cbk, method, data) {
    query(
      path,
      cbk,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data)
      },
    );
};

export const query = function (path, cbk, options = {}) {
    if (!options.headers) {
        options.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        };
    }

    options.headers = options.headers || {};

    const request = {
        method: options.method ? options.method : 'get',
        headers: {...options.headers},
        body: options.body,
        timeout: restApiSettings.timeout,
    };

    axios({
        method: request.method,
        url: path,
        headers: request.headers,
        data: options.body
    }).then(cbk.success).catch(cbk.error);
};