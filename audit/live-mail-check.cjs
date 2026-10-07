const {chromium,expect}=require('@playwright/test');
const fs=require('fs');
require('@next/env').loadEnvConfig(process.cwd(),true);
const destination=process.env.TEST_MAIL_RECIPIENT;
if(!destination || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(destination))throw new Error('Set TEST_MAIL_RECIPIENT explicitly before running live mail tests.');
if(process.env.MAIL_RECIPIENTS!==destination || process.env.FORM_MAIL_RECIPIENTS!==destination)throw new Error('Live email tests require both recipient settings to match the explicit test destination only.');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});
  for(const route of ['/contact','/book-a-review']){
   try{
    await page.goto('http://localhost:3000'+route);const form=page.locator('main form');
    for(const [name,value] of Object.entries({name:'Mohana Venkatesh — QA test',business:'Website QA only — no client enquiry',email:destination,phone:'+61 400 000 000'}))await form.locator('[name="'+name+'"]').fill(value);
    if(route==='/contact'){await form.locator('[name="type"]').selectOption('General enquiry');await form.locator('[name="message"]').fill('Requested website QA test. Verify contact fields and live email delivery. This is not a client enquiry.');}
    else {await form.locator('[name="employees"]').selectOption('11-50');await form.locator('[name="accounting_system"]').selectOption('Xero');await form.locator('[name="interest"]').selectOption('reporting');await form.locator('[name="challenge"]').fill('Requested website QA test. Verify review fields and live email delivery. No actual booking is requested.');await form.locator('[name="consent"]').check();}
    const responsePromise=page.waitForResponse(r=>r.url().endsWith('/api/contact')&&r.request().method()==='POST',{timeout:60000});
    await form.locator('button[type="submit"]').click();const response=await responsePromise;const body=await response.json();
    expect(response.status()).toBe(200);expect(body.success).toBe(true);await expect(page.locator('main')).toContainText('has been received');await expect(form.locator('[name="email"]')).toHaveValue('');results.push({form:route,success:true,status:response.status(),destination});
   }catch(e){results.push({form:route,success:false,error:e.message.slice(0,500)});}console.log(JSON.stringify(results.at(-1)));
  }
  try{
   await page.goto('http://localhost:3000');const footer=page.locator('footer');await footer.locator('[name="email"]').fill(destination);
   const responsePromise=page.waitForResponse(r=>r.url().endsWith('/api/newsletter')&&r.request().method()==='POST',{timeout:60000});
   await footer.getByRole('button',{name:'Join',exact:true}).click();const response=await responsePromise;const body=await response.json();expect(response.status()).toBe(200);expect(body.success).toBe(true);await expect(footer.getByRole('status')).toContainText('signup request has been sent');await expect(footer.locator('[name="email"]')).toHaveValue('');results.push({form:'newsletter',success:true,status:response.status(),destination});
  }catch(e){results.push({form:'newsletter',success:false,error:e.message.slice(0,500)});}console.log(JSON.stringify(results.at(-1)));
 }finally{await browser.close();}
 fs.writeFileSync('audit/live-mail-report.json',JSON.stringify({checkedAt:new Date().toISOString(),destination,results},null,2));
 if(results.some(r=>!r.success))process.exitCode=1;
})();
