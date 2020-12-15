/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 15:37:57
 * @LastEditTime: 2020-06-24 15:38:20
 * @FilePath: /koala-frontend/src/interface/global.ts
 */

// reducer
export interface IReduxAction<T> {
  type: string;
  data: T;
}
