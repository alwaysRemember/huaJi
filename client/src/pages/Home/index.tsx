import Taro, { useDidHide, useDidShow } from '@tarojs/taro';
import { AtButton, AtIcon, AtMessage } from 'taro-ui';
import { View, Text, Picker } from '@tarojs/components';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useDispatch } from 'redux-react-hook';
import { updateTabBarSelect } from '../../store/actions';
import { ETabBarEnum } from '../../custom-tab-bar/enums';
import { useCheckLogin } from '../../hooks';
import moment from 'moment';
import ImagePreload from '../../components/ImagePreload';
import { setClassName, transferAmount } from '../../utils';
import Scroll from '../../components/Scroll';
import { IHomeRequestData, IHomeResponseData, IRecordItem } from './interface';
import { request } from '../../utils/wxUtils';
import { categoryListPath } from '../../router';
import { ECategoryTypeEnum } from '../CategoryList/enums';

const Home = () => {
  const date = moment(new Date()).format('YYYY-MM');
  const checkLogin = useCheckLogin();
  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState<string>(date);
  const [currentDateIndex, setCurrentDateIndex] = useState<Array<string>>([]);
  const [selectYearList, setSelectYearList] = useState<Array<string>>([]);
  const [selectMonthList, setSelectMonthList] = useState<Array<string>>([]);

  const [monthMaxMoney, setMonthMaxMoney] = useState<number>(0);
  const [amountUsed, setAmountUsed] = useState<number>(0);
  const [unusedAmount, setUnusedAmount] = useState<number>(0);

  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [list, setList] = useState<Array<IRecordItem>>([]);
  const canRequest = useRef<boolean>(true);

  const getData = async (params?: IHomeRequestData) => {
    if (!canRequest.current) return;
    canRequest.current = false;
    const {
      list: responseList,
      totalPage,
      unusedAmount,
      amountUsed,
      monthMaxMoney,
    } = await request<IHomeResponseData>(
      'getHomeData',
      params ? params : { page, currentDate },
      page === 1,
    );

    setList(page === 1 ? responseList : list.concat(responseList));
    setTotalPage(totalPage);
    setUnusedAmount(unusedAmount);
    setAmountUsed(amountUsed);
    setMonthMaxMoney(monthMaxMoney);

    const hasExceeded = amountUsed > monthMaxMoney; // 已经超出上限
    const aboutToExceed = amountUsed + monthMaxMoney * 0.2 >= monthMaxMoney; // 即将超出上限 已使用金额+最大金额的两成>=最大金额

    // tips
    if ((hasExceeded || aboutToExceed) && monthMaxMoney) {
      Taro.atMessage({
        message: `本月的支出${
          hasExceeded ? '已经' : aboutToExceed ? '即将' : ''
        }超过上限，请注意花销哦！！！！！！`,
        type: 'warning',
      });
    }
    canRequest.current = true;
  };

  // 设置年份数组和月份数组
  useEffect(() => {
    const [year, month] = date.split('-');
    const yearList = [...Array(20).keys()].map(k => String(Number(year) - k));
    const monthList = [...Array(12).keys()].map(k => String(k + 1));
    yearList.reverse();

    setSelectYearList(yearList);
    setSelectMonthList(monthList);
    const yearIndex = yearList.findIndex(v => v === year);
    const monthIndex = monthList.findIndex(v => v === month);
    setCurrentDateIndex([yearIndex + '', monthIndex + '']);
  }, []);

  // 监听日期选择器
  useEffect(() => {
    if (!currentDateIndex.length) return;
    const [yearIndex, monthIndex] = currentDateIndex;

    setCurrentDate(
      `${selectYearList[yearIndex]}-${selectMonthList[monthIndex]}`,
    );
  }, [currentDateIndex]);

  useEffect(() => {
    getData();
  }, [page]);
  useEffect(() => {
    if (page === 1) {
      getData({ page, currentDate });
    } else {
      setPage(1);
    }
  }, [currentDate]);

  useDidShow(() => {
    getData({ page, currentDate });
    dispatch(updateTabBarSelect(ETabBarEnum.HOME));
  });

  useDidHide(() => {
    setPage(1);
    setCurrentDate(date);
    const [year, month] = date.split('-');
    const yearIndex = selectYearList.findIndex(v => v === year);
    const monthIndex = selectMonthList.findIndex(v => v === month);
    setCurrentDateIndex([yearIndex + '', monthIndex + '']);
  });

  return (
    <View className={styles['home-wrapper']}>
      <View className={styles['top-info-wrapper']}>
        <View className={styles['top-info-con']}>
          <View className={styles['baofu-icon']}>
            <ImagePreload
              width={180}
              height={180}
              hasBg={false}
              src="https://6875-huaji-server-prod-2egmhbb1fd0438-1304528052.tcb.qcloud.la/baofu.gif?sign=566c457cc763eaf09e492581bf655059&t=1609146132"
            />
          </View>
          <View className={styles['date-and-money-wrapper']}>
            {/* 时间选择 */}
            <Picker
              mode="multiSelector"
              range={[selectYearList, selectMonthList]}
              value={currentDateIndex}
              onChange={e => {
                checkLogin().then(() => {
                  setCurrentDateIndex(e.detail.value.map(i => i + ''));
                });
              }}
            >
              <View className={styles['select-date']}>
                <Text className={styles['year']}>
                  {currentDate.split('-')[0]}年
                </Text>
                <View className={styles['month-wrapper']}>
                  <Text className={styles['month']}>
                    {currentDate.split('-')[1]}月
                  </Text>
                  <AtIcon value="chevron-down" size="16" color="#fff" />
                </View>
              </View>
            </Picker>
            {/* 金额展示 */}
            <View className={styles['money-wrapper']}>
              <View className={styles['money-item']}>
                <Text className={styles['label']}>总金额</Text>
                <Text className={styles['money']}>
                  {transferAmount(monthMaxMoney, 'yuan')}
                </Text>
              </View>
              <View className={styles['money-item']}>
                <Text className={styles['label']}>已使用</Text>
                <Text
                  className={setClassName([
                    styles['money'],
                    amountUsed > monthMaxMoney ? styles['beyond'] : '',
                  ])}
                >
                  {transferAmount(amountUsed, 'yuan')}
                </Text>
              </View>
              <View className={styles['money-item']}>
                <Text className={styles['label']}>未使用</Text>
                <Text className={styles['money']}>
                  {transferAmount(unusedAmount, 'yuan')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 账单记录 */}
      <View className={styles['billing-record-wrapper']}>
        <Scroll
          page={page}
          totalPage={totalPage}
          isGetData={canRequest.current}
          updatePage={page => {
            setPage(page);
          }}
        >
          <View className={styles['record-wrapper']}>
            {(!!list.length &&
              list.map(
                ({
                  id,
                  categoryName,
                  money,
                  recordDate,
                  remarks,
                  categoryType,
                }) => (
                  <View className={styles['record-item']} key={id}>
                    <Text className={styles['record-date']}>
                      {moment(recordDate).format('YYYY-MM-DD')}
                    </Text>
                    <View className={styles['category']}>
                      <Text className={styles['label']}>{categoryName}</Text>
                      <Text className={styles['remarks']}>{remarks}</Text>
                    </View>
                    <Text
                      className={setClassName([
                        styles['money'],
                        categoryType === ECategoryTypeEnum.EXPORT
                          ? styles['export']
                          : '',
                      ])}
                    >
                      {categoryType === ECategoryTypeEnum.EXPORT ? '-' : '+'}
                      {transferAmount(money, 'yuan')}元
                    </Text>
                  </View>
                ),
              )) || (
              <View className={styles['no-record-wrapper']}>
                <AtIcon
                  prefixClass="icon"
                  value="meiyoushuju"
                  className={styles['icon']}
                  size="34"
                />
                <AtButton
                  type="primary"
                  className={styles['add-record']}
                  circle
                  size="small"
                  onClick={() => {
                    Taro.navigateTo({
                      url: categoryListPath(),
                    });
                  }}
                >
                  添加记录
                </AtButton>
                <Text className={styles['msg']}>
                  暂无账单记录,赶紧来记录一笔吧~
                </Text>
              </View>
            )}
          </View>
        </Scroll>
      </View>
      <AtMessage />
    </View>
  );
};
export default Home;
