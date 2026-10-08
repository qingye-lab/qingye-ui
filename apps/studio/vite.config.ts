import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import {readFileSync} from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// @ts-expect-error The local ESM HTTP boundary is separately exercised by node:test.
import { createService,studioSourceSnapshot } from './server/service.mjs';

const ui = fileURLToPath(new URL('../../packages/ui/',import.meta.url));
const paths=(process.env.QINGYE_STUDIO_PROJECTS??'').split(',').filter(Boolean).map(p=>resolve(p));
const snapshot=studioSourceSnapshot();
const service=()=>({name:'qingye-local-projects',configureServer(server:any){const boundary=createService(paths);server.middlewares.use(boundary.middleware);},configurePreviewServer(server:any){const built=JSON.parse(readFileSync(fileURLToPath(new URL('./dist/preview-source.json',import.meta.url)),'utf8'));const boundary=createService(paths,{previewSnapshot:built});server.middlewares.use(boundary.middleware);},generateBundle(this:any){this.emitFile({type:'asset',fileName:'preview-source.json',source:JSON.stringify(snapshot,null,2)+'\n'});}});
export default defineConfig({
  plugins:[react(),tailwindcss(),service()],
  resolve:{alias:[
    {find:/^@qingye_lab\/ui\/components\/(.*)$/,replacement:`${ui}src/components/$1`},
    {find:/^@qingye_lab\/ui\/locale$/,replacement:`${ui}src/locale.tsx`},
    {find:/^@qingye_lab\/ui\/utils$/,replacement:`${ui}src/utils.ts`},
    {find:/^@qingye_lab\/ui\/(.*\.css)$/,replacement:`${ui}$1`},
  ]},
  server:{host:'127.0.0.1',port:5181,strictPort:true},preview:{host:'127.0.0.1',port:5181,strictPort:true},
  build:{rollupOptions:{input:{studio:fileURLToPath(new URL('./index.html',import.meta.url)),preview:fileURLToPath(new URL('./preview.html',import.meta.url))}}}
});
