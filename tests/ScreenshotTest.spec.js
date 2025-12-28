const {test,expect} = require('@playwright/test')
const path = require('path')
const fs = require('fs')

test ("Validate Screenshots", async({page}) => {
  
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
  await candidateScreen.click();
  await addCandidateBtn.waitFor({state : 'visible'})
  // ensure TestScreenshots directory exists (resolve relative to this test file)
  const outDir = path.resolve(__dirname, '../TestScreenshots')
  fs.mkdirSync(outDir, { recursive: true })
  await page.screenshot({ path: path.join(outDir, 'candidate.png') })
  await addCandidateBtn.screenshot({ path: path.join(outDir, 'addButton.png') })
  await page.waitForTimeout(3000)

})

test ("Validate Compare Screenshots", async({page}) => {
  
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
  await candidateScreen.click();
  await addCandidateBtn.waitFor({state : 'visible'})
  // ensure TestScreenshots directory exists (resolve relative to this test file)
  expect (await page.screenshot()).toMatchSnapshot("Candidate.png")  

  await page.waitForTimeout(3000)

}) 