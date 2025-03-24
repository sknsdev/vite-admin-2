import BaseService from './BaseService';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const ApiService = {
  fetchData<TReq, TRes>(config: AxiosRequestConfig<TReq>): Promise<AxiosResponse<TRes>> {
    console.log('fetchData')
    return new Promise((resolve, reject) => {
      BaseService(config)
        .then((response: AxiosResponse<TRes>) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  },
};

export default ApiService;
