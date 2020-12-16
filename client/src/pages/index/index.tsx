import React, { useEffect } from 'react';
import { AtButton } from 'taro-ui';
import { View, Text } from '@tarojs/components';
import './index.scss';

const Index = () => {
  useEffect(() => {
    wx.cloud.init({
      env: 'huaji-server-prod-2egmhbb1fd0438',
    });
    wx.cloud
      .callFunction({
        name: 'test',
      })
      .then(res => {
        console.log(res);
      });
  }, []);
  return (
    <View className="index">
      <AtButton type="primary">test</AtButton>
      <Text>Hello world!</Text>
    </View>
  );
};
export default Index;
