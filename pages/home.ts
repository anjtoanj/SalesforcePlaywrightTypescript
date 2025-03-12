import { Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwrightWrapper";



export class HomePage extends PlaywrightWrapper{

    constructor(page: Page){
        super(page);
      }

    /*
    Navigates to the App Launcher button.
    */
    async clickAppLauncher() {
        await this.click( 'button[title="App Launcher"]', 'App Launcher', 'Button' );        
    }
    
    async clickCreate(){
        await this.click( "//a[@title='Create Menu']","Create Users, Email template, Flow etc ","Button")
    }
    
    async createSingleUser(){
        await this.click('a[title="Users"]', "Create Single User", "Dropdown option");
    }

    async createMultipleUsers(){
        await this.click('a[title="Multiple Users"]', "Create Multiple Users", "Dropdown option");
    }
    async createCustomObjectr(){
        await this.click('a[title="Custom Object"]', "Create Custom Object", "Dropdown option");
    }

    async createEmailTemplate(){
        await this.click('a[title="Email Template"]', "Create Email Template", "Dropdown option");
    }

    async createFlow(){
        await this.click('a[title="Flow"]', "Create Flow", "Dropdown option");
    }
    
    
    
    
}     