import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://puma21-temp14-kord.orangehrm.com/');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('_ohrmSysAdmin_');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin@OHRM123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://puma21-temp14-kord.orangehrm.com/client/#/dashboard');
  await page.getByRole('link', { name: 'Employee List' }).click();
  await page.getByRole('link', { name: 'emp_firstname_115' }).click();
  await page.getByText('More more_vert').click();
  await page.locator('sub-menu-container').getByRole('link', { name: 'Payslips' }).click();
  await page.locator('#employeePimTabsDivMuliple a').filter({ hasText: 'add' }).click();
  await page.locator('oxd-decorator').filter({ hasText: 'Payment Start DatePayment' }).getByRole('button').click();
  await page.getByRole('gridcell', { name: '-11-04' }).click();
  await page.locator('oxd-decorator').filter({ hasText: 'Payment End DatePayment End' }).getByRole('button').click();
  await page.getByRole('gridcell', { name: '-11-28' }).click();
  await page.getByRole('button', { name: 'Payslip' }).click();
  await page.getByRole('button', { name: 'Payslip' }).setInputFiles('4444-Dutch-payroll-correction-2024-11-4.pdf');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByText('-11-04').click();
  await page.getByRole('cell', { name: '-11-28' }).click();
  await page.getByRole('link', { name: 'oxd_logout_round Log Out' }).click();
});