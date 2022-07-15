import { ReactNode } from 'react';

export interface IProp {
  /**
   * @description   默认图片
   * @default       -
   */
   defaultImg?: string;
  /**
   * @description   图片数据
   * @default       -
   */
  imgData?: string;
  /**
   * @description   默认的图片质量等级
   * @default       4 (1: 低, 2: 中, 3: 高, 4: 不压缩)
   */
   defaultLevel?: number;
  /**
   * @description   裁切成功回调
   * @default       -
   */
  onChange?: (file:File) => void;
  /**
   * @description   图片删除的回调
   * @default       -
   */
   onDel?: (url: string) => void;
}
