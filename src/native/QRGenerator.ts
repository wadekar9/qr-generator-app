import { NativeModules } from 'react-native';

const { CustomQRGenerator } = NativeModules;

interface ColorConfig {
    type: 'Solid' | 'LinearGradient' | 'RadialGradient' | 'SweepGradient';
    color?: string;
    colors?: { position: number; color: string }[];
    orientation?: 'Horizontal' | 'Vertical' | 'LeftDiagonal' | 'RightDiagonal';
    radius?: number;
}

interface ShapeConfig {
    type: 'RoundCorners' | 'Circle' | 'Default';
    corner?: number;
}

interface QRCodeOptions {
    padding?: number;
    errorCorrectionLevel?: 'Low' | 'Medium' | 'Quartile' | 'High';
    logo?: {
        base64?: string;
        size?: number;
        padding?: number;
        shape?: 'Circle' | 'Square' | 'Default';
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

interface QRData {
    type: 'Url' | 'Text' | 'Email' | 'Phone' | 'GeoPos' | 'Bookmark' | 'WiFi' | 'EnterpriseWifi' | 'SMS' | 'BizCard' | 'VCard' | 'MeCard' | 'YouTube' | 'Event' | 'GooglePlay';
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

export const generateQRCode = async (data: QRData, options: QRCodeOptions): Promise<string> => {
    try {
        // Validate data
        if (!data.type) {
            throw new Error('Data type is required');
        }
        switch (data.type) {
            case 'Url':
            case 'Text':
            case 'Phone':
                if (!data[data.type === 'Phone' ? 'phoneNumber' : 'value']) {
                    throw new Error(`${data.type === 'Phone' ? 'Phone number' : 'Value'} is required`);
                }
                break;
            case 'Email':
                if (!data.email) throw new Error('Email is required');
                break;
            case 'GeoPos':
                if (data.lat == null || data.lon == null) throw new Error('Latitude and longitude are required');
                break;
            case 'Bookmark':
                if (!data.url) throw new Error('URL is required');
                break;
            case 'WiFi':
            case 'EnterpriseWifi':
                if (!data.ssid) throw new Error('SSID is required');
                break;
            case 'SMS':
                if (!data.phoneNumber) throw new Error('Phone number is required');
                break;
            case 'BizCard':
                if (!data.firstName) throw new Error('First name is required');
                break;
            case 'VCard':
            case 'MeCard':
                if (!data.name) throw new Error('Name is required');
                break;
            case 'YouTube':
                if (!data.videoId) throw new Error('Video ID is required');
                break;
            case 'Event':
                if (!data.summary) throw new Error('Summary is required');
                break;
            case 'GooglePlay':
                if (!data.appPackage) throw new Error('App package is required');
                break;
        }

        const base64Image = await CustomQRGenerator.generateQRCode(data, options);
        return `data:image/png;base64,${base64Image}`;
    } catch (error) {
        throw new Error(`Failed to generate QR code: ${(error as Error).message}`);
    }
};