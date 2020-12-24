/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-24 14:32:25
 * @LastEditTime: 2020-12-24 14:43:17
 * @FilePath: /huaJi/server/getCategoryList/index.js
 */
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'huaji-server-prod-2egmhbb1fd0438',
});
const db = cloud.database();

exports.main = async () => {
  try {
    const { data } = await db.collection('tb_category').get();
    let exportList = [];
    let incomeList = [];
    data.forEach(item => {
      item.id = item._id;
      delete item._id;
      switch (item.type) {
        case 'income':
          incomeList.push(item);
          break;
        case 'export':
          exportList.push(item);
          break;
      }
    });
    return {
      code: 0,
      data: { exportList, incomeList },
      message: 'success',
    };
  } catch (e) {
    return {
      code: -1,
      data: null,
      message: '获取分类页面信息失败',
    };
  }
};
