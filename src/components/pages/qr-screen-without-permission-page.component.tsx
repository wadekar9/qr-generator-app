import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ITheme } from '$types/common.types';
import { Camera } from 'lucide-react-native';
import { COLORS } from '$constants/colors.constants';
import { EFonts, moderateScale } from '$constants/styles.constants';
import { TextButton } from '$components/ui';
import { stackNavigationRef } from '$types/navigation.types';

interface QRScreenWithoutPermissionPageProps {
    theme: ITheme;
    requestPermission: () => void;
}

const QRScreenWithoutPermissionPage: React.FC<QRScreenWithoutPermissionPageProps> = (props) => {

    const styles = styling(props.theme);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Camera size={moderateScale(64)} color={COLORS[props.theme].text4} />
                <Text numberOfLines={2} style={[styles.message, { color: COLORS[props.theme].text }]}>
                    Camera permission is required to scan QR codes
                </Text>
                <TouchableOpacity
                    style={[styles.permissionButton, { backgroundColor: COLORS[props.theme].primary }]}
                    onPress={props.requestPermission}
                >
                    <Text numberOfLines={1} style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
                <TextButton label='Go Back' labelStyle={styles.subMessage} onPress={() => stackNavigationRef.current?.goBack()} />
            </View>
        </SafeAreaView>
    )
}

export default QRScreenWithoutPermissionPage

const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: moderateScale(15),
        padding: moderateScale(18),
        backgroundColor: COLORS[theme].surface
    },
    message: {
        fontFamily: EFonts.MEDIUM,
        fontSize: moderateScale(18),
        textAlign: 'center',
        marginVertical: moderateScale(20),
        lineHeight: moderateScale(24),
    },
    subMessage: {
        textAlign: 'center',
        marginTop: moderateScale(8),
        color: COLORS[theme].text,
        fontSize: moderateScale(16),
        fontFamily: EFonts.MEDIUM
    },
    permissionButton: {
        paddingHorizontal: moderateScale(24),
        paddingVertical: moderateScale(12),
        borderRadius: moderateScale(8),
        marginTop: moderateScale(20),
    },
    permissionButtonText: {
        color: COLORS[theme].white,
        fontSize: moderateScale(16),
        fontFamily: EFonts.SEMI_BOLD
    },
})