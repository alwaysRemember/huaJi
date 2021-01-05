import { CoverView, CoverImage, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import {
  categoryListPath,
  echartPath,
  homePath,
  personalCenterPath,
  summaryPath,
} from '../router';
import { AtButton } from 'taro-ui';
import styles from './index.module.scss';
import { ITabBarItem } from './interface';
import { setClassName } from '../utils';
import { ETabBarEnum } from './enums';
import { useMappedState } from 'redux-react-hook';
import { IReducers } from '../interface/store';
const tabBar = () => {
  const { tabBarSelect }: IReducers = useMappedState(state => state);
  const [tabBarList, setTabBarList] = useState<Array<ITabBarItem>>([
    {
      id: ETabBarEnum.HOME,
      path: homePath(),
      title: '主页',
      icon:
        'https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/home.png?sign=3c3b440f394eeeebee0848e00e3dce43&t=1609318482',
      selectIcon:
        'https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/home_select.png?sign=30c99c7d5c0ea29026d9120b8ab9f4d0&t=1609318500',
      isSelect: true,
      isTabBarPage: true,
    },
    {
      id: ETabBarEnum.SUMMARY,
      path: summaryPath(),
      title: '汇总',
      icon:
        'https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/summary.png?sign=a4462cb3cc2626dc56d82184effa1544&t=1609318519',
      selectIcon:
        'https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/summary_select.png?sign=8ac330f33274735bca57d61d56c6a1da&t=1609317631',
      isSelect: false,
      isTabBarPage: true,
    },
    {
      id: ETabBarEnum.ADD_RECORD,
      path: categoryListPath(),
      icon:
        'https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/add.png?sign=15555aec87af0092803116668e88544c&t=1608802824',
      selectIcon:
        'https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/add.png?sign=15555aec87af0092803116668e88544c&t=1608802824',
      isSelect: true,
      isTabBarPage: false,
    },
    {
      id: ETabBarEnum.ECHART,
      path: echartPath(),
      title: '图表',
      icon:
        'https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/echart.png?sign=0312a0537d4eef9ddd88410ff5969b3b&t=1609826892',
      selectIcon:
        'https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/echart_select.png?sign=219054695e79d52f4f36368b0d54a1d4&t=1609826901',
      isSelect: false,
      isTabBarPage: true,
    },
    {
      id: ETabBarEnum.PERSONAL_CENTER,
      path: personalCenterPath(),
      title: '我的',
      icon:
        'https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/personal_center.png?sign=3ce68a4eae289250f8204f27a0b97ffa&t=1609318542',
      selectIcon:
        'https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/personal_center_select.png?sign=e48d4b2ccc0d7bb02f2ef3548ed65390&t=1609318551',
      isSelect: false,
      isTabBarPage: true,
    },
  ]);

  const tabBarClick = index => {
    const { isSelect, isTabBarPage, path } = tabBarList[index];
    if (isSelect) return;
    if (isTabBarPage) {
      Taro.switchTab({
        url: path,
      });
    } else {
      Taro.navigateTo({
        url: path,
      });
    }
  };
  useEffect(() => {
    setTabBarList(prev => {
      const list: Array<ITabBarItem> = JSON.parse(JSON.stringify(prev));
      list.forEach(item => {
        item.isSelect = item.id === tabBarSelect;
      });
      return list;
    });
  }, [tabBarSelect]);
  return (
    <CoverView className={styles['tab-bar-wrapper']}>
      <CoverView className={styles['tab-bar-con']}>
        {tabBarList.map(({ title, icon, selectIcon, isSelect, id }, index) => (
          <AtButton
            key={id}
            type="primary"
            className={setClassName([
              styles['tab-bar-item'],
              isSelect ? styles['select'] : '',
              id === ETabBarEnum.ADD_RECORD ? styles['add-record'] : '',
            ])}
            onClick={() => {
              tabBarClick(index);
            }}
          >
            <CoverImage
              src={isSelect ? selectIcon : icon}
              className={styles['tab-bar-icon']}
            />
            <CoverView className={styles['text']}>{title}</CoverView>
          </AtButton>
        ))}
      </CoverView>
    </CoverView>
  );
};

export default tabBar;
