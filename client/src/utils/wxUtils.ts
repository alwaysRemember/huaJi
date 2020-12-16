/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 21:31:22
 * @LastEditTime: 2020-10-22 18:41:55
 * @FilePath: /koala-frontend/src/utils/wxUtils.ts
 */
import Taro from '@tarojs/taro';
import { ICreateOrderResponse } from '../pages/OrderConfirm/interface';
import { EPaymentResultType } from '../pages/PaymentResult/enum';
import { paymentResultPath } from '../router';
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
      res();
    }, duration);
  });
};

/**
 * 微信支付
 * @param param0
 */
export const wxPay = ({
  package: pk,
  paySign,
  timeStamp,
  nonceStr,
}: ICreateOrderResponse): Promise<null> => {
  return new Promise(async (res, rej) => {
    await Taro.requestPayment({
      package: pk,
      paySign,
      timeStamp,
      nonceStr,
      signType: 'MD5',
      fail(data) {
        rej(data);
      },
      success() {
        res();
      },
    });
  });
};

/**
 * 使用微信支付
 * @param data
 * @param totalAmount 支付金额
 */
export const callWxPay = async (
  data: ICreateOrderResponse,
  totalAmount: number,
) => {
  let type: EPaymentResultType;
  try {
    await wxPay(data);
    await showToast({
      icon: EToastIcon.SUCCESS,
      title: '支付成功',
    });
    type = EPaymentResultType.SUCCESS;
  } catch (e) {
    if (e.errMsg.indexOf('cancel') > -1) {
      await showToast({
        title: '您已取消支付',
      });
    } else {
      await showToast({
        title: '微信支付失败，请稍后重试',
      });
    }
    type = EPaymentResultType.CANCEL;
  }
  // 清空历史跳转到支付结果页面
  Taro.reLaunch({
    url: paymentResultPath({
      payOrderId: data.orderId,
      type,
      amount: String(totalAmount),
    }),
  });
};
