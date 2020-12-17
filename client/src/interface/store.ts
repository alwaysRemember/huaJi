/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 16:37:48
 * @LastEditTime: 2020-12-17 11:56:00
 * @FilePath: /huaJi/client/src/interface/store.ts
 */

import { ETabBarEnum } from 'src/custom-tab-bar/enums';

export interface IReducers {
  tabBarSelect: ETabBarEnum;
}
