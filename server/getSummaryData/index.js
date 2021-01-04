/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-24 14:32:25
 * @LastEditTime: 2021-01-04 18:39:14
 * @FilePath: /huaJi/server/getSummaryData/index.js
 */
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'huaji-server-prod-2egmhbb1fd0438',
});
const db = cloud.database();

exports.main = async ({ year }) => {
  try {
    let maxDate = new Date(`${year}-12-31 23:59:59`);
    const minDate = new Date(`${year}-01-01 00:00:00`);
    maxDate = maxDate.getTime() >= new Date().getTime() ? new Date() : maxDate; // 如果最大时间超出当前的时间 那么使用当前的时间
    const { OPENID: openid } = await cloud.getWXContext();

    // 获取用户
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
        data: {
          list: [],
          balance: 0,
          expenditure: 0,
          income: 0,
        },
        message: '成功',
      };
    }
    // 获取数据
    const _ = db.command;
    const { data: resultData } = await db
      .collection('tb_billing_record')
      .where({
        userId: resultUser._id,
        recordDate: _.gte(minDate).and(_.lte(maxDate)),
      })
      .get();
    const resultList = [...Array(maxDate.getMonth() + 1).keys()].map(k => {
      k++;
      const mounth = k < 10 ? `0${k}` : String(k);
      return {
        id: k,
        label: mounth,
        income: 0,
        expenditure: 0,
        balance: 0,
      };
    });

    if (!resultData.length) {
      return {
        code: 0,
        data: {
          list: resultList,
          balance: 0,
          expenditure: 0,
          income: 0,
        },
        message: '成功',
      };
    }

    let expenditure = 0,
      income = 0;
    resultData.forEach(({ categoryType, money, recordDate }) => {
      clearInterval;
      switch (categoryType) {
        case 'export':
          expenditure += money;
          break;
        case 'income':
          income += money;
          break;
      }
      // 月份
      const month = new Date(recordDate).getMonth() + 1;
      // 计算每月数据
      resultList.forEach(i => {
        if (i.id === month) {
          switch (categoryType) {
            case 'export':
              i.expenditure += money;
              i.balance -= money;
              break;
            case 'income':
              i.income += money;
              i.balance += money;
              break;
          }
        }
      });
    });

    return {
      code: 0,
      data: {
        list: resultList,
        balance: income - expenditure,
        expenditure,
        income,
      },
      message: '成功',
    };
  } catch (e) {
    return {
      code: -1,
      data: null,
      message: e,
    };
  }
};
