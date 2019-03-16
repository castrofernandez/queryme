'use strict';

const {Storage} = require('./storage');
const {History} = require('./history');

const defaultOptions = {
  force: false,
  update_url: true,
  local_storage: false,
  default_values: {},
};

const compoundOptions = Object.assign({}, defaultOptions);

const Options = {
  get: (key = null) => key ? compoundOptions[key] : compoundOptions,
  merge: (options = {}) => {
    Object.assign(compoundOptions, options);

    History.isCompatible(compoundOptions);
    Storage.isCompatible(compoundOptions);

    return compoundOptions;
  },
};

export {
  Options,
};
