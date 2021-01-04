import { View, Text } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import React from 'react';
import { useDispatch } from 'redux-react-hook';
import { ETabBarEnum } from '../../custom-tab-bar/enums';
import { updateTabBarSelect } from '../../store/actions';

import styles from './index.module.scss';

const Summary = () => {
  const dispatch = useDispatch();

  useDidShow(() => {
    dispatch(updateTabBarSelect(ETabBarEnum.SUMMARY));
  });
  return <View className={styles['summary-wrapper']}></View>;
};
export default Summary;
