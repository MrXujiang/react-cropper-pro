### 基本使用

```tsx
import React from 'react';
import { message, Button } from 'antd';
import Cropper from './';

export default () => {
  return (
    <Cropper defaultImg="http://h5.dooring.cn/uploads/image_176b751adef.png" onChange={(file) => console.log(file)} />
  );
};
```

<API></API>
