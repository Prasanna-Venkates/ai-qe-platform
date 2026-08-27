import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly signupButton: Locator;
    readonly loginHeading: Locator;
    readonly signupHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');

        this.loginButton = page.getByRole('button', {
            name: 'Login',
            exact: true
        });

        this.signupButton = page.getByRole('button', {
            name: 'Sign Up',
            exact: true
        });

        this.loginHeading = page.getByRole('heading', {
            name: 'Login',
            exact: true
        });

        this.signupHeading = page.getByRole('heading', {
            name: 'Sign Up',
            exact: true
        });
    }

    async goto() {
        await this.page.goto('/');
    }

    async openSignup() {
        await this.page.getByText('Sign Up', {
            exact: true
        }).click();

        await expect(this.signupHeading).toBeVisible();
    }

    async signup(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

        await this.signupButton.click();

        await expect(this.loginHeading).toBeVisible();
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

        await this.loginButton.click();
    }

    async expectLoggedIn() {
        await expect(this.page).toHaveURL(/upload/);
    }
}