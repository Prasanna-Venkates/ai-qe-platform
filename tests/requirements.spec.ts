import { test, expect } from '@playwright/test';

test('user can view, search and filter requirements', async ({ page }) => {

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

        localStorage.setItem(
            'uploadedRequirements',
            JSON.stringify([
                {
                    id: 'REQ-001',
                    type: 'FR',
                    title: 'User Login',
                    statement: 'User should be able to log in using valid credentials',
                },
                {
                    id: 'REQ-002',
                    type: 'NFR',
                    title: 'Performance',
                    statement: 'System should respond within 2 seconds',
                },
                {
                    id: 'REQ-003',
                    type: 'FR',
                    title: 'Logout',
                    statement: 'User should be able to log out securely',
                },
            ])
        );
    });

    // =========================
    // OPEN REQUIREMENTS PAGE
    // =========================

    await page.goto('/requirements');

    await expect(
        page.getByRole('heading', {
            name: 'Requirements Viewer'
        })
    ).toBeVisible();

    // =========================
    // VERIFY REQUIREMENTS
    // =========================

    await expect(
        page.getByRole('heading', {
            name: 'User Login'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'Performance'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'Logout'
        })
    ).toBeVisible();

    // =========================
    // SEARCH
    // =========================

    const searchInput = page.getByPlaceholder(
        'Search requirements...'
    );

    await searchInput.fill('Performance');

    await expect(
        page.getByRole('heading', {
            name: 'Performance'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'User Login'
        })
    ).not.toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'Logout'
        })
    ).not.toBeVisible();

    // =========================
    // CLEAR SEARCH
    // =========================

    await searchInput.fill('');

    await expect(
        page.getByRole('heading', {
            name: 'User Login'
        })
    ).toBeVisible();

    // =========================
    // FUNCTIONAL FILTER
    // =========================

    await page.getByRole('button', {
        name: 'Functional',
        exact: true
    }).click();

    await expect(
        page.getByRole('heading', {
            name: 'User Login'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'Logout'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'Performance'
        })
    ).not.toBeVisible();

    // =========================
    // NON-FUNCTIONAL FILTER
    // =========================

    await page.getByRole('button', {
        name: 'Non-Functional',
        exact: true
    }).click();

    await expect(
        page.getByRole('heading', {
            name: 'Performance'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'User Login'
        })
    ).not.toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'Logout'
        })
    ).not.toBeVisible();

    // =========================
    // RETURN TO ALL
    // =========================

    await page.getByRole('button', {
        name: 'All',
        exact: true
    }).click();

    await expect(
        page.getByRole('heading', {
            name: 'User Login'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'Performance'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: 'Logout'
        })
    ).toBeVisible();
});