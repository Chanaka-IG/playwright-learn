const {test,expect} = require('@playwright/test')

test("validate Hide functionality", async({page}) => {
    
    const hideButton = page.locator("#hide-textbox")
    const showButton = page.locator("#show-textbox")
    const textArea =  page.locator("#displayed-text")
    const acceptBtn = page.locator("#confirmbtn")
    const hoverBtn = page.locator('#mousehover')
    const hoverContent = page.locator(".mouse-hover-content")

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")

    await hideButton.click();
    await expect (textArea).toBeHidden();
    await showButton.click();
    await expect (textArea).toBeVisible();

    await acceptBtn.click();
    page.on('dialog', dialog => dialog.accept());

    await hoverBtn.hover();
    await hoverContent.waitFor({state: 'visible'});
    await expect (hoverContent).toBeVisible();
    await hoverContent.filter({hasText:'Reload'}).click();


})


