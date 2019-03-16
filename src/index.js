'use strict';

const {Parameters} = require('./parameters');
const {Storage} = require('./storage');
const {History} = require('./history');
const {Querystring} = require('./querystring');
const {Options} = require('./options');

const updateUrl = () => History.push(Parameters.get(), getQuery());

const getQuery = () => '?' + Querystring.generate(Parameters.get());

const updateStore = () => Storage.update(Parameters.get());

const updateUrlAndStore = () => {
  if (Storage.size() > 0) {
    updateUrl();
    updateStore();
  }
};

const processParametersFromUrlAndStorage = () => {
  Parameters.update({
    ...Storage.get(),
    ...Querystring.get(),
    ...Options.get('default_values'),
  });

  updateUrlAndStore();
};

const processParameters = () => {
  return Parameters.areProcessed()
    ? false
    : processParametersFromUrlAndStorage();
};

const start = (options = {}) => {
  Options.merge(options);
  processParameters();
};

const querystringme = {
  load: (options) => {
    start(options);
  },
  getParameters: (options) => {
    start(options);
    return Parameters.get();
  },
  getParameter: (key) => {
    start();
    const {[key]: value = null} = Parameters.get();
    return value;
  },
  updateParameters: (values, options) => {
    start(options);

    Parameters.update(values);
    Storage.update(Parameters.get());
    updateUrl();

    return Parameters.get();
  },
};

export default querystringme;

if (window && typeof window === 'object') {
  window['querystringme'] = querystringme;
}
