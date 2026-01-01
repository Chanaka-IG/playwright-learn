const {test,expect} = require('@playwright/test')

test("Validate a celendar component", async ({page})=> {

    const date = "15";
    const month="6";
    const year ="2022";
    const celendar = page.locator(".react-date-picker__inputGroup")
    const topLabel = page.locator(".react-calendar__navigation__label")
    const yearView = page.locator(".react-calendar__decade-view__years")
    const monthView = page.locator(".react-calendar__tile react-calendar__year-view__months__month")
    const dateView = page.locator(".react-calendar__tile react-calendar__month-view__days__day")
    const inputDateField = page.locator(".react-date-picker__inputGroup input")
    const testDate = [month, date, year]

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await celendar.click();
    await topLabel.click();
    await topLabel.click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
    await page.waitForTimeout(5000)
    for(let i=0; i<testDate.length; i++){
        const field=await inputDateField.nth(i+1).inputValue();
        console.log(field)
        console.log(testDate[i])
        expect(field).toEqual(testDate[i])
    }
})