/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-17 17:19:35
 * @LastEditTime: 2020-12-29 13:58:48
 * @FilePath: /huaJi/server/login/index.js
 */
const cloud = require('wx-server-sdk');
const { request } = require('./utils');
cloud.init({
  env: 'huaji-server-prod-2egmhbb1fd0438',
});
const db = cloud.database();
exports.main = async ({
  nickName,
  avatarUrl,
  gender,
  province,
  city,
  country,
  code,
}) => {
  try {
    // 获取用户的基础信息
    const { OPENID: openid, APPID: appid } = cloud.getWXContext();

    // 获取sessioinkey
    const result = await request(
      `https://api.weixin.qq.com/sns/jscode2session?appid=wx03f88b4c0cb89be9&secret=ecb4578f7bb1bc04679a079f4a870303&js_code=${code}&grant_type=authorization_code`,
    );
    const { session_key: sessionKey } = JSON.parse(result);

    // 查询用户是否存在，如果存在则是更新
    const { data: user } = await db
      .collection('tb_user')
      .where({
        openid,
      })
      .get();

    // 存储的数据
    const data = {
      nickName,
      avatarUrl,
      gender,
      province,
      city,
      country,
      openid,
      appid,
      sessionKey,
    };

    const collection = db.collection('tb_user');
    // 判断是更新还是新增
    if (user.length > 0) {
      const { _id, createTime } = user[0];
      await collection.doc(_id).update({
        data: { ...data, createTime, updateTime: new Date() },
      });
    } else {
      await collection.add({
        data: {
          ...data,
          monthMaxMoney: 0,
          createTime: new Date(),
          updateTime: new Date(),
        },
      });
    }
    return {
      code: 0,
      data,
      message: '成功',
    };
  } catch (e) {
    return {
      code: -1,
      message: '登录失败',
      data: null,
    };
  }
};
