import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import { BaseSheetModalRef, ITheme } from '$types/common.types';
import { TextButton } from '$components/ui';
import { EFonts, moderateScale } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';

interface CleanupQRHistoryPromptModalProps {
    theme: ITheme;
    onClear: () => void;
}

interface CleanupQRHistoryPromptModalRef extends BaseSheetModalRef { }

const CleanupQRHistoryPromptModal = forwardRef<CleanupQRHistoryPromptModalRef, CleanupQRHistoryPromptModalProps>((props, ref) => {

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

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType={'fade'}
            onRequestClose={() => onCancel()}
            statusBarTranslucent={true}
        >
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.title}>{'Clear History'}</Text>

                    <Text numberOfLines={3} style={styles.message}>{'Are you sure you want to clear your history?'}</Text>

                    <View style={styles.actions}>
                        <TextButton
                            label={'Cancel'}
                            onPress={() => onCancel()}
                            labelStyle={styles.button}
                        />
                        <TextButton
                            label={'Clear'}
                            onPress={() => props.onClear()}
                            labelStyle={styles.button}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
})

export default memo(CleanupQRHistoryPromptModal);

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
        color: COLORS[theme].text1
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
        color: COLORS[theme].primary,
        textDecorationLine: 'none'
    }
});
