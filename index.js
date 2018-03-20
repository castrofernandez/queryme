'use strict';

var querystringme = (function() {
  var parameters = null;

  var defaultOptions = {
    force: false,
    update_url: true,
    local_storage: false,
    default_values: {}
  };

  var localStorageKey = 'querystringme.parameters';

  /* Aux functions */

  function getParameterValue(parameter) {
    if (parameter.length < 2) {
      return null;
    }

    var value = parameter[1];

    return value === '' ? null : value;
  }

  function getQueryStringFromUrl() {
    var url = window.location.href;
    var parts = url.split('?');

    return parts.length > 1 ? parts[1] : null;
  }

  function areParametersAlreadyProcessed(options) {
    return parameters && !options.force;
  }

  function updateUrl(options) {
    if (!options.update_url) {
      return;
    }

    var paramString = generateQueryString(options);
    var title = 'querystringme.updateUrl ' + paramString;

    window.history.pushState(parameters, title, '?' + paramString);
  }

  function generateQueryString(options) {
    var pairs = [];
    var value;

    for (var key in parameters) {
      value = parameters[key] || '';

      pairs.push(key + '=' + value);
    }

    return pairs.join('&');
  }

  function checkPushStateCompatibility(options) {
    if (!window || !window.history || !window.history.pushState) {
      options.update_url = false;
    }
  }

  function checkLocalStorageCompatibility(options) {
    if (!window || !window.localStorage) {
      options.local_storage = false;
    }
  }

  function processOptions(options) {
    var clonedDefaultOptions = JSON.parse(JSON.stringify(defaultOptions));
    var value;

    options = options || {};

    for (var key in options) {
      value = options[key];

      clonedDefaultOptions[key] = value;
    }

    checkPushStateCompatibility(clonedDefaultOptions);
    checkLocalStorageCompatibility(clonedDefaultOptions);

    return clonedDefaultOptions;
  }

  function getParametersFromUrl(options) {
    var queryString = getQueryStringFromUrl();

    if (queryString) {
      queryString = queryString.split('&');
      var length = queryString.length;
      var parameter, key;

      for (var i = 0; i < length; i++) {
        parameter = queryString[i].split('=');
        key = parameter[0];

        if (key && key !== '') {
          parameters[key] = getParameterValue(parameter);
        }
      }
    }
  }

  function setDefaultValues(options) {
    var defaultValues = options.default_values;
    var value;

    for (var key in defaultValues) {
      value = defaultValues[key];

      if (!parameters.hasOwnProperty(key)) {
        parameters[key] = value;
      }
    }
  }

  function getParametersFromUrlAndStorage(options) {
    var fromStorage = getParametersFromStorage(options);
    getParametersFromUrl(options);
    setDefaultValues(options);

    if (fromStorage) {
      updateUrl(options);
      updateParametersInStorage(options);
    }

    return parameters;
  }

  function getParametersFromStorage(options) {
    parameters = {};

    if (!options.local_storage) {
      return false;
    }

    var storedParameters = window.localStorage.getItem(localStorageKey);

    if (storedParameters) {
      parameters = JSON.parse(storedParameters);

      return true;
    }

    return false;
  }

  function updateParametersInStorage(options) {
    if (!options.local_storage) {
      return;
    }

    window.localStorage.setItem(localStorageKey, JSON.stringify(parameters));
  }

  /* Public methods */

  function load(options) {
    defaultOptions = processOptions(options);
    getParametersFromUrlAndStorage(defaultOptions);
    updateUrl(defaultOptions);
  }

  function getParameters(options) {
    options = processOptions(options);

    if (areParametersAlreadyProcessed(options)) {
      return parameters;
    }

    return getParametersFromUrlAndStorage(options);
  }

  function getParameter(key, options) {
    options = processOptions(options);

    if (!key) {
      return null;
    }

    var parameters = getParameters(options);

    return parameters && parameters[key] ? parameters[key] : null;
  }

  function updateParameters(values, options) {
    options = processOptions(options);
    getParameters(options);

    var value;

    for (var key in values) {
      value = values[key] || null;

      parameters[key] = value;
    }

    updateUrl(options);
    updateParametersInStorage(options);

    return parameters;
  }

  return {
    load: load,
    getParameters: getParameters,
    getParameter: getParameter,
    updateParameters: updateParameters
  };
})();

if (typeof module !== 'undefined') {
  module.exports = querystringme;
}
