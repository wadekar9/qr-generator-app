import { IMediaFile } from '$types/common.types';
import { generateImageFileSchema } from '$utils/helpers';
import { requestCameraPermissions, requestMediaPermissions } from '$utils/permissions';
import { openCamera as openCameraPicker, openPicker } from 'react-native-image-crop-picker';

export const useImagePicker = (onSelect: (e: IMediaFile) => void, onPermissionFailed?: (mode: 'media' | 'camera') => void) => {

    const openGallery = async () => {
        try {

            const permission = await requestMediaPermissions();

            if (!permission) {
                onPermissionFailed && onPermissionFailed('media');
                return;
            }

            const response = await openPicker({ includeBase64: true, multiple: false, mediaType: 'photo' });

            if (response) {
                onSelect(generateImageFileSchema(response));
            }
        } catch (error) {
            console.log('ERROR', error);
        }
    };

    const openCamera = async () => {
        try {

            const permission = await requestCameraPermissions();

            if (!permission) {
                onPermissionFailed && onPermissionFailed('camera');
                return;
            }

            const response = await openCameraPicker({ mediaType: 'photo', multiple: false, includeBase64: true });

            if (response) {
                onSelect(generateImageFileSchema(response));
            }
        } catch (error) {
            console.log('ERROR', error);
        }
    };

    return { openGallery, openCamera };
};
