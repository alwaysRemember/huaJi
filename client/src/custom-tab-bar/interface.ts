/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-16 18:21:31
 * @LastEditTime: 2020-12-16 21:21:53
 * @FilePath: /huaJi/client/src/custom-tab-bar/interface.ts
 */

import { CoverImageProps } from '@tarojs/components/types/CoverImage';
import { ComponentType } from 'react';
import { ETabBarEnum } from './enums';

export interface ITabBarItem {
  path: string;
  icon: string;
  selectIcon: string;
  title?: string;
  isSelect: boolean;
  isTabBarPage: boolean;
  id: ETabBarEnum;
}
