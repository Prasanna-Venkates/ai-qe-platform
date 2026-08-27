import { test, expect } from '@playwright/test';

test('user can view dashboard and its feature cards', async ({ page }) => {

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

    // =========================
    // VERIFY DASHBOARD HEADER
    // =========================

    await expect(
        page.getByRole('heading', {
            name: 'Dashboard',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByText(
            'Welcome to the AI Quality Engineering Platform'
        )
    ).toBeVisible();

    // =========================
    // VERIFY INTRO CARD
    // =========================

    await expect(
        page.getByRole('heading', {
            name: 'AI-Driven Quality Engineering Platform',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByText(
            'This platform helps QA teams and developers generate intelligent test cases from requirements, automate test creation, and seamlessly integrate with popular DevOps tools like Jira, Azure DevOps, and GitHub.'
        )
    ).toBeVisible();

    // =========================
    // VERIFY FEATURE CARDS
    // =========================

    await expect(
        page.getByRole('heading', {
            name: '📋 Requirement-Based Test Generation',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: '🤖 Automation Ready',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: '🔗 Jira Integration',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: '🚀 Azure DevOps Integration',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: '🐙 GitHub Integration',
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', {
            name: '📊 Centralized QA Dashboard',
            exact: true
        })
    ).toBeVisible();

    // =========================
    // VERIFY FEATURE DESCRIPTIONS
    // =========================

    await expect(
        page.getByText(
            'Convert user stories and acceptance criteria into manual, automation, security, and non-functional test cases using AI.'
        )
    ).toBeVisible();

    await expect(
        page.getByText(
            'Generate automation-friendly test artifacts including BDD (Gherkin) scenarios for Selenium, Playwright, or Cypress.'
        )
    ).toBeVisible();

    await expect(
        page.getByText(
            'Sync user stories and requirements directly from Jira projects to ensure traceability and test coverage.'
        )
    ).toBeVisible();

    await expect(
        page.getByText(
            'Connect Azure DevOps projects to manage work items, pipelines, and test execution workflows.'
        )
    ).toBeVisible();

    await expect(
        page.getByText(
            'Link repositories to push generated automation code and maintain test assets alongside application code.'
        )
    ).toBeVisible();

    await expect(
        page.getByText(
            'Track projects, test artifacts, integrations, and AI-generated outputs from a single unified dashboard.'
        )
    ).toBeVisible();

    // =========================
    // VERIFY FEATURE CARD COUNT
    // =========================

    await expect(
        page.locator('.hover-card')
    ).toHaveCount(6);
});