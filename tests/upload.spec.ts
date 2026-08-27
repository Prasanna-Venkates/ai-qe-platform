import { test, expect } from '@playwright/test';

test('user can upload requirements successfully', async ({ page }) => {

    // =========================
    // LOGIN
    // =========================

    await page.goto('/');

    await page.getByText('Sign Up', { exact: true }).click();

    await expect(
        page.getByRole('heading', { name: 'Sign Up' })
    ).toBeVisible();

    await page.getByPlaceholder('Username').fill('Prasanna');
    await page.getByPlaceholder('Password').fill('Prasanna');

    await page.getByRole('button', { name: 'Sign Up' }).click();

    // After signup, application returns to Login
    await expect(
        page.getByRole('heading', { name: 'Login' })
    ).toBeVisible();

    await page.getByPlaceholder('Username').fill('Prasanna');
    await page.getByPlaceholder('Password').fill('Prasanna');

    await page.getByRole('button', { name: 'Login' }).click();

    // =========================
    // VERIFY UPLOAD PAGE
    // =========================

    await expect(page).toHaveURL(/upload/);

    await expect(
        page.getByRole('heading', { name: 'Upload Requirements' })
    ).toBeVisible();

    // =========================
    // FILE UPLOAD
    // =========================

    const fileInput = page.locator('input[type="file"]');

    await fileInput.setInputFiles({
        name: 'sample-requirement.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from(
            'User should be able to login using valid username and password.'
        ),
    });

    // Verify selected file appears
    await expect(
        page.getByText('sample-requirement.txt')
    ).toBeVisible();

    // =========================
    // UPLOAD
    // =========================

    await page.getByRole(
        'button',
        { name: 'Upload & Continue' }
    ).click();

    // Upload.tsx navigates to /projects
    await expect(page).toHaveURL(/projects/);
});