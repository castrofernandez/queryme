'use strict';

const {Storage} = require('./storage');
const {History} = require('./history');
const {Querystring} = require('./querystring');
const {Options} = require('./options');

const querystringme = (function() {
  const parameters = {};

  /* Aux functions */

  const areParametersEmpty = () => Object.entries(parameters).length === 0;

  const areParametersAlreadyProcessed = () => {
    return !areParametersEmpty() && !Options.get('force');
  };

  const updateUrl = () => {
    if (!Options.get('update_url')) {
      return;
    }

    const paramString = Querystring.generate(parameters);
    const title = 'querystringme.updateUrl ' + paramString;

    History.push(parameters, title, '?' + paramString);
  };

  const completeWithMissingDefaultValues = () => {
    Object.entries(Options.get('default_values'))
        .forEach(([key, value = '']) => {
          if (!parameters.hasOwnProperty(key) || !parameters[key]) {
            parameters[key] = value;
          }
        });
  };

  const processParametersFromUrlAndStorage = () => {
    const fromStorage = Storage.get(Options.get());
    Object.assign(parameters, fromStorage);
    Object.assign(parameters, Querystring.get());

    completeWithMissingDefaultValues();

    if (Object.keys(fromStorage).length > 0) {
      updateUrl();
      Storage.update(parameters, Options.get());
    }
  };

  const getParametersFromUrlAndStorage = () => {
    processParametersFromUrlAndStorage();
    return parameters;
  };

  /* Public methods */

  const load = (options) => {
    Options.merge(options);
    processParametersFromUrlAndStorage();
    updateUrl();
  };

  const getParameters = (options) => {
    Options.merge(options);

    if (areParametersAlreadyProcessed()) {
      return parameters;
    }

    return getParametersFromUrlAndStorage();
  };

  const getParameter = (key, options) => {
    Options.merge(options);

    if (!key) {
      return null;
    }

    const storedParameters = getParameters();

    return storedParameters && storedParameters[key]
      ? storedParameters[key]
      : null;
  };

  const updateParameters = (values, options) => {
    const compoundOptions = Options.merge(options);
    getParameters();

    Object.entries(values).forEach(([key, value]) => {
      parameters[key] = toString(value) || null;
    }, []);

    updateUrl();
    Storage.update(parameters, compoundOptions);

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
