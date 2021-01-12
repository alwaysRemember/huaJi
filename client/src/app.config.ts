/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-15 17:21:22
 * @LastEditTime: 2021-01-12 16:52:16
 * @FilePath: /huaJi/client/src/app.config.ts
 */
export default {
  pages: [
    'pages/Home/index',
    'pages/UpdateLimit/index',
    'pages/PersonalCenter/index',
    'pages/Echart/index',
    'pages/Summary/index',
    'pages/CategoryList/index',
    'pages/Login/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '花记账本',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    selectedColor: '#6ac5d7',
    color: '#8a8a8a',
    custom: true,
    usingComponents: {},
    list: [
      {
        pagePath: 'pages/Home/index',
        text: '花记',
        // iconPath: './images/tabbar/home.png', // 35*38
        // selectedIconPath: './images/tabbar/home_selected.png',
      },
      {
        pagePath: 'pages/PersonalCenter/index',
        text: '我的',
        // iconPath: './images/tabbar/shopping_cart.png', // 35*38
        // selectedIconPath: './images/tabbar/shopping_cart_selected.png',
      },
      {
        pagePath: 'pages/Summary/index',
        text: '汇总',
      },
      {
        pagePath: 'pages/Echart/index',
        text: '图表',
      },
    ],
  },
};
