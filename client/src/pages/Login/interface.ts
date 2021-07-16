/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-16 17:54:16
 * @LastEditTime: 2021-03-30 17:42:08
 * @FilePath: /huaJi/client/src/pages/Login/interface.ts
 */

export interface IGender {
  /** 未知 */
  0;
  /** 男 */
  1;
  /** 女 */
  2;
}

export interface IUserLoginRequestParams {
  /** 昵称 */
  nickName: string;
  /** 头像 */
  avatarUrl: string;
  /** 性别 */
  gender: keyof IGender;
  /** 省份，如：`Yunnan` */
  province: string;
  /** 城市，如：`Dalian` */
  city: string;
  /** 国家，如：`China` */
  country: string;
  /** 用于获取sessionkey */
  code: string;
}

export interface IUserInfo extends IUserLoginRequestParams {
  openid: string;
  appid: string;
}
