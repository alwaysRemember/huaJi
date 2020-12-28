/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-28 15:08:50
 * @LastEditTime: 2020-12-28 15:59:51
 * @FilePath: /huaJi/server/saveBillingRecord/index.js
 */

const cloud = require('wx-server-sdk');
cloud.init({
  env: 'huaji-server-prod-2egmhbb1fd0438',
});

const db = cloud.database();

exports.main = async ({ categoryId, categoryType, date, money, remarks }) => {
  try {
    // 获取当前登录用户的信息
    const { OPENID: openid } = cloud.getWXContext();
    let { data: userResult } = await db
      .collection('tb_user')
      .where({
        openid,
      })
      .get();
    if (userResult.length) {
      userResult = userResult[0];
    } else {
      return {
        code: -2,
        message: '请登录',
        data: null,
      };
    }
    // 查询是否存在当前的记账分类
    const { data: categoryResult } = await db
      .collection('tb_category')
      .doc(categoryId)
      .get();
    if (!categoryResult) await Promise.reject('获取不到当前账单分类');

    // 新增
    await db.collection('tb_billing_record').add({
      data: {
        userId: userResult._id,
        categoryId,
        categoryType,
        recordDate: new Date(date),
        money,
        remarks,
        createTime: new Date(),
        updateTime: new Date(),
      },
    });
    return {
      code: 0,
      message: '成功',
      data: null,
    };
  } catch (e) {
    return {
      code: -1,
      message: e || '新增账单记录失败',
      data: null,
    };
  }
};
