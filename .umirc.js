// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../components/layouts/Layouts',
      routes: [
        {
          path: '/surah',
          title: 'Surah',
          component: './surah',
        },
        {
          path: '/login',
          component: './login',
        },
        {
          path: '/register-user',
          component: './register-user',
        },
        {
          path: '/favorites',
          component: './favorites',
        },
        {
          path: '/hadith',
          component: './hadith',
        },
        {
          path: '/',
          title: 'Surah',
          component: './surah',
        },
        {
          path: '/',
          component: '../pages/index',
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'learnquran-new1',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ], // https://umijs.org/config/#proxy
  // proxy: {
  //   '/api/': {
  //     target: 'http://quran-api.devforislam.xyz/',
  //     changeOrigin: true
  //   },
  // },
};
