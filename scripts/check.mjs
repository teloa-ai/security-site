import assert from 'node:assert/strict'
import {readFile,readdir} from 'node:fs/promises'
import {resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const root=fileURLToPath(new URL('../dist/',import.meta.url))
const page=await readFile(resolve(root,'index.html'),'utf8')
const headers=await readFile(resolve(root,'_headers'),'utf8')
assert.match(headers,/\/agent-baseline-assessor\/\*\n  Content-Security-Policy:/)
assert.match(headers,/connect-src 'none'/)
assert.match(headers,/X-Content-Type-Options: nosniff/)
assert.equal((headers.match(/'sha256-[^']+'/g)||[]).length,2)
assert.match(page,/data-security-page="home"/)
assert.match(await readFile(resolve(root,'report/index.html'),'utf8'),/mailto:security@teloa.ai/)
assert.match(await readFile(resolve(root,'.well-known/security.txt'),'utf8'),/Policy: https:\/\/security\.teloa\.ai\/report\//)
for(const name of ['index.html','01-standard/diagrams/index.html']){
  const html=await readFile(resolve(root,'agent-baseline-assessor',name),'utf8')
  assert.doesNotMatch(html,/site-chrome|TeloaSiteChrome|teloa-site-header/,'The project demo must remain independent from the portal')
}
for(const locale of ['en','zh-CN','ja','ko','de','fr','es']){
  for(const diagram of ['agent-stack.png','reference-architecture.png'])await readFile(resolve(root,'agent-baseline-assessor/01-standard/diagrams',locale,diagram))
}
async function inspect(directory){
  for(const entry of await readdir(directory,{withFileTypes:true})){
    assert(!['.git','node_modules','superpowers','CNAME'].includes(entry.name),'Private or deployment-specific files must not enter the output: '+entry.name)
    const path=resolve(directory,entry.name)
    if(entry.isDirectory())await inspect(path)
    else if(/\.(?:html|css|js|json|txt|md)$/.test(entry.name))assert.doesNotMatch(await readFile(path,'utf8'),/\/Users\/max\/|teloa-workspace\/|docs\/superpowers\//,path)
  }
}
await inspect(root)
console.log('PASS portal routes, standalone demo, seven diagram languages, public output boundary')
