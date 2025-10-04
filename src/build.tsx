
import { build, file } from 'bun'
import { createElement, writeRouteHtml, writeSitemap } from 'jasser'
import { IndexPage } from './index'

async function buildIndex(rootDir: string, jscontent: string){
  let page = <IndexPage jscontent={jscontent}/>
  let r0 = writeRouteHtml(rootDir, "/index.html", page)
  let r1 = writeRouteHtml(".", "/index.html", page)
  return Promise.all([r0, r1])
}

async function main() {
  let outdir = "./out"
  const result = await build({
    entrypoints: [
      './src/background.ts',
      './src/contentScript.ts',
      './src/popup.ts',
    ],
    outdir,
    target: 'browser',
    minify: true,
    naming: '[name].js',
  })

  if (result.success) {
    result.outputs.forEach((item)=>console.log("write:", item.path))
    let jscontent = await file(outdir + "/popup.js").text()
    await buildIndex(outdir, jscontent)
    console.log("build success")
  } else {
    console.error("build fail:", result.logs)
  }
}

main()