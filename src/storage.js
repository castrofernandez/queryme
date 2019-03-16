'use strict';

const localStorageKey = 'querystringme.parameters';

const readFromStorage = () => getStorage().getItem(localStorageKey) || '{}';

const getStorage = () => getStorageFromWindow(window);

const getStorageFromWindow = ({localStorage = {}}) => localStorage;

const Storage = {
  isCompatible: (options) => {
    if (!window || Object.keys(getStorage()).length === 0) {
      options.local_storage = false;
    }
  },
  update: (data, options) => {
    return options.local_storage
      ? getStorage().setItem(localStorageKey, JSON.stringify(data))
      : false;
  },
  get: (options) => {
    return options.local_storage
      ? JSON.parse(readFromStorage())
      : {};
  },
};

export {
  Storage,
};
