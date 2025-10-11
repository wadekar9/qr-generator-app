import { DarkPixelShape, EyeShape } from "./common.types";
import { LogoShapeType, PixelShapeType, QRGradientOrientation } from "./qr.types";

export interface IQRStyles {
    primaryColor: Array<string>;
    backgroundColor: Array<string>;
    primaryColorType: 'solid' | 'gradient';
    backgroundColorType: 'solid' | 'gradient';
    gradientOrientation: QRGradientOrientation;
}

export interface IQRShapeStyles {
    codeShape: 'square' | 'circle';
    darkPixelShape: PixelShapeType;
    lightPixelShape: PixelShapeType;
    eyeFrameShape: PixelShapeType;
    eyeBallShape: PixelShapeType;
}

export interface IQRLogoStyles {
    logo: string | null;
    logoShape: LogoShapeType;
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