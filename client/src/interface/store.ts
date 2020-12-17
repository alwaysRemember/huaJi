/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 16:37:48
 * @LastEditTime: 2020-12-17 20:18:06
 * @FilePath: /huaJi/client/src/interface/store.ts
 */

import { ETabBarEnum } from '../custom-tab-bar/enums';
import { IUserInfo } from '../pages/Login/interface';

export interface IReducers {
  tabBarSelect: ETabBarEnum;
  userInfo: IUserInfo | null;
}
