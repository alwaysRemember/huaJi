/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 15:36:56
 * @LastEditTime: 2020-12-17 20:15:45
 * @FilePath: /huaJi/client/src/store/reducers/index.ts
 */

import { combineReducers } from 'redux';
import { IReducers } from '../../interface/store';
import * as global from './global';
import * as user from './user';
export default combineReducers<IReducers>({ ...global, ...user });
