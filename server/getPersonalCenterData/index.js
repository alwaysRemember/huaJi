/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-29 14:02:00
 * @LastEditTime: 2021-01-11 17:06:22
 * @FilePath: /huaJi/server/getPersonalCenterData/index.js
 */
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'huaji-server-prod-2egmhbb1fd0438',
});
const db = cloud.database();
exports.main = async ({ year, month }) => {
  try {
    const { OPENID: openid } = await cloud.getWXContext();
    //  获取用户
    let { data: resultUser } = await db
      .collection('tb_user')
      .where({
        openid,
      })
      .get();
    if (resultUser.length) {
      resultUser = resultUser[0];
    } else {
      return {
        code: 0,
        message: '未登录',
        data: {
          accountingDays: 0,
          recordsNumber: 0,
        },
      };
    }
    const { data: resultData } = await db
      .collection('tb_billing_record')
      .where({
        userId: resultUser._id,
      })
      .get();
    // 按时间划分数据
    const listByTime = resultData.reduce((pre, cur) => {
      const { recordDate } = cur;
      const date = new Date(recordDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const time = `${year}-${month}-${day}`;
      const hasTimeIndex = pre.findIndex(item => item.time === time);
      if (hasTimeIndex > -1) {
        pre[hasTimeIndex].list.push(cur);
      } else {
        pre = pre.concat([{ time, list: [cur] }]);
      }
      return pre;
    }, []);

    return {
      code: 0,
      message: '成功',
      data: {
        accountingDays: listByTime.length,
        recordsNumber: resultData.length,
      },
    };
  } catch (e) {
    return {
      code: -1,
      message: e.message ? e.message : e,
      data: null,
    };
  }
};
