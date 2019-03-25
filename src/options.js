'use strict';

import compareme from 'compareme';

const defaultOptions = {
  force: false,
  updateUrl: true,
  localStorage: false,
  defaultValues: {},
};

const compoundOptions = Object.assign({}, defaultOptions);

const getInvalidOptions = (options) => {
  return compareme.get(defaultOptions)
      .unexpected.elements.strictly.with(options)
      .map((diff) => ({
        key: diff.index,
      }));
};

const getWrongTypeOptions = (options) => {
  return compareme.get(defaultOptions)
      .type.differences.strictly.with(options)
      .map((diff) => ({
        key: diff.index,
        expected: diff.first,
        actual: diff.second,
      }));
};

const validateOptions = (options) => {
  getWrongTypeOptions(options).forEach((diff) => {
    console.error(`[querystringme] The option "${diff.key}" is expected to be `
      + `"${diff.expected}" but received as "${diff.actual}".`);
  });

  getInvalidOptions(options).forEach((diff) => {
    console.error(`[querystringme] The option "${diff.key}" is not valid.`);
  });
};

const Options = {
  get: (key = null) => key ? compoundOptions[key] : compoundOptions,
  merge: (options = {}) => {
    validateOptions(options);
    return Object.assign(compoundOptions, options);
  },
};

export {
  Options,
};
