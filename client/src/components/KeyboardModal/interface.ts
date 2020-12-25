/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-25 15:04:08
 * @LastEditTime: 2020-12-25 18:28:34
 * @FilePath: /huaJi/client/src/components/KeyboardModal/interface.ts
 */

import { MutableRefObject } from 'react';

export interface IKeyboardModalProps {
  cref: MutableRefObject<IKeyboardRefParams | null>;
  submit: (data: IKeyboardInputData) => void;
}
export interface IKeyboardRefParams {
  changeShow: (type: boolean) => void;
}

export interface IKeyboardInputData {
  remarks: string;
  money: number;
  date: Date;
}
