export type QRCodePrimaryType = 'Url' | 'Text' | 'Email' | 'Phone' | 'GeoPos' | 'Bookmark' | 'WiFi' | 'EnterpriseWifi' | 'SMS' | 'BizCard' | 'VCard' | 'MeCard' | 'YouTube' | 'Event' | 'GooglePlay';
export type QRGradientOrientation = 'Horizontal' | 'Vertical' | 'LeftDiagonal' | 'RightDiagonal';
export type PixelShapeType = 'RoundCorners' | 'Circle' | 'Default';
export type LogoShapeType = 'Circle' | 'Square' | 'Default';
export type ErrorDetectionLevelType = 'Low' | 'Medium' | 'Quartile' | 'High';

export interface ColorConfig {
    type: 'Solid' | 'LinearGradient' | 'RadialGradient' | 'SweepGradient';
    color?: string;
    colors?: { position: number; color: string }[];
    orientation?: QRGradientOrientation;
    radius?: number;
}

export interface ShapeConfig {
    type: PixelShapeType;
    corner?: number;
}

export interface QRCodeOptions {
    padding?: number;
    errorCorrectionLevel?: 'Low' | 'Medium' | 'Quartile' | 'High';
    logo?: {
        base64?: string;
        size?: number;
        padding?: number;
        shape?: LogoShapeType;
    };
    background?: {
        base64?: string;
        color?: string;
    };
    colors?: {
        dark?: ColorConfig;
        ball?: ColorConfig;
        frame?: ColorConfig;
    };
    shapes?: {
        darkPixel?: ShapeConfig;
        ball?: ShapeConfig;
        frame?: ShapeConfig;
    };
}

export interface QRCodeData {
    type: QRCodePrimaryType;
    value?: string;
    email?: string;
    copyTo?: string | null;
    subject?: string | null;
    body?: string | null;
    lat?: number;
    lon?: number;
    url?: string;
    title?: string;
    ssid?: string;
    psk?: string | null;
    hidden?: boolean;
    authentication?: 'WPA' | 'WEP' | 'NONE';
    user?: string | null;
    eap?: string | null;
    phase?: string | null;
    phoneNumber?: string;
    isMMS?: boolean;
    firstName?: string;
    secondName?: string | null;
    job?: string | null;
    company?: string | null;
    address?: string | null;
    phone?: string | null;
    name?: string;
    website?: string | null;
    note?: string | null;
    videoId?: string;
    uid?: string | null;
    stamp?: string | null;
    organizer?: string | null;
    start?: string | null;
    end?: string | null;
    summary?: string;
    appPackage?: string;
}

export type QRType =
    | 'text'
    | 'url'
    | 'email'
    | 'wifi'
    | 'phone'
    | 'sms'
    | 'contact'
    | 'location'
    | 'event'
    | 'whatsapp';

export interface QRData {
    // Text
    text?: string;

    // URL
    url?: string;

    // Email
    email?: string;
    subject?: string;
    body?: string;

    // Wi-Fi
    ssid?: string;
    password?: string;
    encryption?: 'WPA' | 'WEP' | 'nopass';

    // Phone & SMS
    phone?: string;
    message?: string;

    // Contact
    firstName?: string;
    lastName?: string;

    // Location
    latitude?: string;
    longitude?: string;

    // Event
    title?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
}

export interface QRHistoryItem {
    id?: string;
    type: QRType;
    content: string;
    data: QRData;
    timestamp: number;
}