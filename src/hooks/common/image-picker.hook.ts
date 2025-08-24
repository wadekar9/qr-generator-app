import { requestCameraPermissions, requestMediaPermissions } from '$utils/permissions';
import { openCamera, openPicker, ImageOrVideo } from 'react-native-image-crop-picker';

export const useImagePicker = (onSelect: (e: ImageOrVideo) => void, onPermissionFailed?: (mode: 'media' | 'camera') => void) => {

    const handleOpenGallery = async () => {
        try {

            const isPermissionAvailable = await requestMediaPermissions();

            if (!isPermissionAvailable) {
                onPermissionFailed && onPermissionFailed('media');
                return;
            }

            const response = await openPicker({ includeBase64: true, multiple: false, mediaType: 'photo' });

            if (response) {
                onSelect(response);
            }
        } catch (error) {
            console.log('ERROR', error);
        }
    };

    const handleOpenCamera = async () => {
        try {

            const isPermissionAvailable = await requestCameraPermissions();

            if (!isPermissionAvailable) {
                onPermissionFailed && onPermissionFailed('camera');
                return;
            }

            const response = await openCamera({ mediaType: 'photo', multiple: false, includeBase64: true });

            if (response) {
                onSelect(response);
            }
        } catch (error) {
            console.log('ERROR', error);
        }
    };

    return { handleOpenGallery, handleOpenCamera };
};
