import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../../src/pages/login.page'
import ProductPage from '../../src/pages/products.page'
import { logger, setText, click } from '../../src/utils/common'


Given(`I am on login page`, async function() {
  await LoginPage.openSauceDemo() 
  expect(await LoginPage.getPageTitle()).toHaveText(LoginPage.getExpectedPageTitle())
  logger('Opened page with title' + (await LoginPage.getPageTitle()))
});

When(`I enter {string} and {string}`, async function(username: string, password: string) {
  await setText(LoginPage.inputUserName, username)
  logger(`Entered username in : ${(await LoginPage.inputUserName).selector}`)
  await setText(LoginPage.inputPassword, password)
  logger(`Entered password in : ${(await LoginPage.inputPassword).selector}`)
  await click(LoginPage.btnLogin)
  logger(`Clicked on : ${(await LoginPage.btnLogin).selector}`)
});

Then(`I am redirected to Products page`, async function() {
  await expect(ProductPage.getPageTitle()).toHaveText(ProductPage.getExpectedPageTitle())
  logger('Opened page with title' + (await ProductPage.getPageTitle()))    
});