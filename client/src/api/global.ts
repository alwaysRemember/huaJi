/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-17 17:42:08
 * @LastEditTime: 2020-12-17 19:22:20
 * @FilePath: /huaJi/client/src/api/global.ts
 */

import { request } from '../utils/wxUtils';
import { IUserInfo, IUserLoginRequestParams } from '../pages/Login/interface';

/**
 * 数据请求
 * @param params
 */
export const userLogin = (params: IUserLoginRequestParams) =>
  request<IUserInfo>('login', params);
