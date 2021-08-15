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
    lazyLoad: true,
  },
  fastRefresh: {},
  chunks:
    process.env.NODE_ENV === 'production'
      ? ['reactVendor', 'antd', 'umiVendor', 'vendors', 'default', 'umi']
      : ['umi'],

  // dynamicImport: {},
  devtool:
    process.env.NODE_ENV === 'production'
      ? 'source-map'
      : 'cheap-module-source-map',
  chainWebpack(config, { env, webpack, createCSSRule }) {
    config.output.set(
      'path',
      '/home/culler/code/workspace/game/src/main/resources/templates/dist',
    );
    if (process.env.NODE_ENV === 'production') {
      config.merge({
        optimization: {
          splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 3,
            automaticNameDelimiter: '.',
            cacheGroups: {
              // vendor: {
              //   name: 'vendors',
              //   test({ resource }: { resource: string }) {
              //     return /[\\/]node_modules[\\/]/.test(resource);
              //   },
              //   priority: 10,
              // },
              reactVendor: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: 'reactVendor',
                enforce: true,
                priority: 5,
              },
              antd: {
                test: /[\\/]node_modules[\\/](antd)[\\/]/,
                name: 'antd',
                enforce: true,
                priority: 4,
              },
              umiVendor: {
                test: /[\\/]node_modules[\\/](umi).*[\\/]/,
                name: 'umiVendor',
                enforce: true,
                priority: 3,
              },
              vendors: {
                name: 'vendors',
                enforce: true,
                priority: 1,
                test: /[\\/]node_modules[\\/]((?!(@dzg|antd|react|react-dom|umi)).*)[\\/]/,
              },
              default: {
                test: /[\\/]src[\\/]((?!(pages)).*)[\\/]/,
                name: 'default',
                enforce: true,
              },
            },
          },
        },
      });
    }
  },
   publicPath: '/larp/',
  hash: true,
  history: { type: 'hash' },
  proxy: {
    '/api': {
      target: `http://localhost:8011`, // 测试环境
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
