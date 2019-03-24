'use strict';

import compareme from 'compareme';

const defaultOptions = {
  force: false,
  updateUrl: true,
  localStorage: false,
  defaultValues: {},
};

const compoundOptions = Object.assign({}, defaultOptions);

const getDiffOptions = (options) => {
  return compareme.get(options)
      .differences.strictly.with(defaultOptions)
      .differences.filter((diff) => diff.first !== 'undefined');
};

const getInvalidOptions = (options) => {
  return getDiffOptions(options)
      .filter((diff) => diff.second === 'undefined')
      .map((diff) => ({
        key: diff.index,
      }));
};

const getWrongTypeOptions = (options) => {
  return getDiffOptions(options)
      .filter((diff) => diff.second !== 'undefined')
      .map((diff) => ({
        key: diff.index,
        expected: diff.second,
        actual: diff.first,
      }));
};

const validateOptions = (options) => {
  getWrongTypeOptions(options).forEach((diff) => {
    console.error(`The option "${diff.key}" is expected to be `
      + `"${diff.expected}" but received as "${diff.actual}".`);
  });

  getInvalidOptions(options).forEach((diff) => {
    console.error(`The option "${diff.key}" is not valid.`);
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
