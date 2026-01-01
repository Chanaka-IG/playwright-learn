const {test,expect} = require('@playwright/test')

test ("Validate interception of candidate API", async({page}) => {
  
  const userName = page.locator("#txtUsername")
  const passwordField = page.locator("#txtPassword")
  const submitBtn = page.locator("button", {hasText:"Login"})
  const candidateScreen = page.getByRole('link', { name: 'Recruitment (ATS)'} )
  const emptyIcon = page.locator(".empty-msg")
  const addCandidateBtn = page.locator("//button[@tooltip='Add Candidate']")
  const data = []


  await page.goto("https://puma09-temp14-kord.orangehrm.com/");
  await userName.fill("_ohrmSysAdmin_")
  await passwordField.fill("admin@OHRM123")
  await submitBtn.click()

  await page.route("**/api/recruitment/candidates**",async route => {
    const response = await page.request.fetch(route.request())
    console.log(response)
    const body = JSON.stringify(data)
    route.fulfill({
      response,
      body
    })
  })

  await candidateScreen.click();
  await page.waitForResponse("**/api/recruitment/candidates**")
  await addCandidateBtn.waitFor({state:"visible"})
  console.log(await emptyIcon.innerText())


  await page.waitForTimeout(3000)


})