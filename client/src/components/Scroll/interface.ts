/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-28 18:33:34
 * @LastEditTime: 2020-12-28 18:39:18
 * @FilePath: /huaJi/client/src/components/Scroll/interface.ts
 */

export interface IScrollProps {
  page: number;
  totalPage: number;
  updatePage: (page: number) => void;
  isGetData: boolean;
}
