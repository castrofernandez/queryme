'use strict';

const {Options} = require('./options');

const localStorageKey = 'querystringme.parameters';

const readFromStorage = () => getStorage().getItem(localStorageKey) || '{}';

const getStorage = () => getStorageFromWindow(window);

const getStorageFromWindow = ({localStorage = {}}) => localStorage;

const isCompatible = () => window && Object.keys(getStorage()).length > 0;

const isEnabled = () => Options.get('local_storage') && isCompatible();

const Storage = {
  update: (data) => {
    return isEnabled()
      ? getStorage().setItem(localStorageKey, JSON.stringify(data))
      : false;
  },
  get: () => {
    return isEnabled()
      ? JSON.parse(readFromStorage())
      : {};
  },
  size: () => isEnabled() ? Object.keys(getStorage()).length : 0,
};

export {
  Storage,
};
