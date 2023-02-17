import xhr from './xhr';

const knownAdapters = {
  // TODO: 
  http: undefined,
  xhr: xhr
};

const currentAdapter = 'xhr';

export default async function adapters(config) {
  const adapter = knownAdapters['xhr'];

  if (currentAdapter === 'xhr') {
    return adapter(config);
  }
}
