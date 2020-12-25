import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AtSegmentedControl } from 'taro-ui';
import { getCategoryList } from '../../api';
import styles from './index.module.scss';
import { ICategoryListItem } from './interface';
import { ECategoryTypeEnum } from './enums';
import { setClassName } from '../../utils';
import KeyboardModal from '../../components/KeyboardModal';
import {
  IKeyboardInputData,
  IKeyboardRefParams,
} from '../../components/KeyboardModal/interface';
import ImagePreload from '../../components/ImagePreload';

const CategoryList = () => {
  const [exportList, setExportList] = useState<Array<ICategoryListItem>>(
    [...Array(15).keys()].map(i => ({
      id: `${i}`,
      type: ECategoryTypeEnum.EXPORT,
      name: '',
      icon: '',
    })),
  );
  const [incomeList, setIncomeList] = useState<Array<ICategoryListItem>>([]);
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const [
    currentCategory,
    setCurrentCategory,
  ] = useState<ICategoryListItem | null>(null);

  const keyboardModalRef = useRef<IKeyboardRefParams>(null);

  const getData = async () => {
    try {
      const { exportList, incomeList } = await getCategoryList();
      setExportList(exportList);
      setIncomeList(incomeList);
    } catch (e) {}
  };

  const categoryClick = (data: ICategoryListItem) => {
    setCurrentCategory(data);
    keyboardModalRef.current?.changeShow(true);
  };

  const submit = (data: IKeyboardInputData) => {
    console.log(data);
    keyboardModalRef.current?.changeShow(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const CategoryList = ({ list }: { list: Array<ICategoryListItem> }) => {
    return useMemo(
      () => (
        <View className={styles['category-list-con']}>
          {list.map(item => (
            <View
              className={styles['category-item']}
              key={item.id}
              onClick={() => {
                categoryClick(item);
              }}
            >
              <View className={styles['icon-wrapper']}>
                <View className={styles['icon']}>
                  <ImagePreload
                    src={item.icon}
                    width={64}
                    height={64}
                    hasBg={false}
                  />
                </View>
              </View>
              <Text
                className={setClassName([
                  styles['name'],
                  item.name ? '' : styles['skeleton-name'],
                ])}
              >
                {item.name}
              </Text>
            </View>
          ))}
        </View>
      ),
      [list],
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

      {/* 键盘输入modal */}
      <KeyboardModal cref={keyboardModalRef} submit={submit} />
    </View>
  );
};
export default CategoryList;
