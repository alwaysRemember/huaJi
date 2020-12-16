/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-15 17:21:22
 * @LastEditTime: 2020-12-15 17:33:57
 * @FilePath: /huaJi/global.d.ts
 */
declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV:
      | 'weapp'
      | 'swan'
      | 'alipay'
      | 'h5'
      | 'rn'
      | 'tt'
      | 'quickapp'
      | 'qq'
      | 'jd';
    [key: string]: any;
  };
};

declare interface Window {
  [key: string]: any;
}
