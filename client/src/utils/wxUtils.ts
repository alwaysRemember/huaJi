/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 21:31:22
 * @LastEditTime: 2020-12-17 19:26:18
 * @FilePath: /huaJi/client/src/utils/wxUtils.ts
 */
import Taro from '@tarojs/taro';
import { EToastIcon } from '../enums/EWXUtils';

/**
 * 弹窗提醒
 * @param param0
 */
export const showToast = ({
  title,
  icon = EToastIcon.NONE,
  duration = 1000,
}: {
  title: string;
  icon?: EToastIcon;
  duration?: number;
}): Promise<null> => {
  return new Promise(res => {
    Taro.showToast({
      title,
      icon,
      duration,
      mask: true,
    });
    setTimeout(() => {
      res(null);
    }, duration);
  });
};

/**
 * 云函数请求
 * @param requestName
 * @param params
 */
export const request = async <T = null>(
  requestName: string,
  params: any,
): Promise<T> => {
  wx.cloud.init();
  Taro.showLoading({
    title: '请稍等...',
    mask: true,
  });
  return new Promise(async res => {
    try {
      const {
        result: { code, data, message },
      } = await wx.cloud.callFunction({
        name: requestName,
        data: params,
      });
      switch (code) {
        case 0:
          res(data);
          break;
        case -1:
          showToast({
            title: message,
          });
          break;
        default:
          res(data);
      }
    } catch (e) {
      console.log(e);

      showToast({
        title: '服务器出错，请稍后重试',
      });
    } finally {
      Taro.hideLoading();
    }
  });
};
