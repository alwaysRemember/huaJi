/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-16 18:21:31
 * @LastEditTime: 2020-12-16 20:29:01
 * @FilePath: /huaJi/client/src/custom-tab-bar/interface.ts
 */

import { CoverImageProps } from '@tarojs/components/types/CoverImage';
import { ComponentType } from 'react';

export interface ITabBarItem {
  path: string;
  Icon: () => JSX.Element;
  SelectIcon: () => JSX.Element;
  title?: string;
  isSelect: boolean;
  isTabBarPage: boolean;
}
