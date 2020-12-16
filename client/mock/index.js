/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-23 16:54:12
 * @LastEditTime: 2020-12-15 17:29:39
 * @FilePath: /huaJi/mock/index.js
 */

const delay = cb => setTimeout(cb, 2000);

const responseData = data => ({
  code: 0,
  data,
  message: '成功',
});

const testImg =
  'https://wx.qlogo.cn/mmopen/vi_32/7icYslR11jBbaGjm6LAXib6VRxEuibQiagia2LicNPJEgbTacD2SH8dSauGD6Cp9ggicA1tmY3foDwL5NibwZv6F1SI7Vg/132';
module.exports = {
  'GET /api/test': (req, res) => {
    delay(() => {
      res.json(responseData());
    });
  },
};
