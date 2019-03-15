'use strict';

const querystringme = (function() {
  const parameters = {};

  let defaultOptions = {
    force: false,
    update_url: true,
    local_storage: false,
    default_values: {},
  };

  const localStorageKey = 'querystringme.parameters';

  /* Aux functions */

  const getParameterValue = (parameter) => {
    if (parameter.length < 2) {
      return null;
    }

    const value = parameter[1];

    return value === '' ? null : value;
  };

  const areParametersEmpty = () => Object.entries(parameters).length === 0;

  const getQueryStringFromUrl = () => {
    const url = window.location.href;
    const parts = url.split('?');

    return parts.length > 1 ? parts[1] : null;
  };

  const areParametersAlreadyProcessed = (options) => {
    return !areParametersEmpty() && !options.force;
  };

  const updateUrl = (options) => {
    if (!options.update_url) {
      return;
    }

    const paramString = generateQueryString(options);
    const title = 'querystringme.updateUrl ' + paramString;

    window.history.pushState(parameters, title, '?' + paramString);
  };

  const generateQueryString = (options) => {
    return Object.entries(parameters).reduce((result, [key, value]) => {
      return [...result, `${key}=${value || ''}`];
    }, []).join('&');
  };

  const checkPushStateCompatibility = (options) => {
    if (!window || !window.history || !window.history.pushState) {
      options.update_url = false;
    }
  };

  const checkLocalStorageCompatibility = (options) => {
    if (!window || !window.localStorage) {
      options.local_storage = false;
    }
  };

  const processOptions = (options = {}) => {
    const clonedDefaultOptions = Object.assign({}, defaultOptions, options);

    checkPushStateCompatibility(clonedDefaultOptions);
    checkLocalStorageCompatibility(clonedDefaultOptions);

    return clonedDefaultOptions;
  };

  const getParametersFromUrl = (options) => {
    let queryString = getQueryStringFromUrl();

    if (queryString) {
      queryString = queryString.split('&');
      const length = queryString.length;
      let parameter;
      let key;

      for (let i = 0; i < length; i++) {
        parameter = queryString[i].split('=');
        key = parameter[0];

        if (key && key !== '') {
          parameters[key] = getParameterValue(parameter);
        }
      }
    }
  };

  const setDefaultValues = (options) => {
    Object.entries(options.default_values).forEach(([key, value = '']) => {
      if (!parameters.hasOwnProperty(key) || !parameters[key]) {
        parameters[key] = value;
      }
    });
  };

  const getParametersFromUrlAndStorage = (options) => {
    const fromStorage = getParametersFromStorage(options);
    getParametersFromUrl(options);
    setDefaultValues(options);

    if (fromStorage) {
      updateUrl(options);
      updateParametersInStorage(options);
    }

    return parameters;
  };

  const getParametersFromStorage = (options) => {
    if (!options.local_storage) {
      return false;
    }

    const storedParameters = window.localStorage.getItem(localStorageKey);

    if (storedParameters) {
      Object.assign(parameters, JSON.parse(storedParameters));

      return true;
    }

    return false;
  };

  const updateParametersInStorage = (options) => {
    if (!options.local_storage) {
      return;
    }

    window.localStorage.setItem(localStorageKey, JSON.stringify(parameters));
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
    updateParametersInStorage(options);

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

if (typeof module !== 'undefined') {
  module.exports = querystringme;
}
