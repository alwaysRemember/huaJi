/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-16 18:00:32
 * @LastEditTime: 2021-03-05 18:01:58
 * @FilePath: /huaJi/client/src/pages/PersonalCenter/index.tsx
 */
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
    <View className={styles["personal-center"]}>
      <ScrollView scrollY className={styles['personal-center-wrapper']}>
        <View className={styles['user-info-wrapper']}>
          {(!!userInfo && (
            <View>
              <View className={styles['avatar-wrapper']}>
                {!!userInfo?.avatarUrl && (
                  <ImagePreload
                    width={150}
                    height={150}
                    borderRadius={75}
                    src={userInfo.avatarUrl}
                  />
                )}
              </View>
              <Text className={styles['username']}>
                {userInfo?.nickName || ''}
              </Text>
            </View>
          )) || (
            <AtButton
              className={styles['go-login']}
              type="secondary"
              circle
              size="small"
              onClick={() => {
                Taro.navigateTo({
                  url: loginPath(),
                });
              }}
            >
              去登录
            </AtButton>
          )}
        </View>
        <View className={styles['accounting-info']}>
          <View className={setClassName([styles['item'], styles['days']])}>
            <Text className={styles['label']}>记账天数</Text>
            <Text className={styles['value']}>{accountingDays} 天</Text>
          </View>
          <View
            className={setClassName([styles['item'], styles['records-number']])}
          >
            <Text className={styles['label']}>记账条数</Text>
            <Text className={styles['value']}>{recordsNumber} 条</Text>
          </View>
        </View>

        {/* 菜单 */}
        <View className={styles['menu-list']}>
          <AtList>
            {menuList.map(({ title, path, iconPath }) => (
              <AtListItem
                title={title}
                arrow="right"
                thumb={iconPath}
                key={title}
                onClick={() => {
                  console.log(path);

                  Taro.navigateTo({
                    url: path,
                  });
                }}
              />
            ))}
          </AtList>
        </View>

        {/* 联系客服 */}
        <View className={styles['contact-service']}>
          <AtButton type="primary" openType="contact" className={styles['btn']}>
            问题上报
          </AtButton>
        </View>
      </ScrollView>
    </View>
  );
};
export default PersonalCenter;
