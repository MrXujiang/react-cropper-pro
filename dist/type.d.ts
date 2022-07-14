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
     * @description   裁切成功回调
     * @default       -
     */
    onChange?: (file: File) => void;
    /**
     * @description   图片删除的回调
     * @default       -
     */
    onDel?: (url: string) => void;
}
