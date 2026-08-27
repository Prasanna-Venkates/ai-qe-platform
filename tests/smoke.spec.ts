import { test, expect } from '@playwright/test';

test('AI QE Platform login page loads successfully', async ({ page }) => {

    await page.goto('/');

    // Verify Login heading
    await expect(
        page.getByRole('heading', { name: 'Login' })
    ).toBeVisible();

    // Verify username field
    await expect(
        page.getByPlaceholder('Username')
    ).toBeVisible();

    // Verify password field
    await expect(
        page.getByPlaceholder('Password')
    ).toBeVisible();

    // Verify Login button
    await expect(
        page.getByRole('button', { name: 'Login' })
    ).toBeVisible();

});