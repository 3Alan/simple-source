const isHttpAdapterSupported = typeof process !== 'undefined';

export default isHttpAdapterSupported &&
  function httpAdapter(config) {
    // TODO: 暂未实现
    return config;
  };
