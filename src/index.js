'use strict';

const {Storage} = require('./storage');
const {History} = require('./history');

const querystringme = (function() {
  const parameters = {};

  let defaultOptions = {
    force: false,
    update_url: true,
    local_storage: false,
    default_values: {},
  };

  /* Aux functions */

  const getParameterValue = (value) => value === '' ? null : value;

  const areParametersEmpty = () => Object.entries(parameters).length === 0;

  const getBrowserUrl = () => window.location.href;

  const getQueryStringFromUrl = () => {
    const [, second = ''] = getBrowserUrl().split('?');

    return second;
  };

  const areParametersAlreadyProcessed = (options) => {
    return !areParametersEmpty() && !options.force;
  };

  const updateUrl = (options) => {
    if (!options.update_url) {
      return;
    }

    const paramString = generateQueryString();
    const title = 'querystringme.updateUrl ' + paramString;

    History.push(parameters, title, '?' + paramString);
  };

  const generateQueryString = () => {
    return Object.entries(parameters).reduce((result, [key, value]) => {
      return [...result, `${key}=${value || ''}`];
    }, []).join('&');
  };

  const processOptions = (options = {}) => {
    const clonedDefaultOptions = Object.assign({}, defaultOptions, options);

    History.isCompatible(clonedDefaultOptions);
    Storage.isCompatible(clonedDefaultOptions);

    return clonedDefaultOptions;
  };

  const processParametersFromUrl = () => {
    getQueryStringFromUrl().split('&').forEach((parameter) => {
      const [key, value = null] = parameter.split('=');

      if (key && key !== '') {
        parameters[key] = getParameterValue(value);
      }
    });
  };

  const setDefaultValues = (options) => {
    Object.entries(options.default_values).forEach(([key, value = '']) => {
      if (!parameters.hasOwnProperty(key) || !parameters[key]) {
        parameters[key] = value;
      }
    });
  };

  const getParametersFromUrlAndStorage = (options) => {
    const fromStorage = Storage.get(options);
    Object.assign(parameters, fromStorage);
    processParametersFromUrl();
    setDefaultValues(options);

    if (Object.keys(fromStorage).length > 0) {
      updateUrl(options);
      Storage.update(parameters, options);
    }

    return parameters;
  };

  /* Public methods */

  const load = (options) => {
    defaultOptions = processOptions(options);
    getParametersFromUrlAndStorage(defaultOptions);
    updateUrl(defaultOptions);
  };

  const getParameters = (options) => {
    options = processOptions(options);

    if (areParametersAlreadyProcessed(options)) {
      return parameters;
    }

    return getParametersFromUrlAndStorage(options);
  };

  const getParameter = (key, options) => {
    options = processOptions(options);

    if (!key) {
      return null;
    }

    const storedParameters = getParameters(options);

    return storedParameters && storedParameters[key]
      ? storedParameters[key]
      : null;
  };

  const updateParameters = (values, options) => {
    options = processOptions(options);
    getParameters(options);

    Object.entries(values).forEach(([key, value]) => {
      parameters[key] = toString(value) || null;
    }, []);

    updateUrl(options);
    Storage.update(parameters, options);

    return parameters;
  };

  const toString = (value) => {
    return value && value.toString && typeof value.toString === 'function'
      ? value.toString()
      : value;
  };

  return {
    load,
    getParameters,
    getParameter,
    updateParameters,
  };
})();

export default querystringme;

if (window && typeof window === 'object') {
  window['querystringme'] = querystringme;
}
