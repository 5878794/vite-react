//@ts-nocheck
import { defineConfig,loadEnv } from 'vite'
// import react from '@vitejs/plugin-react-swc'
import react from "@vitejs/plugin-react";
import { resolve } from 'path';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default ({mode})=>{
  const env = loadEnv(mode,process.cwd());
  return defineConfig({
    server: {
      hmr: false, //禁用时时更新
      // watch:{  //禁止监听 需要重新dev才会读取
      // ignored:['**/src/com/**']
      // },
      host: '0.0.0.0',
      https: true
    },
    base:env.VITE_BASE_URL,
    // build:{
    //   outDir:'dist/client',
    // },
    plugins: [
        mkcert(),
        react({
          babel:{
            plugins:[
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }]
            ]
          }
        })
    ],
    resolve:{
      alias:{
        '@': resolve(__dirname, 'src')
      }
    }
  })
}
