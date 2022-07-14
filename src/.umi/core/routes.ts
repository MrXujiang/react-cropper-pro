// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/apple/Desktop/github/mygithub/react-cropper-pro/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('/Users/apple/Desktop/github/mygithub/react-cropper-pro/node_modules/@umijs/preset-dumi/lib/theme/layout').default],
    "component": (props) => {
        const { default: getDemoRenderArgs } = require('/Users/apple/Desktop/github/mygithub/react-cropper-pro/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer.js');
        const { default: demos } = require('@@/dumi/demos');
        const { usePrefersColor } = require('dumi/theme');

        
      const renderArgs = getDemoRenderArgs(props, demos);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        }
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('/Users/apple/Desktop/github/mygithub/react-cropper-pro/node_modules/@umijs/preset-dumi/lib/theme/layout').default, require('/Users/apple/Desktop/github/mygithub/react-cropper-pro/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/crop",
        "component": require('/Users/apple/Desktop/github/mygithub/react-cropper-pro/src/crop/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/crop/index.md",
          "updatedTime": 1657796321553,
          "componentName": "crop",
          "slugs": [
            {
              "depth": 3,
              "value": "基本使用",
              "heading": "基本使用"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "基本使用",
          "group": {
            "path": "/crop",
            "title": "Crop"
          }
        },
        "title": "基本使用 - cropper-pro"
      },
      {
        "path": "/",
        "component": require('/Users/apple/Desktop/github/mygithub/react-cropper-pro/docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1657805034370,
          "slugs": [
            {
              "depth": 2,
              "value": "Hello react-cropper-pro!",
              "heading": "hello-react-cropper-pro"
            },
            {
              "depth": 3,
              "value": "Install | 安装",
              "heading": "install--安装"
            },
            {
              "depth": 3,
              "value": "Use | 使用",
              "heading": "use--使用"
            },
            {
              "depth": 3,
              "value": "演示 | Demo",
              "heading": "演示--demo"
            },
            {
              "depth": 3,
              "value": "更多产品推荐 | More Production",
              "heading": "更多产品推荐--more-production"
            },
            {
              "depth": 2,
              "value": "赞助 | Sponsored",
              "heading": "赞助--sponsored"
            },
            {
              "depth": 2,
              "value": "技术反馈和交流群 | Technical feedback and communication",
              "heading": "技术反馈和交流群--technical-feedback-and-communication"
            }
          ],
          "title": "Hello react-cropper-pro!"
        },
        "title": "Hello react-cropper-pro! - cropper-pro"
      }
    ],
    "title": "cropper-pro",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
