import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { IProp } from '../type';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import './index.less';

const aspectRatioMap = [
  0, 1, 2, 4 / 3, 16 / 9
];
const aspectRatioLabel = [
  '自由裁切', '1 : 1', '2 : 1', '4 / 3', '16 / 9'
];
const imgLevelMap = {
  1: '低',
  2: '中',
  3: '高',
  4: '不压缩'
};
const imgLevelValueMap = {
  1: 'low',
  2: 'medium',
  3: 'high',
  4: 'high'
}

const CropperPro: React.FC<IProp> = ({
  defaultImg = '',
  imgData = '',
  defaultLevel = 4,
  onChange,
  onDel
}) => {
  const [image, setImage] = useState(defaultImg);
  const [cropData, setCropData] = useState(imgData || defaultImg);
  const [cropper, setCropper] = useState<any>();
  const [visable, setVisable] = useState(0);
  const [imgLevel, setImgLevel] = useState(defaultLevel);
  const fileRef = useRef<any>(null);
  const handleChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    const file = files[0];
    file.uid = Date.now();
    reader.readAsDataURL(file);
    setVisable(2);
    e.target.value = '';
    fileRef.current = {
      type: file.type,
      name: file.name,
      file: file
    }
  };

  const getCropData = () => {
    if(+imgLevel === 4) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropData(reader.result as any);
      };
      reader.readAsDataURL(fileRef.current.file);
      
      onChange && onChange(fileRef.current.file)
    }
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      const rate = 1 / (4 - imgLevel);
      const { width, height } = cropper.getCropBoxData();
      cropper.getCroppedCanvas({
        width: width * rate,
        height: height * rate,
        imageSmoothingQuality: imgLevelValueMap[imgLevel],
        fillColor: 'transparent',
      }).toBlob((blob: Blob) => {
        if(blob) {
          const time = Date.now();
          let croppedFile:any = new File([blob], fileRef.current.name, {
            type: fileRef.current.type,
            lastModified: Date.now(),
          });
          croppedFile.uid = time;
          onChange && onChange(croppedFile)
        }else {
          new Error('图片裁切失败');
        }
        
      }, fileRef.current.type, rate)
    }
  };

  const handleRotate = (type: number) => {
    cropper.rotate(type ? 90 : -90);
  }

  const handleAspectRatio = (v: number) => {
    cropper.setAspectRatio(v);
  }

  const handleLevelChange = (e: any) => {
    setImgLevel(e.target.value)
  }

  const handleClose = () => {
    setVisable(1);
  }

  const handleOk = () => {
    getCropData();
    setVisable(1);
  }

  const handleCancel = () => {
    setVisable(1);
  }

  const handleDel = () => {
    setCropData('');
    onDel && onDel(cropData)
  }

  useEffect(() => {
    imgData && setCropData(imgData);
  }, [imgData])

  const cropModal = useMemo(() => {
    return visable !== 0 && 
      <div className="xi-cropper-modal" style={{display: visable !== 1 ? 'flex' : 'none'}}>
        <div className="cropper-modal-content">
          <div className="cropper-modal-header">
            裁切设置 <span className="cropper-modal-close-btn" onClick={handleClose}>✕</span>
          </div>
          <Cropper
            style={{ height: 400, width: "100%" }}
            dragMode="move"
            zoomTo={0}
            initialAspectRatio={0}
            preview=".img-preview"
            src={image}
            viewMode={2}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
          <div className="crop-controlWrap">
            <div className="crop-control">
              {
                aspectRatioMap.map((v,i) => {
                  return <span key={i} className="crop-control-item" onClick={() => handleAspectRatio(v)}>
                    { aspectRatioLabel[i] }
                  </span>
                })
              }
            </div>
            <div className="crop-control">
              <span className="crop-control-item" onClick={() => handleRotate(1)}>⟳</span>
              <span className="crop-control-item" onClick={() => handleRotate(0)}>⟲</span>
            </div>
            <div className="crop-control">
              图片质量: 
              <span className="crop-control-item">
                <input type="range" min="1" max="4" step="1" value={imgLevel} onChange={handleLevelChange}  />
              </span>
              { imgLevelMap[imgLevel] }
            </div>
          </div>
          <div className="cropper-modal-footer">
            <div className='modal-cancel' onClick={handleCancel}>取消</div>
            <div className='modal-ok' onClick={handleOk}>确定</div>
          </div>
        </div>
        <div className="xi-cropper-modalMask"></div>
      </div>
  }, [visable, image, imgLevel])

  return (
    <div className="xi-cropper-wrap">
        <div className="xi-cropper-upload">
          <input type="file" onChange={handleChange} accept="image/gif,image/jpeg,image/jpg,image/png" />
          <div className="xi-cropper-file">
            {
              cropData ? <img src={cropData} /> : '+'
            }
            {
              !!cropData && <span className="xi-cropper-del" onClick={handleDel}>✕</span> 
            }
          </div>
        </div>

        { createPortal(cropModal, document.body) }
    </div>
  );
};

export default CropperPro;
