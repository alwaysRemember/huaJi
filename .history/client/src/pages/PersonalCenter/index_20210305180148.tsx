import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import React, { useState } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { IReducers } from '../../interface/store';
import { ETabBarEnum } from '../../custom-tab-bar/enums';
import { updateTabBarSelect } from '../../store/actions';
import styles from './index.module.scss';
import ImagePreload from '../../components/ImagePreload';
import { setClassName } from '../../utils';
import { IMenuItem, IPersonalCenterResponseData } from './interface';
import { AtButton, AtList, AtListItem } from 'taro-ui';
import { loginPath, updateLimitPath } from '../../router';
import { request } from '../../utils/wxUtils';

const PersonalCenter = () => {
  const dispatch = useDispatch();
  let { userInfo } = useMappedState<IReducers>(state => state);
  const [accountingDays, setAccountingDays] = useState<number>(0);
  const [recordsNumber, setRecordsNumber] = useState<number>(0);
  const [menuList] = useState<Array<IMenuItem>>([
    {
      title: '每月限额',
      path: updateLimitPath(),
      iconPath:
        'https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/icon/limit_icon.png?sign=b123f33eed6dc46182af325f343d19c9&t=1610351622',
    },
  ]);

  const getData = async () => {
    try {
      const { recordsNumber, accountingDays } = await request<
        IPersonalCenterResponseData
      >('getPersonalCenterData');
      setRecordsNumber(recordsNumber);
      setAccountingDays(accountingDays);
    } catch (e) {}
  };

  useDidShow(() => {
    getData();
    dispatch(updateTabBarSelect(ETabBarEnum.PERSONAL_CENTER));
  });
  return (
    <View>

    </View>
    
  );
};
export default PersonalCenter;
