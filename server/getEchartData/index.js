/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-29 14:02:00
 * @LastEditTime: 2021-01-08 15:24:02
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
    // 分类信息
    let resultCategoryList = [];
    if (resultList.length) {
      const { data } = await db
        .collection('tb_category')
        .where({
          _id: _.in([
            ...Array.from(
              new Set(resultList.map(({ categoryId }) => categoryId)),
            ),
          ]),
        })
        .get();
      resultCategoryList = data;
    }

    // 获取饼图信息
    const expenditureCategoryDataList = [],
      incomeCategoryDataList = [];
    resultList.forEach(({ categoryId, categoryType, money }) => {
      const { name } = resultCategoryList.find(({ _id }) => _id === categoryId);
      // 判断是否当前分类已经存在与数组
      const index = (categoryType === 'export'
        ? expenditureCategoryDataList
        : incomeCategoryDataList
      ).findIndex(({ name: categoryName }) => name === categoryName);

      if (categoryType === 'export') {
        if (index === -1) {
          expenditureCategoryDataList.push({
            name,
            money,
          });
        } else {
          expenditureCategoryDataList[index].money += money;
        }
      } else {
        if (index === -1) {
          incomeCategoryDataList.push({
            name,
            money,
          });
        } else {
          incomeCategoryDataList[index].money += money;
        }
      }
    });
    return {
      code: 0,
      data: {
        expenditureList,
        incomeList,
        incomeCategoryDataList,
        expenditureCategoryDataList,
      },
      message: '成功',
    };
  } catch (e) {
    console.log(e);
    return {
      code: -1,
      message: e.message ? e.message : e,
      data: null,
    };
  }
};
