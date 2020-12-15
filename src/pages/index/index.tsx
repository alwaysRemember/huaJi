import React from 'react';
import { AtButton } from 'taro-ui';
import { View, Text } from '@tarojs/components';
import './index.scss';

const Index = () => {
  return (
    <View className="index">
      <AtButton type="primary">test</AtButton>
      <Text>Hello world!</Text>
    </View>
  );
};
export default Index;
