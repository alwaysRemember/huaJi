import { View, Text } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import React from 'react';
import { useDispatch } from 'redux-react-hook';
import { ETabBarEnum } from '../../custom-tab-bar/enums';
import { updateTabBarSelect } from '../../store/actions';
import styles from './index.module.scss';

const PersonalCenter = () => {
  const dispatch = useDispatch();
  useDidShow(() => {
    dispatch(updateTabBarSelect(ETabBarEnum.PERSONAL_CENTER));
  });
  return (
    <View>
      <Text>个人中心</Text>
    </View>
  );
};
export default PersonalCenter;
