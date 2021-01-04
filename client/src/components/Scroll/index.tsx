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
  const [scrollTop, setScrollTop] = useState<number>(0);
  const scrollTimed = useRef<NodeJS.Timeout>(); // scroll方法监听

  useEffect(() => {
    if (page === 1) {
      setScrollTop(0);
    }
  }, [page]);

  return (
    <ScrollView
      upperThreshold={150}
      scrollY
      scrollTop={scrollTop}
      scrollWithAnimation
      className={styles['scroll-wrapper']}
      show-showScrollbar={false}
      enable-back-to-top
      onScroll={({ detail: { scrollTop: top } }) => {
        scrollTimed.current && clearTimeout(scrollTimed.current);
        scrollTimed.current = setTimeout(() => {
          setScrollTop(top);
        }, 500);
      }}
      onScrollToLower={() => {
        if (loadMoreStatus === 'loading') return;
        const p = page + 1;
        if (p > totalPage) return;
        updatePage(p);
      }}
    >
      {children}
      {/* 加载中以及加载完毕 */}
      {page <= totalPage && (
        <AtLoadMore
          status={loadMoreStatus}
          moreText="等待加载"
          moreBtnStyle={{
            color: '#6ac5d7',
          }}
        />
      )}
    </ScrollView>
  );
};

export default Scroll;
