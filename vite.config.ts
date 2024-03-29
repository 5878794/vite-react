//@ts-nocheck
import { defineConfig,loadEnv } from 'vite'
// import react from '@vitejs/plugin-react-swc'
import react from "@vitejs/plugin-react";
import { resolve } from 'path';

// https://vitejs.dev/config/
export default ({mode})=>{
  const env = loadEnv(mode,process.cwd());
  return defineConfig({
    base:env.VITE_BASE_URL,
    // build:{
    //   outDir:'dist/client',
    // },
    plugins: [
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
