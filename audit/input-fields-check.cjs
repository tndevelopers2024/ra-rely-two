const { chromium, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ts = require('typescript');
const assert = require('node:assert/strict');
const results = [];
const baseURL = 'http://localhost:3000';
async function check(name, fn) {
  try { await fn(); results.push({ name, status: 'PASS' }); console.log('PASS ' + name); }
  catch (e) { results.push({ name, status: 'FAIL', detail: e.message }); console.log('FAIL ' + name + ': ' + e.message.slice(0, 240)); }
}
(async () => {
 const browser = await chromium.launch({ channel: 'chrome', headless: true });
 try {
 for (const width of [1440, 390]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  for (const route of ['/contact', '/book-a-review']) {
   const page = await context.newPage();
   const errors = []; page.on('pageerror', e => errors.push(e.message));
   const payloads = []; let mode = 'success'; let release;
   await page.route('**/api/contact', async r => {
    payloads.push(r.request().postDataJSON());
    if (mode === 'network') return r.abort('failed');
    if (mode === 'pending') await new Promise(resolve => { release = resolve; });
    await r.fulfill({status: mode === 'error' ? 502 : 200, contentType:'application/json', body:JSON.stringify(mode === 'error' ? {success:false,error:'Test SMTP delivery failure'} : {success:true})});
   });
   await page.goto(baseURL + route);
   const form = page.locator('main form'); const submit = form.locator('button[type="submit"]');
   const review = route === '/book-a-review'; const prefix = width + 'px ' + route;
   const data = {name:"QA Mohana O'Neil",business:'QA Rely & Co',email:'qa@example.com',phone:'+61 400 000 000'};
   if (review) Object.assign(data,{employees:'11-50',accounting_system:'Xero',interest:'reporting',challenge:'QA only: improve monthly reports.\nNo client enquiry.',consent:'on'});
   else Object.assign(data,{type:'Reporting & Dashboards',message:'QA only: test every contact field.\nNo client enquiry.'});
   async function fill() {
    for(const [name,value] of Object.entries(data)) {
     const el=form.locator('[name="'+name+'"]');
     if(name==='consent') await el.check(); else if(['employees','accounting_system','interest','type'].includes(name)) await el.selectOption(value); else await el.fill(value);
    }
   }
   await check(prefix+' blocks empty submission',async()=>{await submit.click();assert.equal(payloads.length,0);assert.equal(await form.evaluate(f=>f.checkValidity()),false);});
   await fill();
   for(const name of ['name','business','email',review?'consent':'message']) {
    await check(prefix+' requires '+name,async()=>{
     const el=form.locator('[name="'+name+'"]');if(name==='consent')await el.uncheck();else await el.fill('');
     const before=payloads.length;await submit.click();assert.equal(payloads.length,before);assert.equal(await el.evaluate(e=>e.validity.valueMissing),true);await fill();
    });
   }
   await check(prefix+' rejects invalid email',async()=>{const el=form.locator('[name="email"]');await el.fill('not-an-email');const before=payloads.length;await submit.click();assert.equal(payloads.length,before);assert.equal(await el.evaluate(e=>e.validity.typeMismatch),true);await fill();});
   for (const name of review?['employees','accounting_system','interest']:['type']) {
    await check(prefix+' all '+name+' choices selectable',async()=>{
     const el=form.locator('[name="'+name+'"]');const values=await el.locator('option').evaluateAll(opts=>opts.map(o=>o.value));
     for(const value of values){await el.selectOption(value);await expect(el).toHaveValue(value);}await el.selectOption(data[name]);
    });
   }
   await check(prefix+' pending state, full payload, and success reset',async()=>{
    await fill();mode='pending';const before=payloads.length;await submit.click();await expect(submit).toBeDisabled();await expect.poll(()=>payloads.length).toBe(before+1);
    assert.deepEqual(payloads.at(-1),{form:review?'review':'contact',website:'',...data});
    assert.equal(typeof release,'function');release();await expect(page.locator('main')).toContainText('has been received');await expect(submit).toBeEnabled();
    for(const name of ['name','business','email','phone',review?'challenge':'message'])await expect(form.locator('[name="'+name+'"]')).toHaveValue('');
    if(review)await expect(form.locator('[name="consent"]')).not.toBeChecked();mode='success';
   });
   await check(prefix+' SMTP failure retains input and permits retry',async()=>{await fill();mode='error';await submit.click();await expect(page.getByText('Test SMTP delivery failure')).toBeVisible();await expect(submit).toBeEnabled();for(const name of ['name','business','email','phone',review?'challenge':'message'])await expect(form.locator('[name="'+name+'"]')).toHaveValue(data[name]);});
   await check(prefix+' network failure retains input',async()=>{mode='network';await submit.click();await expect(page.getByText('A network error occurred. Please try again.')).toBeVisible();await expect(form.locator('[name="email"]')).toHaveValue(data.email);await expect(submit).toBeEnabled();});
   await check(prefix+' optional fields may be empty',async()=>{
    await fill();mode='success';for(const name of review?['phone','employees','accounting_system','challenge']:['phone']){const el=form.locator('[name="'+name+'"]');if(['employees','accounting_system'].includes(name))await el.selectOption('');else await el.fill('');}
    await submit.click();await expect(page.locator('main')).toContainText('has been received');
   });
   await check(prefix+' visible fields have associated labels',async()=>{
    const missing=await form.locator('input:not([type="hidden"]):not([name="website"]), select, textarea').evaluateAll(els=>els.filter(e=>!e.labels?.length&&!e.getAttribute('aria-label')&&!e.getAttribute('aria-labelledby')).map(e=>e.name));assert.deepEqual(missing,[]);
   });
   await check(prefix+' no JavaScript errors',async()=>assert.deepEqual(errors,[]));
   await page.close();
  }
  const page=await context.newPage(); await page.route('**/api/newsletter', r => r.fulfill({status:200,contentType:'application/json',body:JSON.stringify({success:true})})); await page.goto(baseURL+'/finance-health-check');
  await check(width+'px health check all 10 radio groups selectable',async()=>{
   for(let i=0;i<10;i++){const options=page.locator('main input[name="q_'+i+'"]');assert.equal(await options.count(),5);for(let j=0;j<5;j++){await options.nth(j).check();await expect(options.nth(j)).toBeChecked();assert.equal(await options.evaluateAll(els=>els.filter(e=>e.checked).length),1);}}
  });
  await check(width+'px health check answers have distinct values',async()=>{const values=await page.locator('main input[name="q_0"]').evaluateAll(els=>els.map(e=>e.value));assert.equal(new Set(values).size,5,'All five answer choices have the same default value: on');});
  await check(width+'px health check produces a result',async()=>{
   const before=await page.locator('main').innerText();await page.getByRole('button',{name:'Receive My Result and Recommendations'}).click();await page.waitForTimeout(500);assert.notEqual(await page.locator('main').innerText(),before,'Result button does nothing after all 10 questions are answered');
  });
  const newsletter=page.locator('footer form');const email=newsletter.locator('input[type="email"]');let requests=0;page.on('request',r=>{if(['POST','PUT'].includes(r.method()))requests++;});
  await check(width+'px newsletter rejects empty and invalid email',async()=>{await newsletter.getByRole('button',{name:'Join'}).click();assert.equal(await email.evaluate(e=>e.validity.valueMissing),true);await email.fill('bad-address');await newsletter.getByRole('button',{name:'Join'}).click();assert.equal(await email.evaluate(e=>e.validity.typeMismatch),true);assert.equal(requests,0);});
  await check(width+'px newsletter submits valid email',async()=>{await email.fill('qa@example.com');const before=await newsletter.innerText();await newsletter.getByRole('button',{name:'Join'}).click();await page.waitForTimeout(500);assert.ok(requests>0||(await newsletter.innerText())!==before,'Join sends no request and displays no confirmation');});
  await context.close();
 }
 // Real endpoint validation: all these inputs must be rejected before SMTP is reached.
 const valid={form:'contact',name:'QA Test',business:'QA Business',email:'qa@example.com',message:'QA validation only'};
 const invalidCases=[['empty payload',{}],['missing name',{...valid,name:''}],['whitespace name',{...valid,name:'   '}],['missing business',{...valid,business:''}],['whitespace business',{...valid,business:'   '}],['invalid email',{...valid,email:'invalid'}],['missing message',{...valid,message:''}],['whitespace message',{...valid,message:'  '}],['invalid form type',{...valid,form:'unknown'}],['review without consent',{...valid,form:'review'}]];
 for(const [field,max] of [['name',200],['business',200],['email',254],['phone',100],['type',200],['message',5000],['employees',100],['accounting_system',200],['interest',200],['challenge',5000]])invalidCases.push(['oversized '+field,{...valid,[field]:'a'.repeat(max+1)}]);
 for(const [name,data] of invalidCases)await check('API rejects '+name,async()=>{const r=await fetch(baseURL+'/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});assert.equal(r.status,400);assert.equal((await r.json()).success,false);});
 await check('API rejects malformed JSON',async()=>{const r=await fetch(baseURL+'/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:'{broken'});assert.equal(r.status,400);});
 await check('API silently discards honeypot submissions',async()=>{const r=await fetch(baseURL+'/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({website:'spam'})});assert.equal(r.status,200);assert.equal((await r.json()).success,true);});
 // Execute the actual route with a captured SMTP transport, so no test messages reach business inboxes.
 const mail=[];let transportMode='ok';let options;
 const source=ts.transpileModule(fs.readFileSync('app/api/contact/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText;
 const exported={};const testEnv={SMTP_HOST:'smtp.test.invalid',SMTP_PORT:'587',SMTP_USER:'qa@example.com',SMTP_PASSWORD:'dummy-test-only',SMTP_FROM:'QA <qa@example.com>',MAIL_RECIPIENTS:'qa@example.com',FORM_MAIL_RECIPIENTS:'qa@example.com'};
 const templateExports={}; vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/email-template.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,{exports:templateExports});
 const sandbox={exports:exported,process:{env:testEnv},console:{error:()=>{}},require:name=>name==='@/lib/email-template'?templateExports:name==='@/lib/mail-recipients'?recipientExports:name==='nodemailer'?{createTransport:o=>{options=o;return {sendMail:async m=>{mail.push(m);if(transportMode==='error')throw new Error('Test SMTP failure');return {accepted:transportMode==='partial'?[]:m.to};}};}}:require(name)};
 const recipientExports={}; vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/mail-recipients.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,{exports:recipientExports,process:{env:testEnv},require});
 vm.runInNewContext(source,sandbox,{filename:'contact-route-test.js'});
 async function post(data){return exported.POST(new Request(baseURL+'/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}));}
 for(const kind of ['contact','review'])await check('Backend '+kind+' email contains every submitted field',async()=>{
  const data={form:kind,name:' QA Name ',business:' QA Business ',email:'qa@example.com',phone:'+61 400 000 000',type:'General enquiry',message:'QA contact message',employees:'11-50',accounting_system:'Xero',interest:'reporting',challenge:'QA review challenge',consent:'on'};
  const r=await post(data);assert.equal(r.status,200);const m=mail.at(-1);for(const value of Object.values(data).filter(v=>!['contact','review','on'].includes(v)))assert.ok(m.text.includes(value.trim()),'Missing value: '+value);assert.ok(m.text.includes('Consent to contact: Yes'));assert.equal(m.replyTo,data.email);assert.deepEqual(Array.from(m.to),['qa@example.com']);assert.equal(options.requireTLS,true);assert.equal(options.secure,false);
 });
 await check('Backend reports partial SMTP recipient rejection',async()=>{transportMode='partial';assert.equal((await post(valid)).status,502);});
 await check('Backend reports SMTP delivery failure',async()=>{transportMode='error';assert.equal((await post(valid)).status,502);});
 await check('Backend missing password blocks delivery',async()=>{transportMode='ok';testEnv.SMTP_PASSWORD='';const before=mail.length;assert.equal((await post(valid)).status,503);assert.equal(mail.length,before);testEnv.SMTP_PASSWORD='dummy-test-only';});

 const newsletterExports={};
 vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/api/newsletter/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText,{...sandbox,exports:newsletterExports},{filename:'newsletter-route-test.js'});
 async function newsletterPost(data){return newsletterExports.POST(new Request(baseURL+'/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}));}
 for(const [name,data] of [['empty payload',{}],['invalid email',{email:'invalid',consent:true}],['missing consent',{email:'qa@example.com'}],['false consent',{email:'qa@example.com',consent:false}],['oversized email',{email:'a'.repeat(255),consent:true}]])await check('Newsletter API rejects '+name,async()=>{const r=await fetch(baseURL+'/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});assert.equal(r.status,400);});
 await check('Newsletter backend sends signup details only to configured Gmail',async()=>{transportMode='ok';const r=await newsletterPost({email:'qa@example.com',consent:true,to:'unapproved@example.com'});assert.equal(r.status,200);const m=mail.at(-1);assert.deepEqual(Array.from(m.to),['qa@example.com']);assert.equal(m.replyTo,'qa@example.com');for(const text of ['Email: qa@example.com','Consent:','Requested at:','Source:'])assert.ok(m.text.includes(text));});
 await check('Newsletter backend ignores honeypot without sending',async()=>{const before=mail.length;assert.equal((await newsletterPost({email:'qa@example.com',consent:true,website:'spam'})).status,200);assert.equal(mail.length,before);});
 for(const mode of ['error','partial'])await check('Newsletter backend handles SMTP '+mode,async()=>{transportMode=mode;assert.equal((await newsletterPost({email:'qa@example.com',consent:true})).status,502);});
 await check('All form routes fail safely without configured recipients',async()=>{transportMode='ok';testEnv.MAIL_RECIPIENTS='';testEnv.FORM_MAIL_RECIPIENTS='';const before=mail.length;assert.equal((await post(valid)).status,503);assert.equal((await newsletterPost({email:'qa@example.com',consent:true})).status,503);assert.equal(mail.length,before);testEnv.MAIL_RECIPIENTS='qa@example.com';testEnv.FORM_MAIL_RECIPIENTS='qa@example.com';});
 await check('Recipient configuration validates, normalises and deduplicates addresses',async()=>{testEnv.MAIL_RECIPIENTS=' qa@example.com, qa@example.com ';assert.deepEqual(Array.from(recipientExports.getMailRecipients()),['qa@example.com']);testEnv.MAIL_RECIPIENTS='invalid';assert.equal(recipientExports.getMailRecipients(),null);testEnv.MAIL_RECIPIENTS='qa@example.com';testEnv.FORM_MAIL_RECIPIENTS='qa@example.com';});
 await check('Contact ignores visitor-supplied recipient overrides',async()=>{transportMode='ok';assert.equal((await post({...valid,to:'unapproved@example.com',recipients:['unapproved@example.com']})).status,200);assert.deepEqual(Array.from(mail.at(-1).to),['qa@example.com']);});
 } finally {await browser.close();}
 const report={checkedAt:new Date().toISOString(),baseURL,browser:'installed Google Chrome',realEmailsSent:0,passed:results.filter(r=>r.status==='PASS').length,failed:results.filter(r=>r.status==='FAIL').length,results};
 fs.writeFileSync(path.join('audit','input-fields-report.json'),JSON.stringify(report,null,2));
 console.log('SUMMARY '+JSON.stringify({passed:report.passed,failed:report.failed,realEmailsSent:0}));
})().catch(e=>{console.error(e);process.exitCode=1;});
