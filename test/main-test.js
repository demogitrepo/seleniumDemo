const {Builder, By, Key, until} = require('selenium-webdriver');
require('chai').should();
const mocha = require('mocha');
const describe = mocha.describe;

let driver = new Builder()
    .forBrowser('chrome')
    .build();

describe("Main", function ( ) {

    after(function ( ) {
        driver.quit();
    });

    describe('Main page', function() {
        it('should navigate to main page', function(done) {
            this.timeout(5000);
            driver.get('localhost:3000')
                .then(() => driver.getTitle())
                .then(title => title.should.equal('React App'))
                .then(() => done())
                .catch(error => done(error))
            ;
        });
    });

    describe('Home page', function() {
        it('should navigate to home page', function(done) {
            this.timeout(5000);
            driver.get('localhost:3000')
                .then(() => driver.findElement(By.linkText("Home")).click())
                .then(function (el) {
                    //console.log(el);
                })
                .then(() => driver.findElement(By.xpath("//h1")))
                .then(function (el) {
                    driver.getCurrentUrl().then(function (url) {
                        url.should.equal('http://localhost:3000/home');
                    });
                    el.getText().then(function (txt) {
                        txt.should.equal('Home...')
                    });
                })
                .then(() => done())
                .catch(error => done(error))
            ;
        });
    });
});
