/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-29 14:02:00
 * @LastEditTime: 2021-01-12 17:11:14
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
    const date = new Date(currentDate);
    const nowMonth = date.getMonth();
    const nowYear = date.getFullYear();
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
    const LIMIT = 15;
    const sql = db
      .collection('tb_billing_record')
      .where({
        recordDate: _.gte(minDate).and(_.lte(maxDate)),
        userId,
      })
      .orderBy('recordDate', 'desc');
    const { total } = await sql.count();
    const totalPage = Math.ceil(total / LIMIT);
    let { data: list } = await sql
      .skip((page - 1) * LIMIT)
      .limit(LIMIT)
      .get();

    // 获取当月已使用的金额
    let { data: amountUsedResult } = await db
      .collection('tb_user_amount_used')
      .where({
        openid,
        date: currentDate,
      })
      .get();
    const amountUsed = amountUsedResult.length
      ? amountUsedResult[0].amountUsed
      : 0;

    // 获取数据中的分类名
    const { data: categoryList } = await db
      .collection('tb_category')
      .where({
        _id: _.in(list.map(({ categoryId }) => categoryId)),
      })
      .get();

    return {
      code: 0,
      data: {
        totalPage,
        list: list.map(item => {
          const category = categoryList.find(c => c._id === item.categoryId);
          return { ...item, id: item._id, categoryName: category.name || '' };
        }),
        monthMaxMoney,
        amountUsed,
        unusedAmount:
          monthMaxMoney && monthMaxMoney - amountUsed > 0
            ? monthMaxMoney - amountUsed
            : 0,
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
