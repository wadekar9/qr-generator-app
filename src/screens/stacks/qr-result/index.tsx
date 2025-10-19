import React, { useCallback, useEffect, useRef } from 'react';
import { BackHandler, Image, View } from 'react-native';
import { RootStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/containers';
import { useAppTheme } from '$hooks/common';
import { styling } from './styles';
import { Home, Save, Share2, SquarePen } from 'lucide-react-native';
import { moderateScale } from '$constants/styles.constants';
import { IconButton, ThemeText } from '$components/ui';
import RNShare from 'react-native-share';
import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { requestMediaPermissions } from '$utils/permissions';
import { showToastMessage } from '$utils/helpers';

const QRResult: React.FC<RootStackScreenProps<EStackScreens.QR_RESULT>> = ({ route: { params: { base64 } }, navigation }) => {

    const { theme, colors } = useAppTheme();
    const styles = styling(theme);
    const prevFilePath = useRef<string | null>(null);

    useEffect(() => {
        const sub = BackHandler.addEventListener('hardwareBackPress', () => true);
        return () => {
            sub.remove();
            prevFilePath.current && RNFS.unlink(prevFilePath.current)
        }
    }, []);

    const writeBase64ToFile = useCallback(async (prefix = 'qr') => {
        const filePath = `${RNFS.CachesDirectoryPath}/${prefix}_${Date.now()}.png`;
        const base64Image = base64.replace(/^data:image\/png;base64,/, '');
        await RNFS.writeFile(filePath, base64Image, 'base64');
        prevFilePath.current = filePath;
        return filePath;
    }, [base64]);

    const handleSave = useCallback(async () => {
        try {
            const granted = await requestMediaPermissions();
            if (!granted) {
                return showToastMessage({
                    message: 'Permission required',
                    type: 'danger',
                    description: 'Please allow Photos permission to save to your gallery.',
                });
            }

            const filePath = await writeBase64ToFile('qrcode');
            await CameraRoll.saveToCameraRoll(filePath, 'photo');

            showToastMessage({
                message: 'Saved',
                type: 'success',
                description: 'The QR image has been saved to your gallery.',
            });
        } catch (error: any) {
            showToastMessage({
                message: 'Save failed',
                type: 'danger',
                description: error?.message || 'Unable to save image.',
            });
        }
    }, [writeBase64ToFile]);


    const handleShare = useCallback(async () => {
        try {
            const filePath = await writeBase64ToFile('share_qr');
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
    }, [writeBase64ToFile]);

    return (
        <ThemedView>
            <View style={styles.container}>
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: base64 }} style={styles.qrImage} resizeMode="contain" />
                </View>

                <View style={styles.actions}>
                    {[
                        { icon: Save, label: 'Save', action: handleSave },
                        { icon: Share2, label: 'Share', action: handleShare },
                        { icon: SquarePen, label: 'Edit', action: navigation.goBack },
                        { icon: Home, label: 'Home', action: navigation.popToTop },
                    ].map(({ icon: Icon, label, action }) => (
                        <IconButton key={label} style={styles.action} onPress={action}>
                            <Icon color={colors.primary} width={moderateScale(30)} height={moderateScale(30)} />
                            <ThemeText theme={theme} style={styles.actionText}>
                                {label}
                            </ThemeText>
                        </IconButton>
                    ))}
                </View>
            </View>
        </ThemedView>
    );
};

export default QRResult;
