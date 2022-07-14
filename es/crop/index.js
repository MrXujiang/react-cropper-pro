import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./index.css";
var aspectRatioMap = [0, 1, 2, 4 / 3, 16 / 9];
var aspectRatioLabel = ['自由裁切', '1 : 1', '2 : 1', '4 / 3', '16 / 9'];
var imgLevelMap = {
  1: '低',
  2: '中',
  3: '高',
  4: '不压缩'
};
var imgLevelValueMap = {
  1: 'low',
  2: 'medium',
  3: 'high',
  4: 'high'
};

var CropperPro = function CropperPro(_ref) {
  var _ref$defaultImg = _ref.defaultImg,
      defaultImg = _ref$defaultImg === void 0 ? '' : _ref$defaultImg,
      _ref$imgData = _ref.imgData,
      imgData = _ref$imgData === void 0 ? '' : _ref$imgData,
      onChange = _ref.onChange,
      onDel = _ref.onDel;

  var _useState = useState(defaultImg),
      _useState2 = _slicedToArray(_useState, 2),
      image = _useState2[0],
      setImage = _useState2[1];

  var _useState3 = useState(imgData || defaultImg),
      _useState4 = _slicedToArray(_useState3, 2),
      cropData = _useState4[0],
      setCropData = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      cropper = _useState6[0],
      setCropper = _useState6[1];

  var _useState7 = useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      visable = _useState8[0],
      setVisable = _useState8[1];

  var _useState9 = useState(2),
      _useState10 = _slicedToArray(_useState9, 2),
      imgLevel = _useState10[0],
      setImgLevel = _useState10[1];

  var fileRef = useRef(null);

  var handleChange = function handleChange(e) {
    e.preventDefault();
    var files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    var reader = new FileReader();

    reader.onload = function () {
      setImage(reader.result);
    };

    var file = files[0];
    file.uid = Date.now();
    reader.readAsDataURL(file);
    setVisable(2);
    e.target.value = '';
    fileRef.current = {
      type: file.type,
      name: file.name,
      file: file
    };
  };

  var getCropData = function getCropData() {
    if (+imgLevel === 4) {
      var reader = new FileReader();

      reader.onload = function () {
        setCropData(reader.result);
      };

      reader.readAsDataURL(fileRef.current.file);
      onChange && onChange(fileRef.current.file);
    }

    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      var rate = 1 / (4 - imgLevel);

      var _cropper$getCropBoxDa = cropper.getCropBoxData(),
          width = _cropper$getCropBoxDa.width,
          height = _cropper$getCropBoxDa.height;

      cropper.getCroppedCanvas({
        width: width * rate,
        height: height * rate,
        imageSmoothingQuality: imgLevelValueMap[imgLevel],
        fillColor: 'transparent'
      }).toBlob(function (blob) {
        if (blob) {
          var time = Date.now();
          var croppedFile = new File([blob], fileRef.current.name, {
            type: fileRef.current.type,
            lastModified: Date.now()
          });
          croppedFile.uid = time;
          onChange && onChange(croppedFile);
        } else {
          new Error('图片裁切失败');
        }
      }, fileRef.current.type, rate);
    }
  };

  var handleRotate = function handleRotate(type) {
    cropper.rotate(type ? 90 : -90);
  };

  var handleAspectRatio = function handleAspectRatio(v) {
    cropper.setAspectRatio(v);
  };

  var handleLevelChange = function handleLevelChange(e) {
    setImgLevel(e.target.value);
  };

  var handleClose = function handleClose() {
    setVisable(1);
  };

  var handleOk = function handleOk() {
    getCropData();
    setVisable(1);
  };

  var handleCancel = function handleCancel() {
    setVisable(1);
  };

  var handleDel = function handleDel() {
    setCropData('');
    onDel && onDel(cropData);
  };

  useEffect(function () {
    imgData && setCropData(imgData);
  }, [imgData]);
  var cropModal = useMemo(function () {
    return visable !== 0 && /*#__PURE__*/React.createElement("div", {
      className: "xi-cropper-modal",
      style: {
        display: visable !== 1 ? 'flex' : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "cropper-modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cropper-modal-header"
    }, "\u88C1\u5207\u8BBE\u7F6E ", /*#__PURE__*/React.createElement("span", {
      className: "cropper-modal-close-btn",
      onClick: handleClose
    }, "\u2715")), /*#__PURE__*/React.createElement(Cropper, {
      style: {
        height: 400,
        width: "100%"
      },
      dragMode: "move",
      zoomTo: 0,
      initialAspectRatio: 0,
      preview: ".img-preview",
      src: image,
      viewMode: 2,
      minCropBoxHeight: 10,
      minCropBoxWidth: 10,
      background: false,
      responsive: true,
      autoCropArea: 1,
      checkOrientation: false,
      onInitialized: function onInitialized(instance) {
        setCropper(instance);
      },
      guides: true
    }), /*#__PURE__*/React.createElement("div", {
      className: "crop-controlWrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "crop-control"
    }, aspectRatioMap.map(function (v, i) {
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        className: "crop-control-item",
        onClick: function onClick() {
          return handleAspectRatio(v);
        }
      }, aspectRatioLabel[i]);
    })), /*#__PURE__*/React.createElement("div", {
      className: "crop-control"
    }, /*#__PURE__*/React.createElement("span", {
      className: "crop-control-item",
      onClick: function onClick() {
        return handleRotate(1);
      }
    }, "\u27F3"), /*#__PURE__*/React.createElement("span", {
      className: "crop-control-item",
      onClick: function onClick() {
        return handleRotate(0);
      }
    }, "\u27F2")), /*#__PURE__*/React.createElement("div", {
      className: "crop-control"
    }, "\u56FE\u7247\u8D28\u91CF:", /*#__PURE__*/React.createElement("span", {
      className: "crop-control-item"
    }, /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: "1",
      max: "4",
      step: "1",
      value: imgLevel,
      onChange: handleLevelChange
    })), imgLevelMap[imgLevel])), /*#__PURE__*/React.createElement("div", {
      className: "cropper-modal-footer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-cancel",
      onClick: handleCancel
    }, "\u53D6\u6D88"), /*#__PURE__*/React.createElement("div", {
      className: "modal-ok",
      onClick: handleOk
    }, "\u786E\u5B9A"))), /*#__PURE__*/React.createElement("div", {
      className: "xi-cropper-modalMask"
    }));
  }, [visable, image, imgLevel]);
  return /*#__PURE__*/React.createElement("div", {
    className: "xi-cropper-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "xi-cropper-upload"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    onChange: handleChange,
    accept: "image/gif,image/jpeg,image/jpg,image/png"
  }), /*#__PURE__*/React.createElement("div", {
    className: "xi-cropper-file"
  }, cropData ? /*#__PURE__*/React.createElement("img", {
    src: cropData
  }) : '+', !!cropData && /*#__PURE__*/React.createElement("span", {
    className: "xi-cropper-del",
    onClick: handleDel
  }, "\u2715"))), /*#__PURE__*/createPortal(cropModal, document.body));
};

export default CropperPro;