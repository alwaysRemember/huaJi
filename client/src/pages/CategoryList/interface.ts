/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-24 14:12:18
 * @LastEditTime: 2020-12-24 15:01:33
 * @FilePath: /huaJi/client/src/pages/CategoryList/interface.ts
 */

import { ECategoryTypeEnum } from './enums';

export interface ICategoryListResponseData {
  incomeList: Array<ICategoryListItem>;
  exportList: Array<ICategoryListItem>;
}

export interface ICategoryListItem {
  id: string;
  type: ECategoryTypeEnum;
  name: string;
  icon: string;
}
