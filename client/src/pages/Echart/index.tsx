import { View, Text, Picker, CoverView, ScrollView } from '@tarojs/components';
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
import { request } from '../../utils/wxUtils';
import {
  EPieChartType,
  ICategoryDataItem,
  IEchartRequestParams,
  IEchartResponseData,
} from './interface';
import { setClassName, transferAmount } from '../../utils';

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
  const [canGetData, setCanGetData] = useState<boolean>(true);
  const [lineChart, setLineChart] = useState<any>(null);
  const [pieChart, setPieChart] = useState<any>(null);
  const [pieChartType, setPieChartType] = useState<EPieChartType>(
    EPieChartType.EXPENDITURE,
  ); //显示的饼图类型

  const [
    expenditureCategoryDataList,
    setExpenditureCategoryDataList,
  ] = useState<Array<ICategoryDataItem>>([]);
  const [incomeCategoryDataList, setIncomeCategoryDataList] = useState<
    Array<ICategoryDataItem>
  >([]);

  // 折线图初始化
  const lineChartInit = (canvas, width, height, dpr) => {
    const chart = echarts.init(canvas, null, {
      width,
      height,
      devicePixelRatio: dpr,
    });
    canvas.setChart(chart);

    setLineChart(chart);
    return chart;
  };

  //  饼图初始化
  const pieChartInit = (canvas, width, height, dpr) => {
    const chart = echarts.init(canvas, null, {
      width,
      height,
      devicePixelRatio: dpr,
    });
    canvas.setChart(chart);

    setPieChart(chart);
    return chart;
  };

  const tabsClick = (index: number) => {
    setSelectMonthIndex(index);
  };

  const getData = async () => {
    if (!lineChart || !pieChart) return;
    if (!canGetData) return;
    setCanGetData(false);
    try {
      const {
        expenditureList,
        incomeList,
        expenditureCategoryDataList,
        incomeCategoryDataList,
      } = await request<IEchartResponseData, IEchartRequestParams>(
        'getEchartData',
        { year: selectYear, month: selectMonth },
      );
      const fn = (i: number): string => transferAmount(i, 'yuan') as string;
      updateLineChart(
        expenditureList.map(i => fn(i)),
        incomeList.map(i => fn(i)),
      );
      setPieChartType(EPieChartType.EXPENDITURE);
      updatePieChart(expenditureCategoryDataList);
      setExpenditureCategoryDataList(expenditureCategoryDataList);
      setIncomeCategoryDataList(incomeCategoryDataList);
    } catch (e) {}
    setCanGetData(true);
  };

  const updatePieChart = (data: Array<ICategoryDataItem>) => {
    data = data.length
      ? data
      : [
          {
            name: '无数据',
            money: 0,
          },
        ];

    const option = {
      title: {
        text: `${
          pieChartType === EPieChartType.EXPENDITURE ? '支出' : '收入'
        }分类信息`,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} {b} : {c}元 ({d}%)',
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: data.map(({ name }) => name),
        selected: data.reduce((pre, cur) => {
          pre[cur.name] = true;
          return pre;
        }, {}),
      },
      series: [
        {
          name: '类别',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data.map(({ name, money }) => ({
            name,
            value: transferAmount(money, 'yuan'),
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    if (pieChart) {
      pieChart.setOption(option);
    }
  };

  /**
   * 折线图数据更新
   * @param expenditureList 支出数据
   * @param incomeList  收入数据
   */
  const updateLineChart = (
    expenditureList: Array<string>,
    incomeList: Array<string>,
  ) => {
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
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6ac5d7',
          },
        },
      },
      legend: {
        data: ['支出', '收入'],
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
        name: '金额（元）',
        axisLabel: {
          formatter: '{value} 元',
        },
      },
      series: [
        {
          color: '#559eac',
          name: '支出',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: expenditureList,
        },
        {
          color: '#6ac5d7',
          name: '收入',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: incomeList,
        },
      ],
    };
    if (lineChart) {
      lineChart.setOption(option);
    }
  };

  //  监听饼图切换
  useEffect(() => {
    if (pieChartType === EPieChartType.EXPENDITURE) {
      updatePieChart(expenditureCategoryDataList);
    } else {
      updatePieChart(incomeCategoryDataList);
    }
  }, [pieChartType]);

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
    getData();
  });

  useEffect(() => {
    /* 为了处理年份选择后立即重置月份的情况造成两次请求的问题 */
    const timer = setTimeout(() => {
      getData();
    }, 50);
    return () => {
      clearTimeout(timer);
    };
  }, [selectYear, selectMonth, lineChart, pieChart]);

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
      <ScrollView scrollY className={styles['scroll-view']}>
        <AtTabs
          className={styles['tabs-wrapper']}
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
        <View className={styles['pie-chart-wrapper']}>
          <View className={styles['pie-chart-top']}>
            <Text className={styles['title']}>分类占比</Text>
            <View className={styles['pie-chart-type-wrapper']}>
              {[
                {
                  value: '支出',
                  type: EPieChartType.EXPENDITURE,
                },
                {
                  value: '收入',
                  type: EPieChartType.INCOME,
                },
              ].map(({ value, type }) => (
                <Text
                  className={setClassName([
                    styles['item'],
                    type === pieChartType ? styles['on'] : '',
                  ])}
                  key={type}
                  onClick={() => {
                    setPieChartType(type);
                  }}
                >
                  {value}
                </Text>
              ))}
            </View>
          </View>
          <View className={styles['pie-chart']}>
            {/* @ts-ignore */}
            <ec-canvas canvas-id="pie-chart" ec={{ onInit: pieChartInit }} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Echart;
