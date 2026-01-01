const {test,expect} = require('@playwright/test');

test("Locator related practise", async({page})=> {

    const nameInput = page.locator("[name='name']").first()
    const emailInput = page.locator("[name='email']")
    const passworsdInput = page.getByPlaceholder("Password")
    const checkBox = page.getByLabel("Check me out if you Love IceCreams!");
    const empStatus = page.getByLabel("Employed");
    const genderDropdown = page.getByLabel("Gender")
    const submitButton = page.getByRole("button", {name: "Submit"})
    const successMsg = page.getByText("Success! The Form has been submitted successfully!.")
    const shopMenu = page.getByRole("link", {name:"Shop"})

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await nameInput.fill("Chanaka Prasad")
    await emailInput.fill("asdasd@gmail.com")
    await passworsdInput.fill("0773379002Chanaka!")
    await checkBox.check();
    await empStatus.check();
    await genderDropdown.selectOption("Male")
    await submitButton.click();

    console.log(await (successMsg).isVisible());

    await shopMenu.click();
    await page.locator("app-card").filter({
        hasText: "Nokia Edge"
    }).getByRole("button",{name:'Add'}).click();
})

