import qs from 'query-string';
import axios from 'axios';
import type {RouteRecordNormalized} from 'vue-router';
import {UserState} from '@/store/modules/user/types';

export interface UserParams extends Partial<UserState> {
  current: number;
  pageSize: number;
}

export interface UserListRes {
  records: UserState[];
  total: number;
}

export function queryUserList(params: UserParams) {
  return axios.get<UserListRes>('/api/user/list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj, {
        // 如果为Null或undefined、不参与拼接
        skipNull: true,
        // 如果为空字符串、不参与拼接
        skipEmptyString: true,
      });
    },
  });
}


/// 删除账号

/// 更新操作


