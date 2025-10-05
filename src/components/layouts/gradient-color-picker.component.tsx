import { StyleSheet, View } from 'react-native'
import React from 'react'
import { BaseSheetModalRef, IGradientDirection, ITheme } from '$types/common.types';
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { IconButton, ThemeText } from '$components/ui';
import { COLORS } from '$constants/colors.constants';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, PaintBucket, SquareSquare } from 'lucide-react-native';
import { ColorPickerPromptModal } from '$components/modal';

interface GradientColorPickerProps {
    theme: ITheme;
    onChooseColors?: (colors: string[]) => void;
}

const GradientColorPicker: React.FC<GradientColorPickerProps> = ({ theme, onChooseColors }) => {

    const styles = styling(theme);
    const [[color1, color2], setGradientColor] = React.useState<Array<string>>([COLORS[theme].black, COLORS[theme].black]);
    const [gradientDirection, setGradientDirection] = React.useState<IGradientDirection>("down");

    const colorPickerPromptModalRef = React.useRef<BaseSheetModalRef>(null);
    const colorPickerType = React.useRef<'color1' | 'color2'>('color1');

    return (
        <>
            <View style={styles.options}>
                <IconButton style={[styles.option, gradientDirection === "down" && styles.optionActive]} onPress={() => setGradientDirection("down")}>
                    <ArrowDown width={moderateScale(24)} height={moderateScale(24)} color={gradientDirection === "down" ? COLORS[theme].white : COLORS[theme].text} />
                </IconButton>
                <IconButton style={[styles.option, gradientDirection === "right" && styles.optionActive]} onPress={() => setGradientDirection("right")}>
                    <ArrowRight width={moderateScale(24)} height={moderateScale(24)} color={gradientDirection === "right" ? COLORS[theme].white : COLORS[theme].text} />
                </IconButton>
                <IconButton style={[styles.option, gradientDirection === "down-right" && styles.optionActive]} onPress={() => setGradientDirection("down-right")}>
                    <ArrowDownRight width={moderateScale(24)} height={moderateScale(24)} color={gradientDirection === "down-right" ? COLORS[theme].white : COLORS[theme].text} />
                </IconButton>
                <IconButton style={[styles.option, gradientDirection === "up-right" && styles.optionActive]} onPress={() => setGradientDirection("up-right")}>
                    <ArrowUpRight width={moderateScale(24)} height={moderateScale(24)} color={gradientDirection === "up-right" ? COLORS[theme].white : COLORS[theme].text} />
                </IconButton>
                <IconButton style={[styles.option, gradientDirection === "center" && styles.optionActive]} onPress={() => setGradientDirection("center")}>
                    <SquareSquare width={moderateScale(24)} height={moderateScale(24)} color={gradientDirection === "center" ? COLORS[theme].white : COLORS[theme].text} />
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
            <ColorPickerPromptModal ref={colorPickerPromptModalRef} theme={theme} onColorSelect={(color) => {
                if (colorPickerType.current === 'color1') {
                    setGradientColor([color, color2]);
                    onChooseColors?.([color, color2]);
                } else {
                    setGradientColor([color1, color]);
                    onChooseColors?.([color1, color]);
                }
            }} />
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
