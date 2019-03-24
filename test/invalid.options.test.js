'use strict';

const {expect} = require('chai');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

const {Options} = require('../src/options');

chai.use(sinonChai);

describe('options', () => {
  beforeEach(function() {
    sinon.spy(console, 'error');
  });

  afterEach(function() {
    console.error.restore();
  });

  it('invalid options: wrong type', () => {
    Options.merge({
      force: 'false',
    });

    expect(console.error.calledOnce).to.be.true;
    expect(console.error.calledWith('The option "force" is expected to be "boolean"'
        + ' but received as "string".')).to.be.true;
  });

  it('invalid options: invalid key', () => {
    Options.merge({
      something: true,
    });

    expect(console.error.calledOnce).to.be.true;
    expect(console.error.calledWith('The option "something" is not valid.')).to.be.true;
  });
});

/*
force: false,
  updateUrl: true,
  localStorage: false,
  defaultValues: {},
  */
