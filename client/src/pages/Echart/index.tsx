import { View } from '@tarojs/components';
import Taro, { Component, useDidShow } from '@tarojs/taro';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'redux-react-hook';
import { ETabBarEnum } from '../../custom-tab-bar/enums';
import { updateTabBarSelect } from '../../store/actions';
//  @ts-ignore
import * as echarts from '../../components/ec-canvas/echarts';
import styles from './index.module.scss';

const Echart = () => {
  const dispatch = useDispatch();

  const onInit = (canvas, width, height, dpr) => {
    const chart = echarts.init(canvas, null, {
      width,
      height,
      devicePixelRatio: dpr,
    });
    canvas.setChart(chart);
    const option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {},
        },
      ],
    };
    chart.setOption(option);
    return chart;
  };

  useDidShow(() => {
    dispatch(updateTabBarSelect(ETabBarEnum.ECHART));
  });

  return (
    <View className={styles['echart-wrapper']}>
      <View className={styles['chart']}>
        {/* @ts-ignore */}
        <ec-canvas canvas-id="mychart-bar" ec={{ onInit }} />
      </View>
    </View>
  );
};
export default Echart;
