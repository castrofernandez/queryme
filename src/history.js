'use strict';

const {Options} = require('./options');

const getHistoryFromWindow = ({history = {}}) => history;

const getHistory = () => getHistoryFromWindow(window);

const getTitle = (url) => `querystringme.updateUrl ${url}`;

const isCompatible = () => window && getHistory().pushState;

const isEnabled = () => Options.get('update_url') && isCompatible();

const History = {
  push: (data, url) => {
    return isEnabled()
      ? getHistory().pushState(data, getTitle(url), url)
      : false;
  },
};

export {
  History,
};
