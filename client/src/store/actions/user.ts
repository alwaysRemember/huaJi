/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-17 20:12:18
 * @LastEditTime: 2020-12-28 19:06:40
 * @FilePath: /huaJi/client/src/store/actions/user.ts
 */
import Taro from '@tarojs/taro';
import { EUserStorage } from '../../enums/global';
import { IReduxAction } from '../../interface/global';
import { IUserInfo } from '../../pages/Login/interface';
import { UPDATE_USER_INFO } from '../constants';

/**
 * 更新用户信息
 * @param data
 */
export const updateUserInfo = (data: IUserInfo): IReduxAction<IUserInfo> => {
  // 设置缓存
  Taro.setStorageSync(EUserStorage.LOCAL_USER_INFO, JSON.stringify(data));
  return {
    type: UPDATE_USER_INFO,
    data,
  };
};
