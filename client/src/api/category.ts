/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-24 14:41:45
 * @LastEditTime: 2020-12-24 14:42:25
 * @FilePath: /huaJi/client/src/api/category.ts
 */

import { request } from 'src/utils/wxUtils';

/* 获取分类列表 */
export const getCategoryList = () => request('getCategoryList');
