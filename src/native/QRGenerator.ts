import { QRCodeData, QRCodeOptions } from '$types/qr.types';
import { showToastMessage } from '$utils/helpers';
import { NativeModules } from 'react-native';

const { CustomQRGenerator } = NativeModules;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

const ensureModuleAvailable = () => {
    const mod = CustomQRGenerator as { generateQRCode?: (d: QRCodeData, o: QRCodeOptions) => Promise<string> } | undefined;
    if (!mod || typeof mod.generateQRCode !== 'function') {
        throw new Error('QR native module "CustomQRGenerator" is unavailable. Ensure it is properly linked/installed and rebuild the app.');
    }
};

const validateData = (data: QRCodeData) => {
    if (!data.type) {
        throw new Error('Missing required field: type. Provide a valid QR code type.');
    }
    switch (data.type) {
        case 'Url':
        case 'Text':
        case 'Phone':
            if (!data[data.type === 'Phone' ? 'phoneNumber' : 'value']) {
                const field = data.type === 'Phone' ? 'phoneNumber' : 'value';
                throw new Error(`Missing required field for ${data.type}: ${field}.`);
            }
            break;
        case 'Email':
            if (!data.email) throw new Error('Missing required field for Email: email.');
            break;
        case 'GeoPos':
            if (data.lat == null || data.lon == null) throw new Error('Missing fields for GeoPos: lat and lon are required.');
            if (!Number.isFinite(data.lat) || !Number.isFinite(data.lon)) throw new Error('Invalid GeoPos: lat and lon must be finite numbers.');
            if (data.lat < -90 || data.lat > 90 || data.lon < -180 || data.lon > 180) throw new Error('Out of range GeoPos: lat must be -90..90 and lon must be -180..180.');
            break;
        case 'Bookmark':
            if (!data.url) throw new Error('Missing required field for Bookmark: url. Include scheme (e.g., https://).');
            break;
        case 'WiFi':
            if (!data.ssid) throw new Error('Missing required field for WiFi: ssid.');
            if ((data.authentication === 'WPA' || data.authentication === 'WEP') && !data.psk) throw new Error('Missing required field for WiFi: psk is required when authentication is WPA/WEP.');
            break;
        case 'EnterpriseWifi':
            if (!data.ssid) throw new Error('Missing required field for EnterpriseWifi: ssid.');
            if (!data.user) throw new Error('Missing required field for EnterpriseWifi: user (username).');
            break;
        case 'SMS':
            if (!data.phoneNumber) throw new Error('Missing required field for SMS: phoneNumber.');
            break;
        case 'BizCard':
            if (!data.firstName) throw new Error('Missing required field for BizCard: firstName.');
            break;
        case 'VCard':
        case 'MeCard':
            if (!data.name) throw new Error(`Missing required field for ${data.type}: name.`);
            break;
        case 'YouTube':
            if (!data.videoId) throw new Error('Missing required field for YouTube: videoId.');
            break;
        case 'Event':
            if (!data.summary) throw new Error('Missing required field for Event: summary.');
            break;
        case 'GooglePlay':
            if (!data.appPackage) throw new Error('Missing required field for GooglePlay: appPackage (Android package name).');
            break;
    }
};

const normalizeOptions = (options: QRCodeOptions): QRCodeOptions => {
    const normalized: QRCodeOptions = { ...options };
    if (normalized.padding != null) {
        // Keep fractional padding; ensure non-negative
        normalized.padding = Math.max(0, normalized.padding);
    }
    if (!normalized.errorCorrectionLevel) normalized.errorCorrectionLevel = 'Medium';
    if (normalized.logo) {
        const l = { ...normalized.logo };
        if (l.size != null) l.size = clamp(l.size, 0, 1);
        if (l.padding != null) {
            // Logo padding is a relative fraction in [0,1]
            l.padding = clamp(l.padding, 0, 1);
        }
        normalized.logo = l;
    }
    if (normalized.background) {
        normalized.background = { ...normalized.background };
    }
    if (normalized.colors) {
        normalized.colors = { ...normalized.colors };
    }
    if (normalized.shapes) {
        normalized.shapes = { ...normalized.shapes };
    }
    return normalized;
};

export const generateQRCode = async (data: QRCodeData, options: QRCodeOptions): Promise<string> => {
    try {
        validateData(data);
        ensureModuleAvailable();
        const base64Image = await CustomQRGenerator.generateQRCode(data, normalizeOptions(options));
        return `data:image/png;base64,${base64Image}`;
    } catch (error) {
        const message = (error instanceof Error) ? error.message : String(error);
        showToastMessage({ message, type: 'danger' });
        throw new Error(`Failed to generate QR code. ${message}`);
    }
};