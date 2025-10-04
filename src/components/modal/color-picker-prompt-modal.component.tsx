import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'
import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react'
import { BaseSheetModalRef, ITheme } from '$types/common.types'
import { DEVICE_HEIGHT, moderateScale } from '$constants/styles.constants';
import WheelColorPicker from 'react-native-wheel-color-picker'
import { COLORS } from '$constants/colors.constants';
import { BaseButton, ThemeText } from '$components/ui';

interface ColorPickerPromptModalProps {
    theme: ITheme;
    onColorSelect?: (color: string) => void;
}

interface ColorPickerPromptModalRef extends BaseSheetModalRef { };

const ColorPickerPromptModal = forwardRef<ColorPickerPromptModalRef, ColorPickerPromptModalProps>(({
    theme,
    onColorSelect
}: ColorPickerPromptModalProps, ref) => {

    const [visible, setVisible] = React.useState<boolean>(false);
    const [color, setColor] = React.useState<string>(COLORS[theme].white);
    const pickerRef = useRef<WheelColorPicker>(null);

    useImperativeHandle(ref, () => ({
        open: () => setVisible(true),
        close: () => setVisible(false)
    }), []);

    const onColorChangeComplete = useCallback((color: string) => {
        setColor(color);
    }, [])

    const onSubmit = useCallback(() => {
        onColorSelect?.(color);
        setVisible(false);
    }, [color, onColorSelect])

    return (
        <>
            <Modal
                visible={visible}
                onDismiss={() => setVisible(false)}
                onRequestClose={() => setVisible(false)}
                transparent
                animationType={'slide'}
            >
                <View style={styles.wrapper}>
                    <View style={styles.container}>
                        <WheelColorPicker
                            ref={pickerRef}
                            color={color}
                            swatchesOnly={false}
                            onColorChange={onColorChangeComplete}
                            onColorChangeComplete={onColorChangeComplete}
                            thumbSize={40}
                            sliderSize={40}
                            noSnap={true}
                            row={false}
                            swatchesLast={false}
                            swatches={false}
                            wheelLoadingIndicator={<ActivityIndicator size={40} />}
                            sliderLoadingIndicator={<ActivityIndicator size={20} />}
                            useNativeDriver={false}
                            useNativeLayout={false}
                        />

                        <View style={[styles.colorPicker, { backgroundColor: color, borderColor: COLORS[theme].border }]}>
                            <ThemeText theme={theme} style={{ color: COLORS[theme].white }}>{color}</ThemeText>
                        </View>

                        <BaseButton theme={theme} label='Submit' onPress={onSubmit} />
                    </View>
                </View>
            </Modal>
        </>
    )
})

export default memo(ColorPickerPromptModal);

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20
    },
    container: {
        width: '100%',
        height: DEVICE_HEIGHT * 0.55,
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        padding: moderateScale(20),
        gap: moderateScale(20),
    },
    colorPicker: {
        width: moderateScale(100),
        height: moderateScale(35),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(5),
        borderWidth: moderateScale(1),
    }
})