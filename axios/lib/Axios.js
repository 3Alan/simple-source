import dispatchRequest from './dispatchRequest';
import InterceptorManager from './InterceptorManager';

export default class Axios {
  constructor(config) {
    this.defaultConfig = config;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }

  request(config) {
    let promise;
    let i = 0;
    const requestInterceptorChain = [];
    const responseInterceptorChain = [];

    this.interceptors.request.handlers.forEach(({ fulfilled, rejected }) => {
      requestInterceptorChain.unshift(fulfilled, rejected);
    });
    this.interceptors.response.handlers.forEach(({ fulfilled, rejected }) => {
      responseInterceptorChain.push(fulfilled, rejected);
    });

    const chain = [
      ...requestInterceptorChain,
      dispatchRequest,
      undefined,
      ...responseInterceptorChain
    ];

    let len = chain.length;

    // 将config转化成promise对象
    promise = Promise.resolve({...this.defaultConfig, ...config});

    while (i < len) {
      promise = promise.then(chain[i++], chain[i++]);
    }

    return promise;
  }

  get(url, config) {
    const mergedConfig = { ...config, url };
    return this.request(mergedConfig);
  }
}
