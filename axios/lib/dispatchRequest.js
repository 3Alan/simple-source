import adapters from './adapters/index.js';

export default function dispatchRequest(config) {
  const adapter = adapters(config);

  return adapter.then(async function onAdapterResolution(response) {
    try {
      const res = await response.json();
      return {...res, config}
    } catch (error) {
      return Promise.reject(response);
    }
  }, function onAdapterRejection(reason) {
    return Promise.reject(reason);
  });
}
