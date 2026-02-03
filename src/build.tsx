
import { build, file } from 'bun'
import { createElement, initNode, writeRouteHtml, writeSitemap } from 'jasser'
import { IndexPage } from './index'

async function buildIndex(rootDir: string){
  initNode()
  let r0 = writeRouteHtml(rootDir, "/index.html", <IndexPage jspath="./index.js"/>)
  let r1 = writeRouteHtml(".", "/index.html", <IndexPage jspath="./out/index.js"/>)
  let r2 = writeRouteHtml(rootDir, "/popup.html", <IndexPage jspath="./popup.js"/>)
  return Promise.all([r0, r1, r2])
}

async function main() {
  let outdir = "./out"
  const result = await build({
    entrypoints: [
      './src/background.ts',
      './src/contentScript.ts',
      './src/popup.ts',
      './src/index.ts',
    ],
    outdir,
    target: 'browser',
    minify: true,
    naming: '[name].js',
  })

  if (result.success) {
    await buildIndex(outdir)
    console.log("build success at", Date())
  } else {
    console.error("build fail:", result.logs)
  }
}

main()