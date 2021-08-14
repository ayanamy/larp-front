import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/Login' },
    { path: '/', component: '@/pages/index', redirect: '/login' },
    {
      path: '/',
      component: '@/layouts',
      routes: [
        { path: '/gamer', component: '@/pages/Gamer' },
        { path: '/admin', component: '@/pages/Admin' },
        { path: '/dm', component: '@/pages/DM' },
      ],
    },
  ],
  mfsu: {},
  dva: {
    immer: true,
    disableModelsReExport: false,
    lazyLoad: true,
  },
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
