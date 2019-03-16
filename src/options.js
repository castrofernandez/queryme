'use strict';

const defaultOptions = {
  force: false,
  updateUrl: true,
  localStorage: false,
  defaultValues: {},
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
