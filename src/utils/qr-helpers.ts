import RNShare from 'react-native-share';
import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { requestMediaPermissions } from '$utils/permissions';
import { showToastMessage } from '$utils/helpers';

const writeBase64ToFile = async (prefix = 'qr', base64: string) => {
    const filePath = `${RNFS.CachesDirectoryPath}/${prefix}_${Date.now()}.png`;
    const base64Image = base64.replace(/^data:image\/png;base64,/, '');
    await RNFS.writeFile(filePath, base64Image, 'base64');
    return filePath;
}

export const handleSave = async (base64: string) => {
    try {
        const granted = await requestMediaPermissions();
        if (!granted) {
            return showToastMessage({
                message: 'Permission required',
                type: 'danger',
                description: 'Please allow Photos permission to save to your gallery.',
            });
        }

        const filePath = await writeBase64ToFile('qrcode', base64);
        await CameraRoll.saveToCameraRoll(filePath, 'photo');

        showToastMessage({
            message: 'Saved',
            type: 'success',
            description: 'The QR code has been saved to your gallery.',
        });
    } catch (error: any) {
        showToastMessage({
            message: 'Save failed',
            type: 'danger',
            description: error?.message || 'Unable to save qr code.',
        });
    }
}


export const handleShare = async (base64: string) => {
    try {
        const filePath = await writeBase64ToFile('share_qr', base64);
        await RNShare.open({
            url: `file://${filePath}`,
            type: 'image/png',
        });
    } catch (error: any) {
        if (error?.message !== 'User did not share') {
            showToastMessage({
                message: 'Share failed',
                type: 'danger',
                description: error?.message || 'Unable to share image.',
            });
        }
    }
}