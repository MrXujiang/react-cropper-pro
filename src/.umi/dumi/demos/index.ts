// @ts-nocheck
import React from 'react';
import { dynamic } from 'dumi';
import rawCode1 from '!!dumi-raw-code-loader!/Users/apple/Desktop/github/mygithub/react-cropper-pro/src/crop/index.tsx?dumi-raw-code';
import rawCode2 from '!!dumi-raw-code-loader!/Users/apple/Desktop/github/mygithub/react-cropper-pro/src/crop/index.less?dumi-raw-code';

export default {
  'crop-demo': {
    component: function DumiDemo() {
  var _interopRequireDefault = require("/Users/apple/Desktop/github/mygithub/react-cropper-pro/node_modules/@umijs/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault");

  var _react = _interopRequireDefault(require("react"));

  var _ = _interopRequireDefault(require("/Users/apple/Desktop/github/mygithub/react-cropper-pro/src/crop/"));

  var _default = function _default() {
    return /*#__PURE__*/_react.default.createElement(_.default, {
      defaultImg: "http://h5.dooring.cn/uploads/image_176b751adef.png",
      onChange: function onChange(file) {
        return console.log(file);
      }
    });
  };

  return _react["default"].createElement(_default);
},
    previewerProps: {"sources":{"_":{"tsx":"import React from 'react';\nimport { message, Button } from 'antd';\nimport Cropper from './';\n\nexport default () => {\n  return (\n    <Cropper defaultImg=\"http://h5.dooring.cn/uploads/image_176b751adef.png\" onChange={(file) => console.log(file)} />\n  );\n};"},"index.tsx":{"import":"./","content":rawCode1},"index.less":{"import":"./index.less","content":rawCode2}},"dependencies":{"react":{"version":">=16.0.0"},"react-dom":{"version":"16.14.0"},"react-cropper":{"version":"2.1.8"},"cropperjs":{"version":"1.5.12"}},"componentName":"crop","identifier":"crop-demo"},
  },
  'docs-demo': {
    component: function DumiDemo() {
  var _interopRequireDefault = require("/Users/apple/Desktop/github/mygithub/react-cropper-pro/node_modules/@umijs/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault");

  var _react = _interopRequireDefault(require("react"));

  var _default = function _default() {
    return /*#__PURE__*/_react.default.createElement("div", null);
  };

  return _react["default"].createElement(_default);
},
    previewerProps: {"sources":{"_":{"tsx":"import React from 'react';\nimport { message, Button } from 'antd';\n\n\nexport default () => {\n  return (\n    <div>\n      \n    </div>\n  );\n};"}},"dependencies":{"react":{"version":"16.14.0"}},"identifier":"docs-demo"},
  },
};
