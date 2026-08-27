import { test, expect } from '@playwright/test';

test('user can navigate using sidebar and logout from topbar', async ({ page }) => {

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
    // OPEN DASHBOARD
    // =========================

    await page.goto('/home');

    await expect(
        page.getByRole('heading', {
            name: 'Dashboard',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // VERIFY SIDEBAR
    // =========================

    await expect(
        page.getByRole('link', {
            name: 'Upload',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('link', {
            name: 'Requirements',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('link', {
            name: 'Test Cases',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('link', {
            name: 'Traceability Matrix',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('link', {
            name: 'Dashboard',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('link', {
            name: 'Projects',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('link', {
            name: 'Automation Settings',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('link', {
            name: 'Jira Integration',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('link', {
            name: 'Azure DevOps Integration',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('link', {
            name: 'GitHub Integration',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // NAVIGATE TO REQUIREMENTS
    // =========================

    await page.getByRole('link', {
        name: 'Requirements',
        exact: true
    }).click();

    await expect(page).toHaveURL(/\/requirements$/);

    await expect(
        page.getByRole('heading', {
            name: 'Requirements Viewer',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // NAVIGATE TO TEST CASES
    // =========================

    await page.getByRole('link', {
        name: 'Test Cases',
        exact: true
    }).click();

    await expect(page).toHaveURL(/\/test-cases$/);

    await expect(
        page.getByRole('heading', {
            name: 'Test Case Explorer',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // NAVIGATE TO TRACEABILITY
    // =========================

    await page.getByRole('link', {
        name: 'Traceability Matrix',
        exact: true
    }).click();

    await expect(page).toHaveURL(/\/traceability$/);

    await expect(
        page.getByRole('heading', {
            name: 'Traceability Matrix',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // NAVIGATE TO PROJECTS
    // =========================

    await page.getByRole('link', {
        name: 'Projects',
        exact: true
    }).click();

    await expect(page).toHaveURL(/\/projects$/);

    await expect(
        page.getByRole('heading', {
            name: 'Projects',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // VERIFY USER MENU
    // =========================

    await expect(
        page.getByRole('button', {
            name: /Prasanna/
        })
    ).toBeVisible();

    await page.getByRole('button', {
        name: /Prasanna/
    }).click();

    // =========================
    // VERIFY LOGOUT OPTION
    // =========================

    await expect(
        page.getByRole('button', {
            name: 'Logout',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // LOGOUT
    // =========================

    await page.getByRole('button', {
        name: 'Logout',
        exact: true
    }).click();

    // =========================
    // VERIFY LOGOUT
    // =========================

    await expect(page).toHaveURL(/\/$/);

    await expect(
        page.getByRole('heading', {
            name: 'Login',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // VERIFY SESSION CLEARED
    // =========================

    const loggedInUser = await page.evaluate(() => {
        return localStorage.getItem('loggedInUser');
    });

    expect(loggedInUser).toBeNull();
});