/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-16 17:54:16
 * @LastEditTime: 2020-12-30 11:40:10
 * @FilePath: /huaJi/client/src/pages/Home/interface.ts
 */

import { ECategoryTypeEnum } from '../CategoryList/enums';

export interface IHomeResponseData {
  monthMaxMoney: number;
  amountUsed: number;
  unusedAmount: number;
  list: Array<IRecordItem>;
  totalPage: number;
}

export interface IHomeRequestData {
  page: number;
  currentDate: string; // YYYY-MM
}

export interface IRecordItem {
  id: string;
  categoryType: ECategoryTypeEnum;
  categoryName: string;
  money: number;
  remarks: string;
  recordDate: Date;
}
