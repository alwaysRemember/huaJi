import { View, Text } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import React, { useState } from 'react';
import { request, showToast } from '../../utils/wxUtils';
import { AtInputNumber, AtButton } from 'taro-ui';
import styles from './index.module.scss';
import { IUpdateLimitResponseData } from './interface';
import { transferAmount } from '../../utils';
import { EToastIcon } from '../../enums/EWXUtils';
const UpdateLimit = () => {
  const [limit, setLimit] = useState<number>(0);
  const getData = async () => {
    try {
      const { limit } = await request<IUpdateLimitResponseData>(
        'getMonthlyLimit',
      );
      setLimit(Number(transferAmount(limit, 'yuan')));
    } catch (e) {}
  };
  const submit = async () => {
    try {
      await request('setMonthlyLimit', {
        limit: transferAmount(limit, 'fen'),
      });
      showToast({
        title: '设置成功',
        icon: EToastIcon.SUCCESS,
      });
    } catch (e) {}
  };
  useDidShow(() => {
    getData();
  });
  return (
    <View className={styles['update-limit-wrapper']}>
      <View className={styles['con']}>
        <Text className={styles['title']}>设置每月限额</Text>
        <AtInputNumber
          type="number"
          value={limit}
          step={10}
          max={100000000}
          width={300}
          onChange={v => {
            setLimit(v);
          }}
          className={styles['input']}
        />
        <AtButton
          disabled={!limit}
          className={styles['submit']}
          type="primary"
          size="small"
          onClick={submit}
        >
          立即设置
        </AtButton>
      </View>
    </View>
  );
};
export default UpdateLimit;
