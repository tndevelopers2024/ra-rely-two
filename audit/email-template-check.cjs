const fs=require('fs');
const ts=require('typescript');
const vm=require('vm');
const assert=require('node:assert/strict');
const {chromium}=require('@playwright/test');
const mail=[];
const env={MAIL_RECIPIENTS:'qa@example.com',FORM_MAIL_RECIPIENTS:'qa@example.com',SMTP_HOST:'smtp.example.invalid',SMTP_PORT:'587',SMTP_USER:'qa@example.com',SMTP_PASSWORD:'test-only',SMTP_FROM:'Rely Advisory Group <qa@example.com>'};
const cache={};
function load(file){
 if(cache[file])return cache[file];const exported={};cache[file]=exported;
 const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText;
 vm.runInNewContext(source,{exports:exported,process:{env},console,require:name=>name.startsWith('@/')?load(name.slice(2)+'.ts'):name==='nodemailer'?{createTransport:()=>({sendMail:async message=>{mail.push(message);return {accepted:message.to};}})}:require(name)},{filename:file});return exported;
}
(async()=>{
 const contact=load('app/api/contact/route.ts');const newsletter=load('app/api/newsletter/route.ts');const template=load('lib/email-template.ts');
 const examples=[
  {key:'contact',route:contact,data:{form:'contact',name:'Mohana Venkatesh',business:'Techie Nutpam',email:'qa@example.com',phone:'+61 400 000 000',type:'Accounts Payable enquiry',message:'We would like to streamline supplier invoice approvals and reduce manual work.\n\nCould we arrange a short conversation about the next practical steps?'}},
  {key:'review',route:contact,data:{form:'review',name:'Mohana Venkatesh',business:'Techie Nutpam',email:'qa@example.com',phone:'+61 400 000 000',employees:'11-50',accounting_system:'Xero',interest:'reporting',challenge:'Our monthly reporting relies on spreadsheets and takes longer than we would like.\n\nWe are looking for clearer dashboards and a consistent reporting timetable.',consent:'on'}},
  {key:'newsletter',route:newsletter,data:{email:'qa@example.com',consent:true}},
 ];
 fs.mkdirSync('audit/email-previews',{recursive:true});
 const results=[];const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  for(const example of examples){
   const r=await example.route.POST(new Request('http://localhost:3000/api/test',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(example.data)}));assert.equal(r.status,200);const m=mail.at(-1);assert.ok(m.text);assert.ok(m.html);assert.equal(m.replyTo,'qa@example.com');assert.deepEqual(Array.from(m.to),['qa@example.com']);assert.ok(m.html.includes('mailto:' + encodeURIComponent('qa@example.com')));if(example.key==='review'){assert.ok(m.html.includes('Management Reporting &amp; Dashboards'));assert.ok(m.html.includes('Confirmed'));}assert.ok(!m.html.includes('<script'));assert.ok(!m.html.includes('http://localhost'));fs.writeFileSync('audit/email-previews/'+example.key+'.html',m.html);
   for(const width of [760,390]){
    const page=await browser.newPage({viewport:{width,height:900}});await page.setContent(m.html);assert.equal(await page.locator('h1').count(),1);assert.ok(await page.locator('body').innerText());assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Email overflows at '+width+'px');assert.equal(await page.locator('a[href^="mailto:"]').count(),1);await page.screenshot({path:'audit/email-previews/'+example.key+'-'+width+'.png',fullPage:true});await page.close();results.push({email:example.key,width,status:'PASS'});
   }
  }
  const attack='<img src=x onerror=alert(1)> & "quoted"';const r=await contact.POST(new Request('http://localhost/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({form:'contact',name:attack,business:'QA',email:'qa@example.com',message:attack+'\n'+('longtext'.repeat(100))})}));assert.equal(r.status,200);const html=mail.at(-1).html;assert.ok(html.includes('&lt;img'));assert.ok(!html.includes('<img'));const page=await browser.newPage({viewport:{width:390,height:900}});await page.setContent(html);assert.equal(await page.locator('img,script').count(),0);assert.ok((await page.locator('body').innerText()).includes(attack));assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Long messages overflow');await page.close();results.push({check:'Untrusted text is escaped and long messages wrap',status:'PASS'});
  assert.equal(template.formatEmailInterest('reporting'),'Management Reporting & Dashboards');assert.equal(template.formatEmailInterest('Other'),'Other');
 }finally{await browser.close();}
 fs.writeFileSync('audit/email-previews/report.json',JSON.stringify({results,realEmailsSent:0},null,2));console.log(JSON.stringify({success:true,previewChecks:results.length,realEmailsSent:0}));
})().catch(e=>{console.error(e);process.exitCode=1;});
