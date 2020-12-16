/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-15 19:57:27
 * @LastEditTime: 2020-12-16 16:02:01
 * @FilePath: /huaJi/server/test/index.js
 */
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  };
};
