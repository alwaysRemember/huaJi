/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-16 18:17:52
 * @LastEditTime: 2020-12-16 18:23:10
 * @FilePath: /huaJi/client/src/router/index.ts
 */

type TPath<T extends {} | null> = (params?: T) => string;

// 主页
export const homePath: TPath<null> = () => `/pages/Home/index`;

// 个人中心
export const personalCenterPath: TPath<null> = () =>
  `/pages/PersonalCenter/index`;
