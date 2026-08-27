import { test, expect } from '@playwright/test';

test('user can signup and login successfully', async ({ page }) => {

    await page.goto('/');

    // -------------------------
    // SIGN UP
    // -------------------------

    await page.getByText('Sign Up', { exact: true }).click();

    await expect(
        page.getByRole('heading', { name: 'Sign Up' })
    ).toBeVisible();

    await page.getByPlaceholder('Username').fill('Prasanna');
    await page.getByPlaceholder('Password').fill('Prasanna');

    await page.getByRole('button', { name: 'Sign Up' }).click();

    // -------------------------
    // LOGIN
    // -------------------------

    await expect(
        page.getByRole('heading', { name: 'Login' })
    ).toBeVisible();

    await page.getByPlaceholder('Username').fill('Prasanna');
    await page.getByPlaceholder('Password').fill('Prasanna');

    await page.getByRole('button', { name: 'Login' }).click();

    // -------------------------
    // VERIFY LOGIN
    // -------------------------

    await expect(page).toHaveURL(/upload/);
});