/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2021-01-05 14:01:39
 * @LastEditTime: 2021-01-08 14:47:04
 * @FilePath: /huaJi/client/src/pages/Echart/interface.ts
 */

export interface IEchartRequestParams {
  year: string;
  month: string;
}

export enum EPieChartType {
  EXPENDITURE = 'EXPENDITURE', //  支出
  INCOME = 'INCOME', //  收入
}
export interface IEchartResponseData {
  expenditureList: Array<number>;
  incomeList: Array<number>;
  expenditureCategoryDataList: Array<ICategoryDataItem>;
  incomeCategoryDataList: Array<ICategoryDataItem>;
}
export interface ICategoryDataItem {
  name: string;
  money: number;
}
