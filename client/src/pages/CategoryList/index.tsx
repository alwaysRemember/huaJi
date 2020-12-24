import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { AtSegmentedControl } from 'taro-ui';
import { getCategoryList } from '../../api';
import styles from './index.module.scss';
import { ICategoryListItem } from './interface';
import { ECategoryTypeEnum } from './enums';
import { setClassName } from '../../utils';

const CategoryList = () => {
  const [exportList, setExportList] = useState<Array<ICategoryListItem>>(
    [...Array(9).keys()].map(i => ({
      id: `${i}`,
      type: ECategoryTypeEnum.EXPORT,
      name: '',
      icon: '',
    })),
  );
  const [incomeList, setIncomeList] = useState<Array<ICategoryListItem>>([]);
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const getData = async () => {
    try {
      const { exportList, incomeList } = await getCategoryList();
      setExportList(exportList);
      setIncomeList(incomeList);
    } catch (e) {}
  };

  const categoryClick = (id: string, type: ECategoryTypeEnum) => {
    console.log(id, type);
  };
  useEffect(() => {
    getData();
  }, []);

  const CategoryList = ({ list }: { list: Array<ICategoryListItem> }) => {
    return (
      <View className={styles['category-list-con']}>
        {list.map(({ id, name, icon, type }) => (
          <View
            className={styles['category-item']}
            key={id}
            onClick={() => {
              categoryClick(id, type);
            }}
          >
            <View className={styles['icon-wrapper']}>
              <View className={styles['icon']}>
                <Image src={icon} className={styles['icon']} />
              </View>
            </View>
            <Text
              className={setClassName([
                styles['name'],
                name ? '' : styles['skeleton-name'],
              ])}
            >
              {name}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  return (
    <View className={styles['category-list-wrapper']}>
      <View className={styles['tabs-nav-wrapper']}>
        <View className={styles['tabs-nav-con']}>
          <AtSegmentedControl
            current={currentTabIndex}
            values={['支出', '收入']}
            onClick={index => setCurrentTabIndex(index)}
            className={styles['tabs-nav']}
          />
        </View>
      </View>
      <View className={styles['category-list-con-wrapper']}>
        <CategoryList list={currentTabIndex === 0 ? exportList : incomeList} />
      </View>
    </View>
  );
};
export default CategoryList;
