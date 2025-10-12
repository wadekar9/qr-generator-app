import { COLORS } from '$constants/colors.constants';
import { EFonts, moderateScale } from '$constants/styles.constants';
import { IMediaFile } from '$types/common.types';
import { ErrorCorrectionLevelType, QRCodePrimaryType, QRType } from '$types/qr.types';
import { showMessage, MessageOptions } from 'react-native-flash-message';
import { Image } from 'react-native-image-crop-picker';

export const showToastMessage = ({
    message,
    type,
    description,
    duration,
    ...rest
}: MessageOptions): void => {

    showMessage({
        ...rest,
        autoHide: true,
        position: 'top',
        duration: duration || 3000,
        type: type ? type : 'danger',
        message: message,
        description: description,
        titleStyle: {
            fontFamily: EFonts.SEMI_BOLD,
            fontSize: moderateScale(14),
            color: COLORS.dark.white
        },
        textStyle: {
            fontFamily: EFonts.MEDIUM,
            fontSize: moderateScale(15),
            color: COLORS.dark.white
        },
        icon: 'auto',
        textProps: {
            numberOfLines: 3
        },
        titleProps: {
            numberOfLines: 2
        }
    });
};

export const generateImageFileSchema = (file: Image): IMediaFile => {

    const filename = file.path?.split('/').pop();

    return {
        name: filename || file.filename || 'unknown',
        type: file.mime || 'image/jpeg',
        uri: file.path,
        base64: file.data || ''
        // base64: `data:${file.mime};base64,${file.data}` || ''
    };
};

export const waitForSeconds = async (seconds: number = 1) => {
    return new Promise((resolve, reject) => setTimeout(() => resolve(true), seconds * 1000));
}

/**
 * Validates whether a given number is in a potentially valid WhatsApp format.
 * This checks for E.164 format (e.g. +14155552671) or plain international digits.
 */
export function isValidWhatsAppNumber(input: string | number): boolean {
    const number = String(input).trim();

    // Optional '+' at the beginning, then 10 to 15 digits
    const validWhatsAppRegex = /^\+?[1-9]\d{9,14}$/;

    return validWhatsAppRegex.test(number);
}

export function getErrorCorrectionLevel(level: string): ErrorCorrectionLevelType {
    switch (level) {
        case 'Auto':
            return 'Quartile';
        case 'L':
            return 'Low';
        case 'M':
            return 'Medium';
        case 'Q':
            return 'Quartile';
        case 'H':
            return 'High';
        default:
            return 'Quartile';
    }
}

export function getQRType(type: QRType): QRCodePrimaryType {
    switch (type) {
        case 'url':
        case 'whatsapp':
            return 'Url';
        case 'text':
            return 'Text';
        case 'email':
            return 'Email';
        case 'phone':
            return 'Phone';
        case 'location':
            return 'GeoPos';
        case 'wifi':
            return 'WiFi';
        case 'sms':
            return 'SMS';
        case 'contact':
            return 'VCard';
        case 'event':
            return 'Event';
        default:
            return 'Text';
    }
}