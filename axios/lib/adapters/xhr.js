const isXHRAdapterSupported = typeof fetch !== 'undefined';

export default isXHRAdapterSupported &&
  async function xhrAdapter(config) {
    if (config.timeout) {
      const controller = new AbortController();
      const abortId = setTimeout(() => {
        controller.abort();
      }, config.timeout);

      const res = await fetch(config.url, { ...config, signal: controller.signal });

      clearTimeout(abortId);

      return res;
    }

    return fetch(config.url, config);
  };
