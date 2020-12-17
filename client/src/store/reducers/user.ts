/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-17 20:15:18
 * @LastEditTime: 2020-12-17 20:18:16
 * @FilePath: /huaJi/client/src/store/reducers/user.ts
 */

import { IReduxAction } from '../../interface/global';
import { IUserInfo } from '../../pages/Login/interface';
import { UPDATE_USER_INFO } from '../constants';

/**
 * 用户信息
 * @param data
 * @param actions
 */
export const userInfo = (
  data: IUserInfo | null = null,
  actions: IReduxAction<IUserInfo>,
): IUserInfo | null => {
  switch (actions.type) {
    case UPDATE_USER_INFO:
      return actions.data;
    default:
      return data;
  }
};
