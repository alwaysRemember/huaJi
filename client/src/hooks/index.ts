/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-17 14:08:01
 * @LastEditTime: 2020-12-28 18:20:31
 * @FilePath: /huaJi/client/src/hooks/index.ts
 */

import Taro, { useDidShow } from '@tarojs/taro';
import { useState } from 'react';
import { loginPath } from '../router';
import { showToast } from '../utils/wxUtils';

// 校验登录是否过期
export const useCheckLogin = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false); // 是否登录了

  const checkLogin = async () => {
    try {
      // 校验session是否过期
      await Taro.checkSession();
      setIsLogin(true);
    } catch (e) {
      setIsLogin(false);
    }
  };

  useDidShow(() => {
    checkLogin();
  });

  return async () => {
    if (isLogin) {
      return Promise.resolve();
    } else {
      await showToast({
        title: '请登录',
      });
      Taro.navigateTo({
        url: loginPath(),
      });
    }
  };
};
