const assert = require('assert');
const { Given, When, Then, AfterAll, setDefaultTimeout } = require('cucumber');
const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

require("chromedriver");
setDefaultTimeout(15000)

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();
driver.manage().setTimeouts({implicit: 20000})

Given('I am on {string} homepage', function(url) {
  driver.manage().deleteAllCookies()
  driver.get(`${url}`)
});

When('I type {string} as App Name', async function(appName) {
  this.appName = appName
  const element = await driver.findElement(By.id("appName"))
  element.sendKeys(appName)
});

When('I type {string} as Email Address', async function(emailAddress) {
  const element = await driver.findElement(By.id("username"))
  element.sendKeys(emailAddress)
});

When('I type {string} as Password', async function(password) {
  const element = await driver.findElement(By.id("password"))
  element.sendKeys(password)
});

When('I click on Sign in button', async function() {
  const element = await driver.findElement(By.id("login-submit"))
  await element.click()
});

Then('I should see my dashboard', async function() {
  const query = By.css("#container > header > div.app > div.main-title > span")
  // wait for login response
  await driver.sleep(10000)
  const element = await driver.wait(() => driver.findElement(query))
  const text = await element.getText()
  expect(text).to.equal(this.appName.toUpperCase())
});

Given('I am on {string} page', function(url) {
  driver.get(`${url}`)
});

When('I click appointments services should appear on the dropdown', async function() {
  const appointments = await driver.findElement(By.xpath('//div[@title="Appointments (Menu14)"]'))
  await appointments.click()
  const services = await driver.findElement(By.xpath('//div[@title="Services (List32)"]'))
  await services.click()
});

When('I click services {string} should appear', async function(header) {
  const query = By.css('#paris-view > div.detail > div > header > div.item-vitals > div > h3')
  await driver.sleep(5000)
  const element = await driver.wait(() => driver.findElement(query))
  const text = await element.getText()
  expect(text).to.equal(header)
});

When('I click sort ascending on service name column', async function() {
  const element = await driver.findElement(By.css('.tabletabs .x-column-header-first'))
  await element.click()
});

// Then('I should see correct results list', async function () {

// });

// Given('I am on {string} home page', async function(url) {
//   driver.get(`${url}`)
// });

// When('I type colour in {string}', async function() {
//   const element = await driver.findElement(By.id("textfield-1703-inputEl"))
//   element.sendKeys(colour)
// });

// Then('I should see correct results list',{timeout: 10000}, async function() {
//   const query = By.css("#gridview-1699-record-ext-record-606 > td.x-grid-cell.x-grid-td.x-grid-cell-headerId-gridcolumn-1674.x-grid-cell-first.x-unselectable > div")
//   const element = await driver.wait(() => driver.findElement(query))
//   const text = await element.getText()
//   expect(text).to.equal.toUpperCase()
// });

AfterAll('end', async function(){
  await driver.quit();
});
