import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'cropper-pro',
  favicon: 'http://h5.dooring.cn/uploads/logo_1742fd359da.png',
  logo: 'http://h5.dooring.cn/uploads/logo_1742fd359da.png',
  outputPath: '../../dooring-bs/server/static/react-cropper-pro',
  base: '/react-cropper-pro/',
  publicPath: '/react-cropper-pro/',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  // more config: https://d.umijs.org/config
});
