// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts',
      routes: [
        {
          path: '/surah',
          component: './surah',
        },
        {
          path: '/login',
          title: 'Login',
          component: './login',
        },
        {
          path: '/register-user',
          title: 'Register User',
          component: './register-user',
        },
        {
          path: '/favorites',
          title: 'My Favorites',
          component: './favorites',
        },
        {
          path: '/hadith',
          title: 'Hadith',
          component: './hadith',
        },
        {
          path: '/',
          title: 'Surah | Read Quran',
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
        title: 'Online platform to recite, listen and study the holy Quran',
        dll: false,
        fastClick: true,
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
  ], 
  // https://umijs.org/config/#proxy
  // proxy: {
  //   '/api/': {
  //     target: 'http://quran-api.devforislam.xyz/',
  //     changeOrigin: true
  //   },
  // },
};
