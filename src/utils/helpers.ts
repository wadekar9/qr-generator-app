import { IMediaFile } from '$types/common.types';
import { Image } from 'react-native-image-crop-picker';

export const generateImageFileSchema = (file: Image): IMediaFile => {

    const filename = file.path?.split('/').pop();

    return {
        name: filename || file.filename || 'unknown',
        type: file.mime || 'image/jpeg',
        uri: file.path,
        base64: file.data || ''
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
