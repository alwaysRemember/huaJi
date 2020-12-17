/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-17 20:12:18
 * @LastEditTime: 2020-12-17 20:15:08
 * @FilePath: /huaJi/client/src/store/actions/user.ts
 */

import { IReduxAction } from 'src/interface/global';
import { IUserInfo } from '../../pages/Login/interface';
import { UPDATE_USER_INFO } from '../constants';

/**
 * 更新用户信息
 * @param data
 */
export const updateUserInfo = (data: IUserInfo): IReduxAction<IUserInfo> => ({
  type: UPDATE_USER_INFO,
  data,
});
