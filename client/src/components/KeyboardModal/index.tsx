import { View, Text, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { ReactElement, useImperativeHandle, useState } from 'react';
import { setClassName } from '../../utils';
import { AtModal, AtInput, AtButton, AtIcon } from 'taro-ui';
import styles from './index.module.scss';
import moment from 'moment';
import { IKeyboardModalProps } from './interface';
import { showToast } from '../../utils/wxUtils';

const KeyboardModal = ({ cref, submit }: IKeyboardModalProps) => {
  useImperativeHandle(cref, () => ({
    changeShow(type) {
      setShow(type);
    },
    resetData() {
      hideKeyboardModal();
    },
  }));

  const keyBoardViewVal: { [key: number]: string } = {
    10: '.',
    11: 'date',
    12: 'remove',
    13: '完成',
  };

  const [show, setShow] = useState<boolean>(false);

  const [remarks, setRemarks] = useState<string>('');
  const [money, setMoney] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());

  const hideKeyboardModal = () => {
    setShow(false);
    setMoney('');
    setRemarks('');
    setDate(new Date());
  };

  /**
   * 键盘点击
   * @param k
   */
  const keyboardClick = (k: number) => {
    // Taro.vibrateShort();
    let val = money;
    switch (k) {
      case 11:
        break;
      case 12:
        setMoney(val => {
          const lastIndexIsPoint = val[val.length - 2] === '.'; // 最后一位是否为点
          return val.slice(0, val.length - (lastIndexIsPoint ? 2 : 1));
        });
        break;
      case 13:
        submit({
          remarks,
          money: Number(money) * 100,
          date,
        });
        break;
      default:
        val += k === 10 ? '.' : k;
        formatMoney(val);
    }
  };

  /**
   * 格式化金额
   * @param val
   */
  const formatMoney = (val: string) => {
    const moneyArr: Array<string> = val.split('.');
    // 数字格式判断
    if (!Number(val) || moneyArr.length > 2) {
      showToast({
        title: '请输入正确的金额',
        duration: 500,
      });
      return;
    }
    // 小数点后的位数判断
    if (moneyArr.length === 2 && moneyArr[1].length > 2) {
      showToast({
        title: '精确到小数点后2位',
        duration: 500,
      });
      return;
    }
    setMoney(val);
  };

  // 日期转换
  const dateTransfer = (): string => {
    const d = moment(date).format('YYYY-MM-DD');
    const nowDate = moment().format('YYYY-MM-DD');
    return d === nowDate ? '今日' : d;
  };

  // 获取键盘显示文案
  const getKeyboardVal = (k: number): string | number | ReactElement => {
    let val: string | number | ReactElement = keyBoardViewVal[k] || k;
    switch (val) {
      case 'date':
        val = dateTransfer();
        break;
      case 'remove':
        val = <AtIcon value="arrow-left" size="30" />;
        break;
    }
    return val;
  };

  return (
    <AtModal
      className={styles['keyboard-modal-wrapper']}
      isOpened={show}
      onClose={() => {
        hideKeyboardModal();
      }}
    >
      <View className={styles['keyboard-modal-con']}>
        <View className={styles['keyboard-con-top']}>
          {show && (
            <AtInput
              border={false}
              value={remarks}
              placeholder="请输入备注,默认为空"
              name="remarks"
              onChange={v => {
                setRemarks(v as string);
              }}
              className={styles['reamrks']}
            />
          )}
          <Text className={styles['money']}>{money || 0}</Text>
        </View>
        {/* 键盘 */}
        <View className={styles['keyboard-list']}>
          {[...Array(14).keys()].map(k => {
            return (
              <View
                className={setClassName([styles['keyboard-item'], styles[k]])}
              >
                {k === 11 ? (
                  <Picker
                    mode="date"
                    value={moment(date).format('YYYY-MM-DD')}
                    onChange={e => {
                      setDate(new Date(e.detail.value));
                    }}
                  >
                    <AtButton
                      className={setClassName([
                        styles['keyboard-item-btn'],
                        styles['date'],
                      ])}
                      onClick={() => {
                        keyboardClick(k);
                      }}
                    >
                      {getKeyboardVal(k)}
                    </AtButton>
                  </Picker>
                ) : (
                  <AtButton
                    className={styles['keyboard-item-btn']}
                    type={k === 13 ? 'primary' : undefined}
                    onClick={() => {
                      keyboardClick(k);
                    }}
                  >
                    {getKeyboardVal(k)}
                  </AtButton>
                )}
              </View>
            );
          })}
        </View>
      </View>
      {/* 日期选择器 */}
    </AtModal>
  );
};
export default KeyboardModal;
