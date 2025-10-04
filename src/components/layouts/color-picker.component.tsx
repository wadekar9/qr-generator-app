import { StyleSheet, View } from 'react-native'
import React from 'react'
import { BaseSheetModalRef, ITheme } from '$types/common.types'
import { moderateScale } from '$constants/styles.constants';
import { IconButton } from '$components/ui';
import { COLORS } from '$constants/colors.constants';
import { Plus } from 'lucide-react-native';
import { ColorPickerPromptModal } from '$components/modal';

interface ColorPickerProps {
    theme: ITheme;
    customColors: string[];
    onChooseColor?: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ theme, customColors, onChooseColor }) => {

    const colorPickerPromptModalRef = React.useRef<BaseSheetModalRef>(null);

    return (
        <View style={styles.container}>
            {customColors.map((color, index) => (
                <IconButton key={index} style={[styles.color, { backgroundColor: color, borderColor: COLORS[theme].border }]} onPress={() => onChooseColor?.(color)} />
            ))}
            <IconButton style={[styles.color, { borderColor: COLORS[theme].primary }]} onPress={() => colorPickerPromptModalRef.current?.open()}>
                <Plus width={moderateScale(24)} height={moderateScale(24)} color={COLORS[theme].primary} />
            </IconButton>

            <ColorPickerPromptModal ref={colorPickerPromptModalRef} theme={theme} onColorSelect={onChooseColor} />
        </View>
    )
}

export default ColorPicker

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: moderateScale(10)
    },
    color: {
        width: moderateScale(38),
        height: moderateScale(38),
        borderRadius: moderateScale(100),
        borderWidth: moderateScale(1),
        alignItems: 'center',
        justifyContent: 'center'
    }
})