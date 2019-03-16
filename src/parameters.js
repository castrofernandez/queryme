'use strict';

const {Options} = require('./options');

const parameters = {};

const areParametersEmpty = () => Object.entries(parameters).length === 0;

const isFunction = (obj) => typeof obj === 'function';

const isStringable = ({toString}) => toString && isFunction(toString);

const checkStringable = (obj) => obj && isStringable(obj);

const toString = (value) => checkStringable(value) ? value.toString() : value;

const Parameters = {
  areProcessed: () => {
    return !areParametersEmpty() && !Options.get('force');
  },
  get: () => {
    return parameters;
  },
  update: (values) => {
    Object.entries(values).forEach(([key, value]) => {
      parameters[key] = toString(value) || null;
    }, []);
  },
  merge: (values) => {
    Object.entries(values)
        .forEach(([key, value = '']) => {
          if (!parameters.hasOwnProperty(key) || !parameters[key]) {
            parameters[key] = value;
          }
        });
  },
};

export {
  Parameters,
};
