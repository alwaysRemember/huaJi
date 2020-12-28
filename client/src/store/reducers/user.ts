/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-17 20:15:18
 * @LastEditTime: 2020-12-28 19:06:04
 * @FilePath: /huaJi/client/src/store/reducers/user.ts
 */
import Taro from '@tarojs/taro';
import { EUserStorage } from '../../enums/global';
import { IReduxAction } from '../../interface/global';
import { IUserInfo } from '../../pages/Login/interface';
import { UPDATE_USER_INFO } from '../constants';

// 从缓存中获取用户信息存储状态
const localUserInfo: string = Taro.getStorageSync(EUserStorage.LOCAL_USER_INFO);

/**
 * 用户信息
 * @param data
 * @param actions
 */
export const userInfo = (
  data: IUserInfo | null = Boolean(localUserInfo)
    ? JSON.parse(localUserInfo)
    : null,
  actions: IReduxAction<IUserInfo>,
): IUserInfo | null => {
  switch (actions.type) {
    case UPDATE_USER_INFO:
      return actions.data;
    default:
      return data;
  }
};
