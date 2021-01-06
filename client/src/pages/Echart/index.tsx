import { View, Text, Picker } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'redux-react-hook';
import { ETabBarEnum } from '../../custom-tab-bar/enums';
import { updateTabBarSelect } from '../../store/actions';
//  @ts-ignore
import * as echarts from '../../components/ec-canvas/echarts';
import styles from './index.module.scss';
import moment from 'moment';
import { AtIcon, AtTabs } from 'taro-ui';
import { useCheckLogin } from '../../hooks';

const Echart = () => {
  const [nowYear, nowMonth]: Array<string> = moment()
    .format('YYYY-MM')
    .split('-');
  const dispatch = useDispatch();
  const checkLogin = useCheckLogin();

  const [selectYear, setSelectYear] = useState<string>(nowYear);
  const [selectMonth, setSelectMonth] = useState<string>(nowMonth);
  const [selectYearIndex, setSelectYearIndex] = useState<Array<string>>([]);
  const [selectMonthIndex, setSelectMonthIndex] = useState<number>(0);

  const [monthList, setMonthList] = useState<Array<string>>([]);
  const [yearList, setYearList] = useState<Array<string>>([]);

  const lineChart = useRef<any>(null);

  // 折线图初始化
  const lineChartInit = (canvas, width, height, dpr) => {
    const chart = echarts.init(canvas, null, {
      width,
      height,
      devicePixelRatio: dpr,
    });
    canvas.setChart(chart);
    lineChart.current = chart;
    return chart;
  };

  const tabsClick = (index: number) => {
    setSelectMonthIndex(index);
  };

  const getData = () => {
    setTimeout(() => {
      updateLineChart();
    });
  };

  // 折线图数据更新
  const updateLineChart = () => {
    const yearXAxisData = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ];
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['邮件营销', '联盟广告'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data:
          selectMonth === 'ALL'
            ? yearXAxisData
            : [
                ...Array(
                  new Date(
                    Number(selectYear),
                    Number(selectMonth),
                    0,
                  ).getDate(),
                ).keys(),
              ].map(i => {
                i++;
                return i < 10 ? `0${i}号` : `${i}号`;
              }),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          color: '#559eac',
          name: '支出',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          color: '#6ac5d7',
          name: '收入',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    };
    console.log(lineChart.current);

    if (lineChart.current) {
      lineChart.current.setOption(option);
    }
  };

  // 监听年份选择，渲染月份列表
  useEffect(() => {
    const nowYear = new Date().getFullYear();
    // 如果选择的年份小于当前的年份则月列表为13，否则为当前月+1 (包含整年选项)
    const list: Array<string> = [
      ...Array(Number(selectYear) < nowYear ? 13 : Number(nowMonth) + 1).keys(),
    ].map(i => {
      if (i) {
        return i < 10 ? `0${i}` : i + '';
      }
      return 'ALL';
    });
    if (Number(selectYear) === nowYear) {
      setSelectMonthIndex(list.findIndex(item => item === nowMonth));
    } else {
      setSelectMonthIndex(0);
    }
    setMonthList(list);
  }, [selectYear]);

  useEffect(() => {
    if (!monthList.length) return;
    setSelectMonth(monthList[selectMonthIndex]);
  }, [selectMonthIndex, monthList]);

  // 监听年份列表，选择默认选择的年份
  useEffect(() => {
    if (!yearList.length) return;
    const index = yearList.findIndex(item => item === nowYear);

    setSelectYearIndex([index + '']);
  }, [yearList]);

  // 根据选择的年份下标，设置年份值
  useEffect(() => {
    if (!yearList.length || !selectYearIndex.length) return;
    const [index] = selectYearIndex;

    setSelectYear(yearList[index]);
  }, [selectYearIndex, yearList]);

  useDidShow(() => {
    const yearList = [...Array(20).keys()].map(k =>
      String(Number(nowYear) - k),
    );
    yearList.reverse();
    setYearList(yearList);
    dispatch(updateTabBarSelect(ETabBarEnum.ECHART));
  });

  useEffect(() => {
    getData();
  }, [selectYear, selectMonth, lineChart.current]);

  return (
    <View className={styles['echart-wrapper']}>
      <View className={styles['select-date-wrapper']}>
        <View className={styles['select-date-con']}>
          <Picker
            mode="multiSelector"
            range={[yearList]}
            value={selectYearIndex}
            onChange={e => {
              checkLogin().then(() => {
                setSelectYearIndex(e.detail.value.map(i => i + ''));
              });
            }}
          >
            <View className={styles['select-year-wrapper']}>
              <Text className={styles['select-year']}>{selectYear} 年</Text>
              <AtIcon value="chevron-right" size="18" color="#fff" />
            </View>
          </Picker>
        </View>
      </View>
      <AtTabs
        swipeable={false}
        scroll={monthList.length > 4}
        current={selectMonthIndex}
        tabList={monthList.map(i => ({
          title: i !== 'ALL' ? `${i}月` : '全年',
        }))}
        onClick={tabsClick}
      />
      <View className={styles['line-chart']}>
        {/* @ts-ignore */}
        <ec-canvas canvas-id="line-chart" ec={{ onInit: lineChartInit }} />
      </View>
    </View>
  );
};
export default Echart;
