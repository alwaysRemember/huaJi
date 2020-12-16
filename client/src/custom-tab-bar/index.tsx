import { CoverView, CoverImage, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import { homePath, personalCenterPath } from '../router';
import { AtButton } from 'taro-ui';
import styles from './index.module.scss';
import { ITabBarItem } from './interface';
import { setClassName } from '../utils';
const tabBar = props => {
  const [tabBarList, setTabBarList] = useState<Array<ITabBarItem>>([
    {
      path: homePath(),
      title: '主页',
      Icon: () => (
        <CoverImage
          src="https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/home.png?sign=036cc39325bf4ed9841ed48ef712e665&t=1608124226"
          className={styles['tab-bar-icon']}
        />
      ),
      SelectIcon: () => (
        <CoverImage
          src="https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/home_select.png?sign=f7a45939ef735d202cbd69c6b8b37939&t=1608124235"
          className={styles['tab-bar-icon']}
        />
      ),
      isSelect: true,
      isTabBarPage: true,
    },
    {
      path: personalCenterPath(),
      title: '我的',
      Icon: () => (
        <CoverImage
          src="https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/personal_center.png?sign=b34f20db8b88a87e25e54d0e4be3cf13&t=1608124183"
          className={styles['tab-bar-icon']}
        />
      ),
      SelectIcon: () => (
        <CoverImage
          src="https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/personal_center_select.png?sign=7cf44fccd2fe6c8fbfbf20a8262eaf90&t=1608124212"
          className={styles['tab-bar-icon']}
        />
      ),
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
  return (
    <CoverView className={styles['tab-bar-wrapper']}>
      <CoverView className={styles['tab-bar-con']}>
        {tabBarList.map(({ title, Icon, SelectIcon, isSelect }, index) => (
          <AtButton
            type="primary"
            className={setClassName([
              styles['tab-bar-item'],
              isSelect ? styles['select'] : '',
            ])}
            onClick={() => {
              tabBarClick(index);
            }}
          >
            {(isSelect && <SelectIcon />) || <Icon />}
            <Text className={styles['text']}>{title}</Text>
          </AtButton>
        ))}
      </CoverView>
    </CoverView>
  );
};

export default tabBar;
