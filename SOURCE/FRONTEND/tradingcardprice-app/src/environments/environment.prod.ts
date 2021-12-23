import { environment as defaultEnvironment } from './environment.default';

export const environment = {
  ...defaultEnvironment,
  production: true,
  app: {
    baseUrl: 'https://gruppe11.testsites.info/',
  },
  api: {
    baseUrl: 'https://gruppe11.testsites.info:3029/',
  },
};
