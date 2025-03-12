
import { PlaywrightWrapper } from './playwrightWrapper';
import { Page } from '@playwright/test';

// For future enhancement 
export class ConcretePlaywrightWrapper extends PlaywrightWrapper {
    constructor(page: Page) {
        super(page); // Call the constructor of the abstract class
    }

    // You can add any additional methods here if needed
}
