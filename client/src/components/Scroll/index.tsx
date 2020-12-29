import { ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { AtLoadMore } from 'taro-ui';
import styles from './index.module.scss';
import { IScrollProps } from './interface';
const Scroll = ({
  children,
  page,
  totalPage,
  updatePage,
  isGetData,
}: PropsWithChildren<IScrollProps>) => {
  const scrollTop = useRef<number>(0); // 滚动高度
  const scrollTimed = useRef<NodeJS.Timeout>(); // scroll方法监听

  useEffect(() => {
    if (page === 1) {
      scrollTop.current = 0;
    }
  }, [page]);
  return (
    <ScrollView
      scrollY
      className={styles['scroll-wrapper']}
      enhanced
      paging-enabled
      show-showScrollbar={false}
      enable-back-to-top
      scrollTop={scrollTop.current}
      onScroll={({ detail: { scrollTop: top } }) => {
        scrollTimed.current && clearTimeout(scrollTimed.current);
        scrollTimed.current = setTimeout(() => {
          scrollTop.current = top;
        }, 500);
      }}
      onScrollToLower={() => {
        const p = page + 1;
        if (p > totalPage) return;
        updatePage(p);
      }}
    >
      {children}
      {/* 加载中以及加载完毕 */}
      {((page > 1 && isGetData) || (page === totalPage && !isGetData)) && (
        <AtLoadMore status={(isGetData && 'loading') || 'noMore'} />
      )}
    </ScrollView>
  );
};

export default Scroll;
