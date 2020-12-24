/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-24 14:41:45
 * @LastEditTime: 2020-12-24 14:48:43
 * @FilePath: /huaJi/client/src/api/category.ts
 */

import { ICategoryListResponseData } from '../pages/CategoryList/interface';
import { request } from '../utils/wxUtils';

/* 获取分类列表 */
export const getCategoryList = () =>
  request<ICategoryListResponseData>('getCategoryList');
