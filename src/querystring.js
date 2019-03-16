'use strict';

const QUERYSTRING_DELIMITER = '?';
const PARAM_DELIMITER = '&';
const VALUE_DELIMITER = '=';

const getBrowserUrl = () => window.location.href;

const getFromUrl = () => {
  const [, second = ''] = getBrowserUrl().split(QUERYSTRING_DELIMITER);

  return second;
};

const getParameterValue = (value) => value === '' ? null : value;

const Querystring = {
  get: () => {
    return getFromUrl().split(PARAM_DELIMITER).reduce((result, parameter) => {
      const [key, value = null] = parameter.split(VALUE_DELIMITER);

      return key && key !== ''
        ? {...result, [key]: getParameterValue(value)}
        : result;
    }, {});
  },
  generate: (parameters) => {
    return Object.entries(parameters).reduce((result, [key, value]) => {
      return [...result, `${key}${VALUE_DELIMITER}${value || ''}`];
    }, []).join(PARAM_DELIMITER);
  },
};

export {
  Querystring,
};
