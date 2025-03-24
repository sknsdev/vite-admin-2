import axios from 'axios';
import appConfig from '@/configs/app.config';
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from '@/constants/api.constant';
import { PERSIST_STORE_NAME } from '@/constants/app.constant';
import deepParseJson from '@/utils/deepParseJson';

let onUnauthorized: (() => void) | null = null;

const BaseService = axios.create({
  timeout: 60000,
  baseURL: appConfig.apiPrefix,
});

BaseService.interceptors.request.use(
  (config) => {
    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
    const persistData = deepParseJson(rawPersistData);
    const accessToken = (persistData as any)?.auth?.session?.token;

    if (accessToken) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

BaseService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && onUnauthorized) {
      onUnauthorized();
    }
    return Promise.reject(error);
  }
);

export const setUnauthorizedHandler = (handler: () => void) => {
  onUnauthorized = handler;
};

export default BaseService;
