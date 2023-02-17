import xhr from './xhr';
import http from './http';

const knownAdapters = {
  http,
  xhr
};

export default async function adapters(config) {
  let adapter;
  for (const key in knownAdapters) {
    if (knownAdapters[key]) {
      adapter = knownAdapters[key];
    }
  }

  return adapter(config);
}
