import { test, expect } from '@playwright/test';

test('user can create, edit and delete a project', async ({ page }) => {

    // =========================
    // LOGIN
    // =========================

    await page.goto('/');

    // Signup
    await page.getByText('Sign Up', { exact: true }).click();

    await page.getByPlaceholder('Username').fill('Prasanna');
    await page.getByPlaceholder('Password').fill('Prasanna');

    await page.getByRole('button', { name: 'Sign Up' }).click();

    // After signup, the Login component automatically
    // switches back to the Login form.

    // Login
    await page.getByPlaceholder('Username').fill('Prasanna');
    await page.getByPlaceholder('Password').fill('Prasanna');

    await page.getByRole('button', { name: 'Login' }).click();

    // =========================
    // GO TO PROJECTS
    // =========================

    await page.goto('/projects');

    await expect(
        page.getByRole('heading', { name: 'Projects' })
    ).toBeVisible();

    // =========================
    // CREATE PROJECT
    // =========================

    await page.getByRole('button', { name: 'Add Project' }).click();

    await page
        .getByPlaceholder('Project Name')
        .fill('Playwright Automation');

    await page
        .getByPlaceholder('Project Description')
        .fill('Automation testing using Playwright');

    await page
        .getByPlaceholder('Domain (e.g. Banking, E-Commerce)')
        .fill('Testing');

    await page
        .getByPlaceholder('Tech Stack (comma separated)')
        .fill('Playwright, JavaScript, TypeScript');

    await page
        .getByRole('button', { name: 'Create Project' })
        .click();

    // =========================
    // VERIFY CREATION
    // =========================

    await expect(
        page.getByRole('heading', { name: 'Success' })
    ).toBeVisible();

    await expect(
        page.getByText('Project created successfully 🚀')
    ).toBeVisible();

    await page.getByRole('button', { name: 'OK' }).click();

    await expect(
        page.getByRole('heading', {
            name: 'Playwright Automation'
        })
    ).toBeVisible();

    // =========================
    // EDIT PROJECT
    // =========================

    const projectCard = page
        .locator('.project-card')
        .filter({
            has: page.getByRole('heading', {
                name: 'Playwright Automation'
            })
        });

    await projectCard
        .getByRole('button', { name: 'Edit' })
        .click();

    await page
        .getByPlaceholder('Project Name')
        .fill('Playwright Automation Updated');

    await page
        .getByPlaceholder('Project Description')
        .fill('Updated Playwright automation project');

    await page
        .getByRole('button', { name: 'Update Project' })
        .click();

    // =========================
    // VERIFY UPDATE
    // =========================

    await expect(
        page.getByText('Project updated successfully ✅')
    ).toBeVisible();

    await page.getByRole('button', { name: 'OK' }).click();

    await expect(
        page.getByRole('heading', {
            name: 'Playwright Automation Updated'
        })
    ).toBeVisible();

    // =========================
    // DELETE PROJECT
    // =========================

    const updatedProjectCard = page
        .locator('.project-card')
        .filter({
            has: page.getByRole('heading', {
                name: 'Playwright Automation Updated'
            })
        });

    await updatedProjectCard
        .getByRole('button', { name: 'Delete' })
        .click();

    // =========================
    // VERIFY DELETE MODAL
    // =========================

    await expect(
        page.getByRole('heading', {
            name: 'Delete Project?'
        })
    ).toBeVisible();

    // Scope the Delete button to the confirmation modal
    const deleteModal = page
        .locator('.modal')
        .filter({
            has: page.getByRole('heading', {
                name: 'Delete Project?'
            })
        });

    await deleteModal
        .getByRole('button', { name: 'Delete' })
        .click();

    // =========================
    // VERIFY DELETION
    // =========================

    await expect(
        page.getByText('Project deleted successfully 🗑️')
    ).toBeVisible();

    await page.getByRole('button', { name: 'OK' }).click();

    await expect(
        page.getByRole('heading', {
            name: 'Playwright Automation Updated'
        })
    ).not.toBeVisible();
});