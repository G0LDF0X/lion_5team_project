import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import polyfillNode from 'rollup-plugin-polyfill-node';
// import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    polyfillNode(),
    // viteCompression({
    //   // 압축 알고리즘 지정, 기본적으로는 'gzip'을 사용
    //   algorithm: "gzip",
    //   // 압축된 파일의 확장자를 '.gz'로 설정
    //   ext: ".gz",
    // }),
  ],
  // resolve: {
  //   alias: {
  //     // Polyfill `global` as `globalThis`
  //     'global': 'globalthis',
  //   },
  // },
});