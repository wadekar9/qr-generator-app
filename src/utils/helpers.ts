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
