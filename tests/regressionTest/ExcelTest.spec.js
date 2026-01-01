import { test, expect } from '@playwright/test';
const ExceJs = require('exceljs')
let colNumb;
let rowNumb;
const arrValue = []

test("Validate excel download and upload scenarios", async ({page}) => {

    const downloadBtn = page.getByRole("button",{name: "Download"})
    const chooseBtn = page.locator("#fileinput")
    const changeValue = 750

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")
    const [download] = await Promise.all([
    page.waitForEvent("download"),
    downloadBtn.click()
    ]);
    const filePath = "/home/administrator/Downloads/download.xlsx";
    await download.saveAs(filePath);
    await writeExcel("/home/administrator/Downloads/download.xlsx", "Sheet1", "Apple",changeValue)
    await chooseBtn.click()
    await chooseBtn.setInputFiles("/home/administrator/Downloads/download.xlsx")
    Validatedata(changeValue,arrValue[0], arrValue[1] + 2)

    async function writeExcel(path, sheet, searchText, replaceText) {
        const workbook = new ExceJs.Workbook()
        await workbook.xlsx.readFile(path)
        const worksheet = workbook.getWorksheet(sheet)
        const finalValue = await readExcel(worksheet, searchText);
        const cellValue = worksheet.getCell(finalValue[0], finalValue[1] + 2)
        cellValue.value = replaceText
        await workbook.xlsx.writeFile(path,finalValue[0], finalValue[1] + 2)
    }
    async function readExcel(worksheet, searchText) {
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if (cell.value == searchText) {
                    rowNumb = rowNumber
                    colNumb = colNumber
                    arrValue.push(rowNumb)
                    arrValue.push(colNumb)
                }

            })
        })
        return (arrValue)
    }

    async function Validatedata(changedValue) {
        const updateValue = await page.locator("//div[@role='row']").filter({hasText: "Apple"}).locator("//div[@id='cell-4-undefined']").textContent();
        console.log(updateValue)
        expect (parseInt(updateValue)).toEqual(changedValue)
    }
})

