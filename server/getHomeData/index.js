/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-29 14:02:00
 * @LastEditTime: 2020-12-29 15:51:57
 * @FilePath: /huaJi/server/getHomeData/index.js
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
      resultUser = resultUser[0];
    } else {
      return {
        code: 0,
        message: '成功',
        data: {
          monthMaxMoney: 0,
          amountUsed: 0,
          unsedAmount: 0,
          list: [],
          totalPage: 1,
        },
      };
    }
    const { _id: userId, monthMaxMoney } = resultUser;
    //获取当前查询时间的第一天和最后一天
    currentDate = new Date(currentDate);
    const nowMonth = currentDate.getMonth();
    const nowYear = currentDate.getFullYear();
    const minDate = new Date(nowYear, nowMonth, 1);
    const maxDate = new Date(
      new Date(
        new Date(nowYear, nowMonth + 1, 0).toLocaleDateString(),
      ).getTime() +
        24 * 60 * 60 * 1000 -
        1,
    );

    // 获取记录数据
    const _ = db.command;
    const LIMIT = 10;
    const sql = db
      .collection('tb_billing_record')
      .where({
        recordDate: _.gte(minDate).and(_.lte(maxDate)),
        userId,
      })
      .orderBy('createTime', 'desc');
    const { total } = await sql.count();
    const totalPage = Math.ceil(total / LIMIT);
    const { data: list } = await sql
      .skip((page - 1) * LIMIT)
      .limit(LIMIT)
      .get();

    // 获取当月已使用的金额
    const d = new Date();
    const nowTime = `${d.getFullYear()}-${d.getMonth() + 1}`; // YYYY-MM
    let { data: amountUsedResult } = await db
      .collection('tb_user_amount_used')
      .where({
        openid,
        date: nowTime,
      })
      .get();
    const amountUsed = amountUsedResult.length
      ? amountUsedResult[0].amountUsed
      : 0;

    return {
      totalPage,
      list,
      monthMaxMoney,
      amountUsed,
      unusedAmount: monthMaxMoney ? monthMaxMoney - amountUsed : 0,
    };
  } catch (e) {
    return {
      code: -1,
      message: e,
      data: null,
    };
  }
};
