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
              "value": "????????????",
              "heading": "????????????"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "????????????",
          "group": {
            "path": "/crop",
            "title": "Crop"
          }
        },
        "title": "???????????? - cropper-pro"
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
              "value": "Install | ??????",
              "heading": "install--??????"
            },
            {
              "depth": 3,
              "value": "Use | ??????",
              "heading": "use--??????"
            },
            {
              "depth": 3,
              "value": "?????? | Demo",
              "heading": "??????--demo"
            },
            {
              "depth": 3,
              "value": "?????????????????? | More Production",
              "heading": "??????????????????--more-production"
            },
            {
              "depth": 2,
              "value": "?????? | Sponsored",
              "heading": "??????--sponsored"
            },
            {
              "depth": 2,
              "value": "???????????????????????? | Technical feedback and communication",
              "heading": "????????????????????????--technical-feedback-and-communication"
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
