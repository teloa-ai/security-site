import {cp,mkdir,mkdtemp,readFile,rm} from 'node:fs/promises'
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
  console.log('Built security portal with standalone demo '+demo.revision)
}finally{await rm(checkout,{recursive:true,force:true})}
