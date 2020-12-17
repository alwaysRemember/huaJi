/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-17 11:48:15
 * @LastEditTime: 2020-12-17 11:52:16
 * @FilePath: /huaJi/client/src/store/actions/global.ts
 */

import { ETabBarEnum } from 'src/custom-tab-bar/enums';
import { IReduxAction } from 'src/interface/global';
import { UPDATE_TAB_BAR_SELECT } from '../constants';

/**
 * 更新tabbar选择
 * @param data
 */
export const updateTabBarSelect = (
  data: ETabBarEnum,
): IReduxAction<ETabBarEnum> => ({ type: UPDATE_TAB_BAR_SELECT, data });
