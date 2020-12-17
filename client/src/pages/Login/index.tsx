import { View, Text, BaseEventOrig } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import ImagePreload from '../../components/ImagePreload';
import styles from './index.module.scss';
import logo from '../../images/logo.png';
import { AtButton } from 'taro-ui';
import { ButtonProps } from '@tarojs/components/types/Button';
import { showToast } from '../../utils/wxUtils';
import { userLogin } from '../../api';
import { useDispatch } from 'redux-react-hook';
import { updateUserInfo } from '../../store/actions';
const login = () => {
  const dispatch = useDispatch();
  const getUserInfo = async (
    event: BaseEventOrig<ButtonProps.onGetUserInfoEventDetail>,
  ) => {
    const {
      detail: { userInfo, errMsg },
    } = event;
    // 判断是否同意授权
    if (errMsg !== 'getUserInfo:ok') {
      showToast({
        title: '您拒绝了授权！',
      });
      return;
    }
    // 调取登录获取code
    const { code } = await Taro.login();

    const data = await userLogin({ ...userInfo, code });

    dispatch(updateUserInfo(data));
    await showToast({
      title: '登陆成功',
    });
    Taro.navigateBack();
  };
  return (
    <View className={styles['login-wrapper']}>
      <View className={styles['logo-wrapper']}>
        <ImagePreload width={180} height={180} borderRadius={20} src={logo} />
      </View>
      <View className={styles['content']}>
        <Text className={styles['msg']}>
          方便快捷的记账助手，专业的记账小程序。
        </Text>
        <Text className={styles['msg']}>
          随手记下您的每一笔收支，让您的每一笔收支都有所寻。
        </Text>
        <Text className={styles['msg']}>及时处理当前的财务状态。</Text>
        <View className={styles['btn-wrapper']}>
          <AtButton
            type="primary"
            className={styles['authorize']}
            circle
            openType="getUserInfo"
            onGetUserInfo={getUserInfo}
          >
            微信一键授权登录
          </AtButton>
          <AtButton
            type="secondary"
            className={styles['deny-authorize']}
            circle
            onClick={() => {
              Taro.navigateBack();
            }}
          >
            拒绝授权
          </AtButton>
        </View>
      </View>
    </View>
  );
};

export default login;
