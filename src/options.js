'use strict';

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
    return Object.assign(compoundOptions, options);
  },
};

export {
  Options,
};
