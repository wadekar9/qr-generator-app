import { StyleSheet, View } from 'react-native'
import React from 'react'
import { BaseSheetModalRef, ITheme } from '$types/common.types';
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { IconButton, ThemeText } from '$components/ui';
import { COLORS } from '$constants/colors.constants';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, PaintBucket } from 'lucide-react-native';
import { ColorPickerPromptModal } from '$components/modal';
import { QRGradientOrientation } from '$types/qr.types';

interface GradientColorPickerProps {
    theme: ITheme;
    prevOrientation?: QRGradientOrientation;
    onChangeOrientation?: (orientation: QRGradientOrientation) => void;
    onChooseColors?: (colors: string[], orientation: QRGradientOrientation) => void;
}

const GradientColorPicker: React.FC<GradientColorPickerProps> = ({ theme, prevOrientation, onChangeOrientation, onChooseColors }) => {

    const styles = styling(theme);
    const [[color1, color2], setGradientColor] = React.useState<Array<string>>([COLORS[theme].black, COLORS[theme].black]);
    const [orientation, setOrientation] = React.useState<QRGradientOrientation>(prevOrientation || 'Vertical');

    const colorPickerPromptModalRef = React.useRef<BaseSheetModalRef>(null);
    const colorPickerType = React.useRef<'color1' | 'color2'>('color1');

    const handleChangeOrientation = React.useCallback((orientation: QRGradientOrientation) => {
        setOrientation(orientation);
        onChangeOrientation?.(orientation);
    }, [onChangeOrientation]);

    const handleChangeColor = React.useCallback((color: string) => {
        if (colorPickerType.current === 'color1') {
            setGradientColor([color, color2]);
            onChooseColors?.([color, color2], orientation);
        } else {
            setGradientColor([color1, color]);
            onChooseColors?.([color1, color], orientation);
        }
    }, [color1, color2, orientation, onChooseColors]);

    return (
        <>
            <View style={styles.options}>
                <IconButton style={[styles.option, orientation === "Vertical" && styles.optionActive]} onPress={() => handleChangeOrientation("Vertical")}>
                    <ArrowDown width={moderateScale(24)} height={moderateScale(24)} color={orientation === "Vertical" ? COLORS[theme].white : COLORS[theme].text} />
                </IconButton>
                <IconButton style={[styles.option, orientation === "Horizontal" && styles.optionActive]} onPress={() => handleChangeOrientation("Horizontal")}>
                    <ArrowRight width={moderateScale(24)} height={moderateScale(24)} color={orientation === "Horizontal" ? COLORS[theme].white : COLORS[theme].text} />
                </IconButton>
                <IconButton style={[styles.option, orientation === "LeftDiagonal" && styles.optionActive]} onPress={() => handleChangeOrientation("LeftDiagonal")}>
                    <ArrowDownRight width={moderateScale(24)} height={moderateScale(24)} color={orientation === "LeftDiagonal" ? COLORS[theme].white : COLORS[theme].text} />
                </IconButton>
                <IconButton style={[styles.option, orientation === "RightDiagonal" && styles.optionActive]} onPress={() => handleChangeOrientation("RightDiagonal")}>
                    <ArrowUpRight width={moderateScale(24)} height={moderateScale(24)} color={orientation === "RightDiagonal" ? COLORS[theme].white : COLORS[theme].text} />
                </IconButton>
            </View>
            <View style={styles.options}>
                <ThemeText theme={theme} style={styles.text}>Gradient Colors</ThemeText>
                <IconButton
                    style={[styles.option, { backgroundColor: color1, borderColor: color1 }]}
                    onPress={() => { colorPickerType.current = 'color1'; colorPickerPromptModalRef.current?.open() }}
                >
                    <PaintBucket width={moderateScale(24)} height={moderateScale(24)} color={COLORS[theme].white} />
                </IconButton>
                <IconButton
                    style={[styles.option, { backgroundColor: color2, borderColor: color2 }]}
                    onPress={() => { colorPickerType.current = 'color2'; colorPickerPromptModalRef.current?.open() }}
                >
                    <PaintBucket width={moderateScale(24)} height={moderateScale(24)} color={COLORS[theme].white} />
                </IconButton>
            </View>
            <ColorPickerPromptModal ref={colorPickerPromptModalRef} theme={theme} onColorSelect={handleChangeColor} />
        </>
    )
}

export default GradientColorPicker

const styling = (theme: ITheme) => StyleSheet.create({
    options: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12)
    },
    option: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(100),
        borderWidth: moderateScale(2),
        borderColor: COLORS[theme].border,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionActive: {
        backgroundColor: COLORS[theme].primary,
        borderColor: COLORS[theme].primary
    },
    text: {
        fontFamily: EFonts.MEDIUM,
        fontSize: EFontSize.BASE,
        color: COLORS[theme].text1
    }
})
