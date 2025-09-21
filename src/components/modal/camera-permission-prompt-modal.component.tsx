import { StyleSheet, Text, View, Modal, Linking, Platform } from 'react-native'
import React, { forwardRef, memo, useImperativeHandle, useMemo, useState } from 'react'
import { BaseSheetModalRef, ITheme } from '$types/common.types';
import { waitForSeconds } from '$utils/helpers';
import { TextButton } from '$components/ui';
import { EFonts, moderateScale } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';

interface CameraPermissionPromptModalProps {
    theme: ITheme;
}

interface CameraPermissionPromptModalRef extends BaseSheetModalRef { }

const CameraPermissionPromptModal = forwardRef<CameraPermissionPromptModalRef, CameraPermissionPromptModalProps>((props, ref) => {

    const { theme } = props;
    const styles = styling(theme);

    const [visible, setVisible] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        open: () => setVisible(true),
        close: () => setVisible(false)
    }), []);

    function onCancel() {
        setVisible(false);
    }

    async function onAllow() {
        waitForSeconds(0.3);
        Linking.openSettings();
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType={'fade'}
            onRequestClose={() => onCancel()}
        >
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.title}>{'Camera Permission'}</Text>

                    <Text numberOfLines={3} style={styles.message}>{'Allow Prism to access your camera to scan QR codes.'}</Text>

                    <View style={styles.actions}>
                        <TextButton
                            label={'Cancel'}
                            onPress={() => onCancel()}
                        />
                        <TextButton
                            label={'Allow'}
                            onPress={() => onAllow()}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
})

export default memo(CameraPermissionPromptModal);

const styling = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.55)',
        paddingHorizontal: moderateScale(20)
    },
    container: {
        width: '100%',
        height: undefined,
        padding: moderateScale(20),
        backgroundColor: COLORS[theme].surface,
        borderRadius: moderateScale(10),
        gap: moderateScale(10),
    },
    title: {
        fontFamily: EFonts.SEMI_BOLD,
        fontSize: moderateScale(16),
        color: COLORS[theme].text
    },
    message: {
        fontFamily: EFonts.MEDIUM,
        fontSize: moderateScale(14),
        color: COLORS[theme].secondaryBlack
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: moderateScale(20)
    },
    button: {
        fontFamily: EFonts.SEMI_BOLD,
        fontSize: moderateScale(14),
        color: COLORS[theme].primary
    }
})
