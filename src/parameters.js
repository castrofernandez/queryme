'use strict';

const {Options} = require('./options');

const parameters = {};

const areParametersEmpty = () => Object.entries(parameters).length === 0;

const isFunction = (obj) => typeof obj === 'function';

const checkStringable = ({toString}) => toString && isFunction(toString);

const isStringable = (obj) => notNull(obj) && checkStringable(obj);

const orNull = (value) => value || null;

const toStr = (value) => isStringable(value) ? value.toString() : orNull(value);

const notNull = (obj) => obj !== null;

const isObject = (obj) => typeof obj === 'object';

const hasValidator = (obj) => obj.validator && isFunction(obj.validator);

const isValid = (obj, value) => obj.validator(value);

const getRawValue = (obj) => isObject(obj) ? null : obj;

const getDefault = (obj) => obj.default ? obj.default : getRawValue(obj);

const getValidValue = (obj, value) => {
  return isValid(obj, value) ? toStr(value) : toStr(getDefault(obj));
};

const validate = (obj, value) => {
  return hasValidator(obj)
  ? getValidValue(obj, value)
  : toStr(getValueOrDefault(obj));
};

const getValueOrDefault = (obj) => getValue(obj) || getDefault(obj);

const getValue = (obj) => obj.value || getRawValue(obj);

const wrapObject = (value) => isObject(value) ? value : ({value: value});

const processWrapperValue = (obj) => validate(obj, getValue(obj));

const processValue = (obj = {}) => processWrapperValue(wrapObject(obj));

const accumValue = (key, obj) => {
  const value = processValue(obj);

  return notNull(value) ? value : processValue(parameters[key]);
};

const Parameters = {
  areProcessed: () => {
    return !areParametersEmpty() && !Options.get('force');
  },
  get: () => {
    return Object.entries(parameters).reduce((result, [key, obj]) => {
      return {...result, [key]: processValue(obj)};
    }, {});
  },
  update: (values) => {
    Object.entries(values).forEach(([key, obj]) => {
      parameters[key] = {
        ...parameters[key],
        ...obj,
        value: accumValue(key, obj),
      };
    }, []);
  },
  merge: (values) => {
    Object.entries(values)
        .forEach(([key, obj = '']) => {
          if (!parameters.hasOwnProperty(key) || !parameters[key]) {
            parameters[key] = {...parameters[key], value: accumValue(key, obj)};
          }
        });
  },
};

export {
  Parameters,
};
