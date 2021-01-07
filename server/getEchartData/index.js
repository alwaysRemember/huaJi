/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-29 14:02:00
 * @LastEditTime: 2021-01-07 15:15:50
 * @FilePath: /huaJi/server/getEchartData/index.js
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
          expenditureList: [],
          incomeList: [],
        },
      };
    }
    let maxDate, minDate;
    const _ = db.command;
    // 处理时间限制
    if (month === 'ALL') {
      maxDate = new Date(`${year}-12-31 23:59:59`);
      minDate = new Date(`${year}-01-01 00:00:00`);
    } else {
      maxDate = new Date(year, month, 0, '12', '59', '59');
      minDate = new Date(`${year}-${month}-1 00:00:00`);
    }
    //  获取数据
    const { data: resultList } = await db
      .collection('tb_billing_record')
      .where({
        userId: resultUser._id,
        recordDate: _.gte(minDate).and(_.lte(maxDate)),
      })
      .get();
    // 拼接月份和天数
    const list = [...Array(maxDate.getMonth() + 1).keys()].map(k => {
      const month = k + 1;
      const days = new Date(year, month, 0).getDate();
      return {
        month,
        expenditure: [...Array(days).keys()].map(() => 0),
        income: [...Array(days).keys()].map(() => 0),
      };
    });
    //  数据赋值到月份
    resultList.forEach(({ recordDate, categoryType, money }) => {
      const month = recordDate.getMonth() + 1;
      const day = recordDate.getDate() - 1;
      const index = list.findIndex(i => i.month === month);
      if (categoryType === 'export') {
        list[index].expenditure[day] += money;
      } else {
        list[index].income[day] += money;
      }
    });
    let expenditureList = [],
      incomeList = [];
    // 处理输出
    if (month === 'ALL') {
      list.forEach(({ expenditure, income }) => {
        expenditureList.push(expenditure.reduce((pre, cur) => (pre += cur), 0));
        incomeList.push(income.reduce((pre, cur) => (pre += cur), 0));
      });
    } else {
      const { income, expenditure } = list[list.length - 1];
      expenditureList = expenditure;
      incomeList = income;
    }
    return {
      code: 0,
      data: {
        expenditureList,
        incomeList,
      },
      message: '成功',
    };
  } catch (e) {
    return {
      code: -1,
      message: e,
      data: null,
    };
  }
};
