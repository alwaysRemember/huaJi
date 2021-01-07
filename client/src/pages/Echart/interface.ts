/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2021-01-05 14:01:39
 * @LastEditTime: 2021-01-07 14:00:21
 * @FilePath: /huaJi/client/src/pages/Echart/interface.ts
 */

export interface IEchartRequestParams {
  year: string;
  month: string;
}

export interface IEchartResponseData {
  expenditureList: Array<number>;
  incomeList: Array<number>;
}
