import { test, expect } from '@playwright/test';

test('authentication and session handling work correctly', async ({ page }) => {

    // =========================
    // CLEAN SESSION
    // =========================

    await page.goto('/');

    await page.evaluate(() => {
        localStorage.clear();
    });

    await page.reload();

    // =========================
    // 1. PROTECTED ROUTE
    // =========================

    await page.goto('/home');

    await expect(page).toHaveURL(/\/$/);

    await expect(
        page.getByRole('heading', {
            name: 'Login',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // 2. SIGN UP
    // =========================

    await page.getByText('Sign Up', {
        exact: true
    }).click();

    await page.getByPlaceholder('Username').fill('Prasanna');
    await page.getByPlaceholder('Password').fill('Prasanna');

    page.once('dialog', async dialog => {
        await dialog.accept();
    });

    await page.getByRole('button', {
        name: 'Sign Up',
        exact: true
    }).click();

    // Signup returns to Login form
    await expect(
        page.getByRole('heading', {
            name: 'Login',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // 3. LOGIN
    // =========================

    await page.getByPlaceholder('Username').fill('Prasanna');
    await page.getByPlaceholder('Password').fill('Prasanna');

    await page.getByRole('button', {
        name: 'Login',
        exact: true
    }).click();

    // IMPORTANT:
    // Your application currently redirects authenticated
    // users to /upload.

    await expect(page).toHaveURL(/\/upload$/);

    await expect(
        page.getByRole('heading', {
            name: 'Upload Requirements',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // 4. VERIFY SESSION STORAGE
    // =========================

    const loggedInUser = await page.evaluate(() => {
        return localStorage.getItem('loggedInUser');
    });

    expect(loggedInUser).not.toBeNull();

    expect(JSON.parse(loggedInUser!)).toEqual({
        username: 'Prasanna'
    });

    // =========================
    // 5. REFRESH SESSION
    // =========================

    await page.reload();

    await expect(page).toHaveURL(/\/upload$/);

    await expect(
        page.getByRole('heading', {
            name: 'Upload Requirements',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // 6. LOGOUT
    // =========================

    await page.getByRole('button', {
        name: /Prasanna/
    }).click();

    await expect(
        page.getByRole('button', {
            name: 'Logout',
            exact: true
        })
    ).toBeVisible();

    await page.getByRole('button', {
        name: 'Logout',
        exact: true
    }).click();

    // =========================
    // 7. VERIFY LOGOUT
    // =========================

    await expect(page).toHaveURL(/\/$/);

    await expect(
        page.getByRole('heading', {
            name: 'Login',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // 8. VERIFY SESSION CLEARED
    // =========================

    const sessionAfterLogout = await page.evaluate(() => {
        return localStorage.getItem('loggedInUser');
    });

    expect(sessionAfterLogout).toBeNull();
});