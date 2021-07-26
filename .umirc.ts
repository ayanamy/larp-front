import { defineConfig } from 'umi';
const path = require('path');
console.log(path.resolve(__dirname, 'dist'));
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/gamer', component: '@/pages/Gamer' },
    { path: '/admin', component: '@/pages/Admin' },
    { path: '/dm', component: '@/pages/DM' },
  ],
  mfsu: {},
  fastRefresh: {},
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    memo.output.set(
      'path',
      '/home/culler/code/workspace/game/src/main/resources/templates/dist',
    );
  },
  proxy: {
    '/api': {
      target: `http://localhost:8011`, // 测试环境
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
