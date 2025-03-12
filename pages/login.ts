import { Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwrightWrapper";
import { UrlConstants } from "../constants/appConstants";
import { Users } from "../constants/users";


export class LoginPage extends PlaywrightWrapper{

    static pageUrl =  UrlConstants.SF_URL;   

    constructor(page: Page){
        super(page);
      }

   /*
    Navigates to the login page.
    */
    public async navigateToLoginPage() {
        await this.loadApp(LoginPage.pageUrl);
    }

    /*
    Performs login with predefined credentials. 
    */
    public async Login(){
        await this.type("//input[@name='username']","UserName",Users.adminUserName);
        await this.type("//input[@name='pw']","Password", Users.adminPassword);
        await this.click("//input[@name='Login']","Login","Button");
    }    

}