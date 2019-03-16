'use strict';

const getHistoryFromWindow = ({history = {}}) => history;

const getHistory = () => getHistoryFromWindow(window);

const History = {
  isCompatible: (options) => {
    if (!window || !getHistory().pushState) {
      options.update_url = false;
    }
  },
  push: (data, title, url) => {
    getHistory().pushState(data, title, url);
  },
};

export {
  History,
};
