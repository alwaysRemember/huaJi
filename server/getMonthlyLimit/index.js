/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-24 14:32:25
 * @LastEditTime: 2021-01-12 16:29:02
 * @FilePath: /huaJi/server/getMonthlyLimit/index.js
 */
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'huaji-server-prod-2egmhbb1fd0438',
});
const db = cloud.database();
exports.main = async ({ page, currentDate }) => {
  try {
    const { OPENID: openid } = await cloud.getWXContext();

    // 判断当前用户是否存在
    let { data: resultUser } = await db
      .collection('tb_user')
      .where({
        openid,
      })
      .get();
    if (resultUser.length) {
      const { monthMaxMoney } = resultUser[0];
      return {
        code: 0,
        message: '成功',
        data: {
          limit: monthMaxMoney,
        },
      };
    } else {
      return {
        code: -2,
        message: '未登录',
        data: null,
      };
    }
  } catch (e) {
    return {
      code: -1,
      message: e,
      data: null,
    };
  }
};
