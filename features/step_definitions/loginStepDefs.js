const {
  Given, When, Then, AfterAll, setDefaultTimeout,
// eslint-disable-next-line import/no-extraneous-dependencies
} = require('cucumber');
const {
  Builder, By, Capabilities,
} = require('selenium-webdriver');
const { expect } = require('chai');

require('chromedriver');

setDefaultTimeout(15000);

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { w3c: false });
const driver = new Builder().withCapabilities(capabilities).build();
driver.manage().setTimeouts({ implicit: 20000 });

Given('I am on {string} homepage', async (url) => {
  driver.manage().deleteAllCookies();
  await driver.get(`${url}`);
});

When('I type {string} as App Name', async (appName) => {
  this.appName = appName;
  const element = await driver.findElement(By.id('appName'));
  await element.sendKeys(appName);
});

When('I type {string} as Email Address', async (emailAddress) => {
  const element = await driver.findElement(By.id('username'));
  await element.sendKeys(emailAddress);
});

When('I type {string} as Password', async (password) => {
  const element = await driver.findElement(By.id('password'));
  await element.sendKeys(password);
});

When('I click on Sign in button', async () => {
  const element = await driver.findElement(By.id('login-submit'));
  await element.click();
});

Then('I should see my dashboard', async () => {
  const query = By.css('#container > header > div.app > div.main-title > span');
  // wait for login response
  await driver.sleep(10000);
  const element = await driver.wait(() => driver.findElement(query));
  const text = await element.getText();
  expect(text).to.equal(this.appName.toUpperCase());
});

Given('I am on {string} page', async (url) => {
  expect(await driver.getCurrentUrl()).to.equal(url);
});

When('I click appointments services should appear on the dropdown', async () => {
  const appointments = await driver.findElement(By.xpath('//div[@title="Appointments (Menu14)"]'));
  await appointments.click();
  const services = await driver.findElement(By.xpath('//div[@title="Services (List32)"]'));
  await services.click();
});

When('I click services {string} should appear', async (header) => {
  const query = By.css('#paris-view > div.detail > div > header > div.item-vitals > div > h3');
  await driver.sleep(5000);
  const element = await driver.wait(() => driver.findElement(query));
  const text = await element.getText();
  expect(text).to.equal(header);
});

When('I click sort ascending on service name column', async () => {
  const element = await driver.findElement(By.css('.tabletabs .x-column-header-first'));
  await element.click();
});

Then('I should see correct results list', async () => {
  const elements = await driver.findElements(By.css('.tabletabs .x-column-header-first.x-column-header-sort-ASC'));
  expect(elements.length).to.equal(1);
});

When('I type {string} in the Search box', async (name) => {
  const element = await driver.findElement(By.css('.tabletabs .x-form-item-input-row input.x-form-text'));
  // This seems to be pretty inconsistent. It seems like there is latency
  // between beginning and finishing typing.
  // I recommend adding a debounce.
  await element.sendKeys(name);
});

Then('I should see colour results list', async () => {
  const query = By.css('.tabletabs tbody tr td.x-grid-cell-first div');
  await driver.sleep(5000);
  const element = await driver.wait(() => driver.findElement(query));
  const text = await element.getText();
  expect(text).to.equal('colour');
});

AfterAll('end', async () => {
  await driver.quit();
});
