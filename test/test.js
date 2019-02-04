const assert = require('assert');

const { Browser, By, Key, until } = require('selenium-webdriver');
const { ignore, suite } = require('selenium-webdriver/testing');
const chrome = require('selenium-webdriver/chrome');

suite(function (env) {
  describe('Blockstack launch Browser', function () {
    let driver;

    before(async function () {
      let co = new chrome.Options();
      co.addArguments('--disable-notifcations');
      co.setUserPreferences({
        protocol_handler: {
          excluded_schemes: {
            'blockstack': false
          }
        }
      })
      driver = await env.builder().setChromeOptions(co).build();

    });

    it('Will launch blockstack native browser', async function () {
      await driver.get('https://helloblockstack.com/');
      await driver.findElement(By.id('signin-button')).click();
      while ((await driver.getAllWindowHandles()).length != 2) { };
      await driver.switchTo().window((await driver.getAllWindowHandles())[1]);
      let url = await driver.getCurrentUrl();
      assert.ok(url.startsWith('http://localhost:8888/'));
    });

    after(() => driver && driver.quit());
  });
});


