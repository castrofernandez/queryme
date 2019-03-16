'use strict';

const getBrowserUrl = () => window.location.href;

const getQueryStringFromUrl = () => {
  const [, second = ''] = getBrowserUrl().split('?');

  return second;
};

const getParameterValue = (value) => value === '' ? null : value;

const getParametersFromUrl = () => {
  return getQueryStringFromUrl().split('&').reduce((result, parameter) => {
    const [key, value = null] = parameter.split('=');

    return key && key !== ''
      ? {...result, [key]: getParameterValue(value)}
      : result;
  }, {});
};

const Querystring = {
  get: getParametersFromUrl,
};

export {
  Querystring,
};
