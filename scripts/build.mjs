import {cp,mkdir,mkdtemp,readFile,rm,writeFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {tmpdir} from 'node:os'
import {resolve,join} from 'node:path'
import {fileURLToPath} from 'node:url'

const root=fileURLToPath(new URL('../',import.meta.url)),output=resolve(root,'dist')
const demo=JSON.parse(await readFile(resolve(root,'demo-project.json'),'utf8'))
if(demo.repository!=='teloa-ai/agent-baseline-assessor'||demo.path!=='agent-baseline-assessor'||!/^[a-f0-9]{40}$/.test(demo.revision))throw Error('Invalid pinned demo project')
const checkout=await mkdtemp(join(tmpdir(),'teloa-security-demo-'))
try{
  execFileSync('git',['init','--quiet',checkout])
  execFileSync('git',['-C',checkout,'fetch','--quiet','--depth=1','https://github.com/'+demo.repository+'.git',demo.revision],{stdio:'inherit'})
  execFileSync('git',['-C',checkout,'checkout','--quiet','--detach','FETCH_HEAD'])
  await rm(output,{recursive:true,force:true})
  await mkdir(output,{recursive:true})
  for(const entry of ['index.html','404.html','assets','report','.well-known','robots.txt','sitemap.xml'])await cp(resolve(root,entry),resolve(output,entry),{recursive:true})
  const target=resolve(output,demo.path),tool=resolve(checkout,'03-tool')
  await mkdir(target,{recursive:true})
  for(const entry of ['index.html','architecture.html','assets','data','vendor','offline'])await cp(resolve(tool,entry),resolve(target,entry),{recursive:true})
  await mkdir(resolve(target,'01-standard'),{recursive:true})
  await cp(resolve(checkout,'01-standard/diagrams'),resolve(target,'01-standard/diagrams'),{recursive:true})
  await cp(resolve(checkout,'02-usage/examples'),resolve(target,'examples'),{recursive:true})
  for(const name of ['LICENSE','LICENSE-DOCS'])await cp(resolve(checkout,name),resolve(target,name))
  // Preserve the demo's response controls and allow only its exact inline scripts.
  const sourceHeaders=await readFile(resolve(tool,'_headers'),'utf8')
  const hashes=[]
  for(const name of ['architecture.html','01-standard/diagrams/index.html']){
    const html=await readFile(resolve(target,name),'utf8')
    for(const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g))hashes.push("'sha256-"+createHash('sha256').update(match[1]).digest('base64')+"'")
  }
  const lines=sourceHeaders.trimEnd().split('\n').slice(1)
  const csp=lines.find(line=>line.trimStart().startsWith('Content-Security-Policy:'))
  if(!csp||hashes.length!==2)throw Error('Unexpected demo security policy or inline scripts')
  const common=lines.filter(line=>line!==csp).join('\n')
  const demoCsp=csp.replace("script-src 'self'","script-src 'self' "+hashes.join(' '))
  await writeFile(resolve(output,'_headers'),'/*\n'+common+'\n\n/'+demo.path+'/*\n'+demoCsp+'\n')
  console.log('Built security portal with standalone demo '+demo.revision)
}finally{await rm(checkout,{recursive:true,force:true})}
