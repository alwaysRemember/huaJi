/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-28 18:33:34
 * @LastEditTime: 2020-12-30 11:40:16
 * @FilePath: /huaJi/client/src/components/Scroll/interface.ts
 */

import { MutableRefObject } from 'react';

export interface IScrollProps {
  page: number;
  totalPage: number;
  updatePage: (page: number) => void;
  cref: MutableRefObject<IScrollRef | null>;
}
export interface IScrollRef {
  changeLoadMoreStatus: (type: TLoadMoreStatus) => void;
}

export type TLoadMoreStatus = 'more' | 'loading' | 'noMore';
