/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-16 18:17:52
 * @LastEditTime: 2020-12-30 16:33:25
 * @FilePath: /huaJi/client/src/router/index.ts
 */

type TPath<T extends {} | null> = (params?: T) => string;

// 主页
export const homePath: TPath<null> = () => `/pages/Home/index`;

// 个人中心
export const personalCenterPath: TPath<null> = () =>
  `/pages/PersonalCenter/index`;

// 登录页面
export const loginPath: TPath<null> = () => `/pages/Login/index`;

// 记账分类页面
export const categoryListPath: TPath<null> = () => `/pages/CategoryList/index`;

// 汇总页面
export const summaryPath: TPath<null> = () => `/pages/Summary/index`;
