import { test, expect } from '@playwright/test';

test.describe('Patient Form & Staff View Real-Time Synchronization', () => {
  test('should display home page with working navigation tiles', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main h1')).toContainText('Patient Intake & Staff Monitoring');
    await expect(page.getByText('Patient Form Interface')).toBeVisible();
    await expect(page.getByText('Staff View Interface')).toBeVisible();
  });

  test('should display custom 404 page for non-existent routes', async ({ page }) => {
    await page.goto('/non-existent-route-path');
    await expect(page.getByRole('heading', { name: 'Oops! Page Not Found' })).toBeVisible();
    await expect(page.getByText('Error 404 — Route Not Found')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to Portal Home' })).toBeVisible();
  });

  test('should synchronize patient inputs to staff view in real time', async ({ browser }) => {
    const patientContext = await browser.newContext();
    const staffContext = await browser.newContext();

    const patientPage = await patientContext.newPage();
    const staffPage = await staffContext.newPage();

    // 1. Open Staff View first
    await staffPage.goto('/staff');
    await expect(
      staffPage.getByRole('heading', { name: 'Live Patient Input Stream' })
    ).toBeVisible();

    // 2. Open Patient Form
    await patientPage.goto('/patient');
    await expect(
      patientPage.getByRole('heading', { name: 'Patient Information Form' })
    ).toBeVisible();

    // 3. Patient types First Name "Jane"
    await patientPage.fill('#firstName', 'Jane');
    // Staff view should mirror "Jane"
    await expect(staffPage.getByText('Jane', { exact: true })).toBeVisible();

    // 4. Patient types Last Name "Doe"
    await patientPage.fill('#lastName', 'Doe');
    await expect(staffPage.getByText('Doe', { exact: true })).toBeVisible();

    // 5. Patient fills Phone & Email
    await patientPage.fill('#phoneNumber', '+15551234567');
    await patientPage.fill('#email', 'jane.doe@example.com');
    await expect(staffPage.getByText('+15551234567')).toBeVisible();
    await expect(staffPage.getByText('jane.doe@example.com')).toBeVisible();

    // 6. Check status badge on staff view
    await expect(staffPage.getByText('Actively Filling In')).toBeVisible();

    await patientContext.close();
    await staffContext.close();
  });

  test('should support bonus features: 1-click sample fill, field focus indicator, audit log, auto-save draft, and export', async ({
    browser,
  }) => {
    const patientContext = await browser.newContext();
    const staffContext = await browser.newContext();

    const patientPage = await patientContext.newPage();
    const staffPage = await staffContext.newPage();

    await staffPage.goto('/staff');
    await expect(
      staffPage.getByRole('heading', { name: 'Live Patient Input Stream' })
    ).toBeVisible();

    await patientPage.goto('/patient');
    await expect(
      patientPage.getByRole('heading', { name: 'Patient Information Form' })
    ).toBeVisible();

    // 1. Test 1-Click Fill Sample Data
    const sampleBtn = patientPage.getByRole('button', { name: 'Fill Sample Data' });
    await sampleBtn.click();

    // Verify sample data populated on patient form
    await expect(patientPage.locator('#firstName')).toHaveValue('Jane');
    await expect(patientPage.locator('#lastName')).toHaveValue('Smith');

    // Verify sample data mirrored on Staff View
    await expect(staffPage.getByText('Smith', { exact: true })).toBeVisible();
    await expect(staffPage.getByText('Springfield')).toBeVisible();

    // 2. Test Field Focus Indicator
    await patientPage.focus('#phoneNumber');
    await expect(staffPage.getByText('Editing...')).toBeVisible();

    // 3. Test Audit Trail Log Panel
    await expect(staffPage.getByText('Audit Trail & Change Log')).toBeVisible();

    // 4. Test Export Buttons on Staff View
    await expect(staffPage.getByRole('button', { name: 'JSON' })).toBeVisible();
    await expect(staffPage.getByRole('button', { name: 'CSV' })).toBeVisible();

    // 5. Test Form Draft Auto-Save on Page Refresh
    await patientPage.reload();
    await expect(
      patientPage.getByRole('heading', { name: 'Patient Information Form' })
    ).toBeVisible();
    await expect(patientPage.locator('#firstName')).toHaveValue('Jane');
    await expect(patientPage.locator('#lastName')).toHaveValue('Smith');

    await patientContext.close();
    await staffContext.close();
  });
});
