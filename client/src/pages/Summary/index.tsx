import { View, Text, Picker } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import Taro, { useDidShow } from '@tarojs/taro';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'redux-react-hook';
import { ETabBarEnum } from '../../custom-tab-bar/enums';
import { updateTabBarSelect } from '../../store/actions';
import styles from './index.module.scss';
import { useCheckLogin } from '../../hooks';
import { setClassName, transferAmount } from '../../utils';
import { IMonthData } from './interface';
import Scroll from '../../components/Scroll';
import { IScrollRef } from '../../components/Scroll/interface';

const Summary = () => {
  const date = moment(new Date()).format('YYYY');
  const dispatch = useDispatch();
  const checkLogin = useCheckLogin();

  const [currentDate, setCurrentDate] = useState<string>(date);
  const [currentDateIndex, setCurrentDateIndex] = useState<Array<string>>([]);
  const [selectYearList, setSelectYearList] = useState<Array<string>>([]);
  const [balance, setBalance] = useState<number>(0);
  const [expenditure, setExpenditure] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [list, setList] = useState<Array<IMonthData>>(
    [...Array(12).keys()].map(k => ({
      id: k + '',
      label: k + 1 + '',
      income: k * 10000,
      expenditure: k * 10000,
      balance: k * 10000,
    })),
  );

  const scrollRef = useRef<IScrollRef>(null);

  // 设置年份数组和月份数组
  useEffect(() => {
    const [year] = date.split('-');
    const yearList = [...Array(20).keys()].map(k => String(Number(year) - k));
    yearList.reverse();

    setSelectYearList(yearList);
    const yearIndex = yearList.findIndex(v => v === year);
    setCurrentDateIndex([yearIndex + '']);
  }, []);

  // 监听日期选择器
  useEffect(() => {
    if (!currentDateIndex.length) return;
    const [yearIndex] = currentDateIndex;

    setCurrentDate(`${selectYearList[yearIndex]}`);
  }, [currentDateIndex]);

  useEffect(() => {
    console.log(currentDate);
  }, [currentDate]);
  useDidShow(() => {
    dispatch(updateTabBarSelect(ETabBarEnum.SUMMARY));
  });
  return (
    <View className={styles['summary-wrapper']}>
      <View className={styles['top-wrapper']}>
        <View className={styles['top-con']}>
          <Picker
            mode="multiSelector"
            range={[selectYearList]}
            value={currentDateIndex}
            onChange={e => {
              checkLogin().then(() => {
                setCurrentDateIndex(e.detail.value.map(i => i + ''));
              });
            }}
          >
            <View className={styles['select-year-wrapper']}>
              <Text className={styles['select-year']}>{currentDate} 年</Text>
              <AtIcon value="chevron-right" size="18" color="#fff" />
            </View>
          </Picker>

          {/* 总览 */}
          <View className={styles['overview-wrapper']}>
            <View className={styles['item']}>
              <View className={styles['con']}>
                <Text className={styles['label']}>剩余</Text>
                <Text className={styles['value']}>
                  {transferAmount(balance, 'yuan')} 元
                </Text>
              </View>
            </View>
            <View className={styles['item']}>
              <View className={styles['con']}>
                <Text className={styles['label']}>支出</Text>
                <Text className={styles['value']}>
                  {transferAmount(expenditure, 'yuan')} 元
                </Text>
              </View>
              <View className={styles['con']}>
                <Text className={styles['label']}>收入</Text>
                <Text className={styles['value']}>
                  {transferAmount(income, 'yuan')} 元
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className={styles['list-wrapper']}>
        <View className={styles['summary-header']}>
          <View className={styles['summary-item']}>
            <View className={setClassName([styles['item'], styles['label']])}>
              <Text className={styles['text']}>月份</Text>
            </View>
            <View className={styles['item']}>
              <Text className={styles['text']}>收入</Text>
            </View>
            <View className={styles['item']}>
              <Text className={styles['text']}>支出</Text>
            </View>
            <View className={styles['item']}>
              <Text className={styles['text']}>结余</Text>
            </View>
          </View>
        </View>
        <View className={styles['list-con']}>
          <Scroll page={1} totalPage={0} updatePage={() => {}} cref={scrollRef}>
            {list.map(({ id, income, expenditure, label, balance }) => (
              <View className={styles['summary-item']} key={id}>
                <View
                  className={setClassName([styles['item'], styles['label']])}
                >
                  <Text className={styles['text']}>{label}</Text>
                </View>
                <View className={styles['item']}>
                  <Text className={styles['text']}>
                    {transferAmount(income, 'yuan')} 元
                  </Text>
                </View>
                <View className={styles['item']}>
                  <Text className={styles['text']}>
                    {transferAmount(expenditure, 'yuan')} 元{' '}
                  </Text>
                </View>
                <View className={styles['item']}>
                  <Text className={styles['text']}>
                    {transferAmount(balance, 'yuan')} 元
                  </Text>
                </View>
              </View>
            ))}
          </Scroll>
        </View>
      </View>
    </View>
  );
};
export default Summary;
