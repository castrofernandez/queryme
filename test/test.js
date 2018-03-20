'use strict';

const {expect} = require('chai');
const puppeteer = require('puppeteer');

describe('queryme', function () {
  // Define global variables
  let browser;
  let page;

  before(async function () {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  beforeEach(async function () {
    page = await browser.newPage();
  });

  afterEach(async function () {
    await page.close();
  });

  after(async function () {
    await browser.close();
  });

  it('No parameters', async function () {
    await page.goto('http://localhost:9000');
    
    expect(await page.evaluate(() => queryme.getParameters())).to.deep.equal({});
  });

  it('One parameter withou value', async function () {
    await page.goto('http://localhost:9000?foo');
    
    expect(await page.evaluate(() => queryme.getParameters())).to.deep.equal({ foo: null });

    await page.goto('http://localhost:9000?foo=');
    
    expect(await page.evaluate(() => queryme.getParameters())).to.deep.equal({ foo: null });
  });

  it('One parameter with value', async function () {
    await page.goto('http://localhost:9000?foo=bar');
    
    expect(await page.evaluate(() => queryme.getParameters())).to.deep.equal({ foo: 'bar' });
  });

  it('One parameter with value and &', async function () {
    await page.goto('http://localhost:9000?foo=bar&');
    
    expect(await page.evaluate(() => queryme.getParameters())).to.deep.equal({ foo: 'bar' });
  });

  it('Two parameters with value', async function () {
    await page.goto('http://localhost:9000?first=1&second=2');
    
    expect(await page.evaluate(() => queryme.getParameters())).to.deep.equal({ first: '1', second: '2' });
  });

  it('Two parameters with and without value', async function () {
    await page.goto('http://localhost:9000?first=1&second=');
    
    expect(await page.evaluate(() => queryme.getParameters())).to.deep.equal({ first: '1', second: null });
  });

  it('Force URL matching', async function () {
    await page.goto('http://localhost:9000?foo=bar');
    
    expect(await page.evaluate(() => queryme.getParameters())).to.deep.equal({ foo: 'bar' });

    await page.evaluate(() => window.history.pushState("", "", '?foo=changed'));

    expect(await page.evaluate(() => queryme.getParameters({ force: true }))).to.deep.equal({ foo: 'changed' });
  });

  it('Force URL matching (set in load())', async function () {
    await page.goto('http://localhost:9000?foo=bar');
    
    await page.evaluate(() => queryme.load({ force: true }));

    expect(await page.evaluate(() => queryme.getParameters())).to.deep.equal({ foo: 'bar' });

    await page.evaluate(() => window.history.pushState("", "", '?foo=changed'));

    expect(await page.evaluate(() => queryme.getParameters())).to.deep.equal({ foo: 'changed' });
  });

  it('URL changing without forcing', async function () {
    await page.goto('http://localhost:9000?foo=bar');
    
    expect(await page.evaluate(() => queryme.getParameters())).to.deep.equal({ foo: 'bar' });

    await page.evaluate(() => window.history.pushState("", "", '?foo=changed'));

    expect(await page.evaluate(() => queryme.getParameters({ force: false }))).to.deep.equal({ foo: 'bar' });
  });

  it('getParameter', async function () {
    await page.goto('http://localhost:9000?first=1&second=');
    
    expect(await page.evaluate(() => queryme.getParameter('first'))).to.equal('1');
    expect(await page.evaluate(() => queryme.getParameter('second'))).to.equal(null);
    expect(await page.evaluate(() => queryme.getParameter('third'))).to.equal(null);
  });

  it('updateParameter with URL update', async function () {
    await page.goto('http://localhost:9000?first=1&second=');
    
    expect(await page.evaluate(() => queryme.getParameter('first'))).to.equal('1');
    expect(await page.evaluate(() => queryme.getParameter('second'))).to.equal(null);

    await page.evaluate(() => queryme.updateParameters({ second: '2' }));

    expect(await page.evaluate(() => queryme.getParameter('first'))).to.equal('1');
    expect(await page.evaluate(() => queryme.getParameter('second'))).to.equal('2');

    expect(await page.evaluate(() => window.location.href)).to.equal('http://localhost:9000/?first=1&second=2');
  });

  it('updateParameter without URL update', async function () {
    await page.goto('http://localhost:9000?first=1&second=');
    
    expect(await page.evaluate(() => queryme.getParameter('first'))).to.equal('1');
    expect(await page.evaluate(() => queryme.getParameter('second'))).to.equal(null);

    await page.evaluate(() => queryme.updateParameters({ second: '2' }, { update_url: false }));

    expect(await page.evaluate(() => queryme.getParameter('first'))).to.equal('1');
    expect(await page.evaluate(() => queryme.getParameter('second'))).to.equal('2');

    expect(await page.evaluate(() => window.location.href)).to.equal('http://localhost:9000/?first=1&second=');
  });

  it('updateParameter without URL update (set in load())', async function () {
    await page.goto('http://localhost:9000?first=1&second=');
    await page.evaluate(() => queryme.load({ update_url: false }));
    
    expect(await page.evaluate(() => queryme.getParameter('first'))).to.equal('1');
    expect(await page.evaluate(() => queryme.getParameter('second'))).to.equal(null);

    await page.evaluate(() => queryme.updateParameters({ second: '2' }));

    expect(await page.evaluate(() => queryme.getParameter('first'))).to.equal('1');
    expect(await page.evaluate(() => queryme.getParameter('second'))).to.equal('2');

    expect(await page.evaluate(() => window.location.href)).to.equal('http://localhost:9000/?first=1&second=');
  });

  it('updateParameter without URL update (overwriting load())', async function () {
    await page.goto('http://localhost:9000?first=1&second=');
    await page.evaluate(() => queryme.load({ update_url: true }));
    
    expect(await page.evaluate(() => queryme.getParameter('first'))).to.equal('1');
    expect(await page.evaluate(() => queryme.getParameter('second'))).to.equal(null);

    await page.evaluate(() => queryme.updateParameters({ second: '2' }, { update_url: false }));

    expect(await page.evaluate(() => queryme.getParameter('first'))).to.equal('1');
    expect(await page.evaluate(() => queryme.getParameter('second'))).to.equal('2');

    expect(await page.evaluate(() => window.location.href)).to.equal('http://localhost:9000/?first=1&second=');
  });

  it('localStorage: load from storage', async function () {
    await page.goto('http://localhost:9000?first=1');
    await page.evaluate(() => localStorage.setItem('parameters', '{ "second": "2" }'))
    await page.evaluate(() => queryme.load({ local_storage: true }));
    
    expect(await page.evaluate(() => queryme.getParameter('first'))).to.equal('1');
    expect(await page.evaluate(() => queryme.getParameter('second'))).to.equal('2');

    await page.goto('http://localhost:9000?first=1');
    await page.evaluate(() => queryme.load({ local_storage: true }));
    expect(await page.evaluate(() => queryme.getParameter('first'))).to.equal('1');
    expect(await page.evaluate(() => queryme.getParameter('second'))).to.equal('2');
  });
});