import React, { useEffect } from 'react';
import { BackHandler, Image, View } from 'react-native';
import { RootStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/containers';
import { useAppTheme } from '$hooks/common';
import { styling } from './styles';
import { Home, Save, Share2, SquarePen } from 'lucide-react-native';
import { moderateScale } from '$constants/styles.constants';
import { IconButton, ThemeText } from '$components/ui';
import { handleSave, handleShare } from '$utils/qr-helpers';


const QRResult: React.FC<RootStackScreenProps<EStackScreens.QR_RESULT>> = ({ route: { params: { base64 } }, navigation }) => {

    const { theme, colors } = useAppTheme();
    const styles = styling(theme);

    useEffect(() => {
        const sub = BackHandler.addEventListener('hardwareBackPress', () => true);
        return () => {
            sub.remove();
        }
    }, []);

    return (
        <ThemedView>
            <View style={styles.container}>
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: base64 }} style={styles.qrImage} resizeMode="contain" />
                </View>

                <View style={styles.actions}>
                    {[
                        { icon: Save, label: 'Save', action: () => handleSave(base64) },
                        { icon: Share2, label: 'Share', action: () => handleShare(base64) },
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
