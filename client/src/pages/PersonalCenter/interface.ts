/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-16 18:01:57
 * @LastEditTime: 2021-01-12 16:57:39
 * @FilePath: /huaJi/client/src/pages/PersonalCenter/interface.ts
 */

export interface IMenuItem {
  title: string;
  path: string;
  iconPath: string;
}

export interface IPersonalCenterResponseData {
  accountingDays: number;
  recordsNumber: number;
}
