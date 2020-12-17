import { CoverView, CoverImage, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { homePath, personalCenterPath } from '../router';
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
        'https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/home.png?sign=036cc39325bf4ed9841ed48ef712e665&t=1608124226',
      selectIcon:
        'https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/home_select.png?sign=f7a45939ef735d202cbd69c6b8b37939&t=1608124235',
      isSelect: true,
      isTabBarPage: true,
    },
    {
      id: ETabBarEnum.PERSONAL_CENTER,
      path: personalCenterPath(),
      title: '我的',
      icon:
        'https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/personal_center.png?sign=b34f20db8b88a87e25e54d0e4be3cf13&t=1608124183',
      selectIcon:
        'https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/personal_center_select.png?sign=7cf44fccd2fe6c8fbfbf20a8262eaf90&t=1608124212',
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
