import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('user can signup and login using Page Object Model', async ({ page }) => {

    const loginPage = new LoginPage(page);

    // -------------------------
    // OPEN LOGIN PAGE
    // -------------------------

    await loginPage.goto();

    // -------------------------
    // SIGN UP
    // -------------------------

    await loginPage.openSignup();

    await loginPage.signup(
        'Prasanna',
        'Prasanna'
    );

    // -------------------------
    // LOGIN
    // -------------------------

    await loginPage.login(
        'Prasanna',
        'Prasanna'
    );

    // -------------------------
    // VERIFY LOGIN
    // -------------------------

    await loginPage.expectLoggedIn();
});