import { test, expect } from '@playwright/test';

test('user can filter, view and inspect test cases', async ({ page }) => {

    // =========================
    // SETUP AUTHENTICATION + DATA
    // =========================

    await page.goto('/');

    await page.evaluate(() => {
        localStorage.setItem(
            'loggedInUser',
            JSON.stringify({
                username: 'Prasanna'
            })
        );

        localStorage.setItem(
            'uploadedRequirements',
            JSON.stringify([
                {
                    id: 'REQ-001',
                    type: 'FR',
                    title: 'User Login',
                    statement:
                        'User should be able to log in using valid credentials'
                },
                {
                    id: 'REQ-002',
                    type: 'NFR',
                    title: 'Performance',
                    statement:
                        'System should respond within 2 seconds'
                }
            ])
        );
    });

    // =========================
    // OPEN TEST CASE EXPLORER
    // =========================

    await page.goto('/test-cases');

    await expect(
        page.getByRole('heading', {
            name: 'Test Case Explorer'
        })
    ).toBeVisible();

    // =========================
    // VERIFY TEST CASES
    // =========================

    await expect(
        page.getByRole('heading', {
            name: 'Login with valid credentials'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'Login with invalid password'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'System response time under load'
        })
    ).toBeVisible();

    // =========================
    // VERIFY REQUIREMENT FILTER
    // =========================

    const requirementFilter = page.locator('select').nth(0);

    await requirementFilter.selectOption('REQ-001');

    await expect(
        page.getByRole('heading', {
            name: 'Login with valid credentials'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'Login with invalid password'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'System response time under load'
        })
    ).not.toBeVisible();

    // =========================
    // RESET REQUIREMENT FILTER
    // =========================

    await requirementFilter.selectOption('ALL');

    // =========================
    // VERIFY TYPE FILTER
    // =========================

    const typeFilter = page.locator('select').nth(1);

    await typeFilter.selectOption('Negative');

    await expect(
        page.getByRole('heading', {
            name: 'Login with invalid password'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'Login with valid credentials'
        })
    ).not.toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'System response time under load'
        })
    ).not.toBeVisible();

    // =========================
    // RESET TYPE FILTER
    // =========================

    await typeFilter.selectOption('ALL');

    // =========================
    // VIEW TEST CASE DETAILS
    // =========================

    const validLoginCard = page
        .locator('.tc-card')
        .filter({
            has: page.getByRole('heading', {
                name: 'Login with valid credentials'
            })
        });

    await validLoginCard
        .getByRole('button', {
            name: 'View Details',
            exact: true
        })
        .click();

    // =========================
    // VERIFY DETAILS
    // =========================

    await expect(
        validLoginCard.getByText('Steps:')
    ).toBeVisible();

    await expect(
        validLoginCard.getByText(
            'Navigate to login page'
        )
    ).toBeVisible();

    await expect(
        validLoginCard.getByText(
            'Enter valid username and password'
        )
    ).toBeVisible();

    await expect(
        validLoginCard.getByText(
            'Click Login'
        )
    ).toBeVisible();

    await expect(
        validLoginCard.getByText('Expected Result:')
    ).toBeVisible();

    await expect(
        validLoginCard.getByText(
            'User is redirected to dashboard'
        )
    ).toBeVisible();

    // =========================
    // HIDE DETAILS
    // =========================

    await validLoginCard
        .getByRole('button', {
            name: 'Hide Details',
            exact: true
        })
        .click();

    await expect(
        validLoginCard.getByText('Steps:')
    ).not.toBeVisible();

    // =========================
    // REQUIREMENT SIDE PANEL
    // =========================

    await validLoginCard
        .getByText('REQ-001', {
            exact: true
        })
        .click();

    await expect(
        page.locator('.tc-side-panel')
    ).toBeVisible();

    await expect(
        page.locator('.tc-side-panel').getByRole('heading', {
            name: 'REQ-001'
        })
    ).toBeVisible();

    await expect(
        page.locator('.tc-side-panel').getByRole('heading', {
            name: 'User Login'
        })
    ).toBeVisible();

    await expect(
        page.locator('.tc-side-panel').getByText(
            'User should be able to log in using valid credentials'
        )
    ).toBeVisible();

    // =========================
    // CLOSE SIDE PANEL
    // =========================

    await page
        .locator('.tc-side-panel')
        .getByRole('button')
        .click();

    await expect(
        page.locator('.tc-side-panel')
    ).not.toBeVisible();
});