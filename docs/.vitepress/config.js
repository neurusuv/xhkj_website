export default {
  title: '重庆信衡科技',
  description: '视觉感知引领者，智能系统赋能者',
  lang: 'zh-CN',
  // GitHub Pages 项目站点需要设置 base 为仓库名
  base: '/xhkj_website/',
  vite: {
    resolve: {
      preserveSymlinks: true
    },
    server: {
      host: '127.0.0.1',
      hmr: {
        overlay: false
      },
      watch: {
        usePolling: true
      },
      fs: {
        allow: ['..']
      }
    },
    optimizeDeps: {
      exclude: ['vitepress']
    }
  },
  themeConfig: {
    logo: '/logo3.png',
    siteTitle: false,
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about' },
      { text: '产品', link: '/products' },
      { text: '技术与质量', link: '/technology' },
      { text: '应用领域', link: '/applications' },
      { text: '联系我们', link: '/contact' }
    ],
    sidebar: {
      '/': [
        {
          text: '概览',
          items: [
            { text: '首页', link: '/' },
            { text: '关于信衡', link: '/about' },
            { text: '产品与解决方案', link: '/products' },
            { text: '技术与质量保障', link: '/technology' },
            { text: '应用领域', link: '/applications' },
            { text: '联系我们', link: '/contact' }
          ]
        }
      ]
    },
    footer: {
      message: '版权所有',
      copyright: '© 重庆信衡科技有限责任公司'
    }
  }
}