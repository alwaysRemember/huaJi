/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-15 17:21:22
 * @LastEditTime: 2020-12-24 17:24:37
 * @FilePath: /huaJi/client/src/app.config.ts
 */
export default {
  pages: [
    'pages/CategoryList/index',
    'pages/Home/index',
    'pages/Login/index',
    'pages/PersonalCenter/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '花记账本',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    selectedColor: '#6ac5d7',
    color: '#707070',
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
    ],
  },
};
