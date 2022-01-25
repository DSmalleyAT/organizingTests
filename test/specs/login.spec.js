const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();

        await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'You logged into a secure area!');
    });
    it('should fail to login with an invalid password', async () => {
        await LoginPage.open();

        await LoginPage.login('tomsmith', 'wrong');
        await expect(LoginPage.flashAlert).toBeExisting();
        await expect(LoginPage.flashAlert).toHaveTextContaining(
            'Your password is invalid!');
    });
    it('should fail to login with an invalid username', async () => {
       await LoginPage.open();

       await LoginPage.login('wrong', 'SuperSecretPassword!');
       await expect(LoginPage.flashAlert).toBeExisting();
       await expect(LoginPage.flashAlert).toHaveTextContaining(
           'Your username is invalid!');
    });
    it('should logout', async () => {
        await LoginPage.open();

        await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/secure');
        
        await SecurePage.logout();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/login');
    });
});