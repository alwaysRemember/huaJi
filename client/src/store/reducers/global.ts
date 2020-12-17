/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-17 11:52:28
 * @LastEditTime: 2020-12-17 11:56:23
 * @FilePath: /huaJi/client/src/store/reducers/global.ts
 */

import { ETabBarEnum } from '../../custom-tab-bar/enums';
import { IReduxAction } from '../../interface/global';
import { UPDATE_TAB_BAR_SELECT } from '../constants';

/**
 *  tabbar选择
 * @param data
 * @param actions
 */
export const tabBarSelect = (
  data: ETabBarEnum = ETabBarEnum.HOME,
  actions: IReduxAction<ETabBarEnum>,
): ETabBarEnum => {
  switch (actions.type) {
    case UPDATE_TAB_BAR_SELECT:
      return actions.data;
    default:
      return data;
  }
};
