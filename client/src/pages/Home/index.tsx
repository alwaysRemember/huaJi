import Taro, { useDidShow } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import React from 'react';
import styles from './index.module.scss';
import { useDispatch } from 'redux-react-hook';
import { updateTabBarSelect } from '../../store/actions';
import { ETabBarEnum } from '../../custom-tab-bar/enums';
import { useCheckLogin } from '../../hooks';

const Home = () => {
  const checkLogin = useCheckLogin();
  const dispatch = useDispatch();
  useDidShow(() => {
    dispatch(updateTabBarSelect(ETabBarEnum.HOME));
  });
  return (
    <View>
      <Text
        onClick={async () => {
          await checkLogin();
        }}
      >
        home page
      </Text>
    </View>
  );
};
export default Home;
