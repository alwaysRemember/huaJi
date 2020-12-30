import React, { useState, useEffect, useMemo } from 'react';
import Taro, { pxTransform } from '@tarojs/taro';
import { IImagePreload } from './interface';
import { View, Image } from '@tarojs/components';
import { setClassName } from '../../utils';
import { AtIcon } from 'taro-ui';
import styles from './index.module.scss';
/* 图片预加载 */
const ImagePreload = ({
  src,
  width,
  height,
  borderRadius = 0,
  hasBg = true,
}: IImagePreload) => {
  const [isLoad, setIsLoad] = useState<boolean>(false); // 是否加载成功
  const [isError, setIsError] = useState<boolean>(false); // 是否加载失败

  return useMemo(
    () => (
      <View className={styles['image-preload-wrapper']}>
        {(!isLoad || isError) && (
          <View
            className={setClassName([styles['image-preload'], styles['no-bg']])}
            style={{
              width: pxTransform(width),
              height: pxTransform(height),
              borderRadius: pxTransform(borderRadius),
            }}
          >
            {(isError && (
              <AtIcon
                prefixClass="icon"
                value="tupianjiazaishibai"
                className={styles['icon']}
              />
            )) || (
              <AtIcon
                value="loading-2"
                className={setClassName([
                  styles['icon'],
                  styles['loading-icon'],
                ])}
              />
            )}
          </View>
        )}
        <Image
          src={src}
          mode="widthFix"
          lazyLoad
          className={setClassName([
            styles['image'],
            isError ? styles['error'] : '',
          ])}
          style={{
            borderRadius: pxTransform(borderRadius),
          }}
          onLoad={() => {
            setIsLoad(true);
          }}
          onError={() => {
            setIsError(true);
          }}
        />
      </View>
    ),
    [src, isLoad, isError],
  );
};

export default ImagePreload;
