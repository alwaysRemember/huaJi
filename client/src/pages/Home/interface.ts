/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-16 17:54:16
 * @LastEditTime: 2020-12-28 18:49:01
 * @FilePath: /huaJi/client/src/pages/Home/interface.ts
 */

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
  categoryName: string;
  money: number;
  records: string;
  recordDate: Date;
}
