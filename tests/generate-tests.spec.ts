import { test, expect } from '@playwright/test';

test('user can generate and view different test artifacts', async ({ page }) => {

    // =========================
    // SETUP AUTHENTICATION
    // =========================

    await page.goto('/');

    await page.evaluate(() => {
        localStorage.setItem(
            'loggedInUser',
            JSON.stringify({
                username: 'Prasanna'
            })
        );
    });

    // =========================
    // OPEN GENERATE TESTS PAGE
    // =========================

    await page.goto('/projects/1/generate-tests');

    await expect(
        page.getByRole('heading', {
            name: 'Generated Test Artifacts'
        })
    ).toBeVisible();

    await expect(
        page.getByText(
            'AI-generated test cases based on your requirements'
        )
    ).toBeVisible();

    // =========================
    // VERIFY GENERATE BUTTON
    // =========================

    const generateButton = page.getByRole('button', {
        name: 'Generate Tests',
        exact: true
    });

    await expect(generateButton).toBeVisible();

    // =========================
    // START GENERATION
    // =========================

    await generateButton.click();

    // Generation panel should appear
    await expect(
        page.locator('.generation-panel')
    ).toBeVisible();

    // Progress section should appear
    await expect(
        page.locator('.progress-wrapper')
    ).toBeVisible();

    // =========================
    // WAIT FOR GENERATION TO COMPLETE
    // =========================

    await expect(
        page.getByText('AI generation completed successfully ✅')
    ).toBeVisible({
        timeout: 15000
    });

    // =========================
    // VERIFY ARTIFACT TABS
    // =========================

    await expect(
        page.getByRole('button', {
            name: 'Manual Test Cases',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('button', {
            name: 'Automation (BDD)',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('button', {
            name: 'Security Tests',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('button', {
            name: 'Non-Functional Tests',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // MANUAL TEST CASES
    // =========================

    await expect(
        page.locator('.tab-content pre')
    ).toBeVisible();

    // =========================
    // AUTOMATION / BDD
    // =========================

    await page.getByRole('button', {
        name: 'Automation (BDD)',
        exact: true
    }).click();

    await expect(
        page.locator('.tab-content pre')
    ).toContainText('Feature: User Login');

    await expect(
        page.locator('.tab-content pre')
    ).toContainText('Scenario: Successful login');

    // =========================
    // SECURITY TESTS
    // =========================

    await page.getByRole('button', {
        name: 'Security Tests',
        exact: true
    }).click();

    await expect(
        page.locator('.tab-content pre')
    ).toContainText('SQL injection');

    await expect(
        page.locator('.tab-content pre')
    ).toContainText('brute-force');

    // =========================
    // NON-FUNCTIONAL TESTS
    // =========================

    await page.getByRole('button', {
        name: 'Non-Functional Tests',
        exact: true
    }).click();

    await expect(
        page.locator('.tab-content pre')
    ).toContainText('response time');

    await expect(
        page.locator('.tab-content pre')
    ).toContainText('concurrent user handling');

    // =========================
    // RETURN TO MANUAL TEST CASES
    // =========================

    await page.getByRole('button', {
        name: 'Manual Test Cases',
        exact: true
    }).click();

    await expect(
        page.locator('.tab-content pre')
    ).toBeVisible();
});