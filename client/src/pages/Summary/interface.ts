/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-30 16:31:18
 * @LastEditTime: 2021-01-04 17:52:49
 * @FilePath: /huaJi/client/src/pages/Summary/interface.ts
 */

export interface ISummaryResponseData {
  list: Array<IMonthData>;
  balance: number;
  expenditure: number;
  income: number;
}

export interface IMonthData {
  id: number;
  label: string;
  income: number; // 收入
  expenditure: number; // 支出
  balance: number; // 结余
}
