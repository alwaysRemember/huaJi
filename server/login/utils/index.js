/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-17 19:48:50
 * @LastEditTime: 2020-12-17 20:04:15
 * @FilePath: /huaJi/server/login/utils/index.js
 */
const request = require('request');

exports.request = async url => {
  return new Promise((res, rej) => {
    request(url, (err, response, body) => {
      if (err) {
        rej(err);
      } else {
        res(body);
      }
    });
  });
};
