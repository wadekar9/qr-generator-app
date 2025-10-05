import { DarkPixelShape, EyeShape } from "./common.types";

export interface IQRStyles {
    primaryColor: Array<string>;
    backgroundColor: Array<string>;
    primaryColorType: 'solid' | 'gradient';
    backgroundColorType: 'solid' | 'gradient';
}

export interface IQRShapeStyles {
    codeShape: 'square' | 'circle';
    darkPixelShape: DarkPixelShape;
    lightPixelShape: DarkPixelShape;
    eyeFrameShape: EyeShape;
    eyeBallShape: EyeShape;
}

export interface IQRLogoStyles {
    logo: string | null;
    logoShape: DarkPixelShape;
    crop: boolean;
    size: number;
    paddingType: string;
    padding: number;
}

export interface IQRBackgroundStyles {
    background: string | null;
    padding: number;
    xoffset: number;
    yoffset: number;
}

export interface IQRSettingsStyles {
    errorDetectionLevel?: string; //'auto' | 'L' | 'M' | 'Q' | 'H';
    format?: string; //'PNG' | 'JPEG' | 'WEBP';
    size?: string;
    enable4thEye?: boolean;
}