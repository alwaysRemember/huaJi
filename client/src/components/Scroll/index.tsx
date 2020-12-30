import { ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { AtLoadMore } from 'taro-ui';
import styles from './index.module.scss';
import { IScrollProps, TLoadMoreStatus } from './interface';
const Scroll = ({
  children,
  page,
  totalPage,
  updatePage,
  cref,
}: PropsWithChildren<IScrollProps>) => {
  useImperativeHandle(cref, () => ({
    changeLoadMoreStatus: type => {
      setLoadMoreStatus(type);
    },
  }));

  const [loadMoreStatus, setLoadMoreStatus] = useState<TLoadMoreStatus>('more');

  return (
    <ScrollView
      upperThreshold={150}
      scrollY
      scrollWithAnimation
      className={styles['scroll-wrapper']}
      show-showScrollbar={false}
      enable-back-to-top
      onScrollToLower={() => {
        if (loadMoreStatus === 'loading') return;
        const p = page + 1;
        if (p > totalPage) return;
        updatePage(p);
      }}
    >
      {children}
      {/* 加载中以及加载完毕 */}
      <AtLoadMore
        status={loadMoreStatus}
        moreText="等待加载"
        moreBtnStyle={{
          color: '#6ac5d7',
        }}
      />
    </ScrollView>
  );
};

export default Scroll;
