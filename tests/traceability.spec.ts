import { test, expect } from '@playwright/test';

test('user can view and interact with traceability matrix', async ({ page }) => {

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
                },
                {
                    id: 'REQ-003',
                    type: 'FR',
                    title: 'Logout',
                    statement:
                        'User should be able to log out securely'
                }
            ])
        );
    });

    // =========================
    // OPEN TRACEABILITY MATRIX
    // =========================

    await page.goto('/traceability');

    await expect(
        page.getByRole('heading', {
            name: 'Traceability Matrix'
        })
    ).toBeVisible();

    await expect(
        page.getByText(
            'Requirement-to-test coverage visualization'
        )
    ).toBeVisible();

    // =========================
    // VERIFY COVERAGE
    // =========================

    await expect(
        page.getByText('Coverage: 67%')
    ).toBeVisible();

    await expect(
        page.getByText('Uncovered requirements detected')
    ).toBeVisible();

    // =========================
    // VERIFY TABLE HEADERS
    // =========================

    await expect(
        page.getByRole('columnheader', {
            name: 'Requirement ID'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('columnheader', {
            name: 'Type'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('columnheader', {
            name: 'Title'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('columnheader', {
            name: 'Linked Test Cases'
        })
    ).toBeVisible();

    // =========================
    // VERIFY REQUIREMENTS
    // =========================

    await expect(
        page.getByRole('cell', {
            name: 'REQ-001'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('cell', {
            name: 'REQ-002'
        })
    ).toBeVisible();

    await expect(
        page.getByRole('cell', {
            name: 'REQ-003'
        })
    ).toBeVisible();

    // =========================
    // VERIFY LINKED TEST CASES
    // =========================

    await expect(
        page.getByRole('button', {
            name: 'View (2)',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('button', {
            name: 'View (1)',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // VERIFY UNCOVERED REQUIREMENT
    // =========================

    await expect(
        page.getByText('❌ No tests linked')
    ).toBeVisible();

    // =========================
    // EXPAND REQ-001
    // =========================

    await page.getByRole('button', {
        name: 'View (2)',
        exact: true
    }).click();

    await expect(
        page.getByText('TEST-001', {
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByText('TEST-002', {
            exact: true
        })
    ).toBeVisible();

    // =========================
    // COLLAPSE REQ-001
    // =========================

    await page.getByRole('button', {
        name: 'Hide (2)',
        exact: true
    }).click();

    await expect(
        page.getByText('TEST-001', {
            exact: true
        })
    ).not.toBeVisible();

    await expect(
        page.getByText('TEST-002', {
            exact: true
        })
    ).not.toBeVisible();

    // =========================
    // EXPAND REQ-002
    // =========================

    await page.getByRole('button', {
        name: 'View (1)',
        exact: true
    }).click();

    await expect(
        page.getByText('TEST-003', {
            exact: true
        })
    ).toBeVisible();

    // =========================
    // COLLAPSE REQ-002
    // =========================

    await page.getByRole('button', {
        name: 'Hide (1)',
        exact: true
    }).click();

    await expect(
        page.getByText('TEST-003', {
            exact: true
        })
    ).not.toBeVisible();
});