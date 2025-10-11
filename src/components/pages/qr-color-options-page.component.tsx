import { StyleSheet, View } from 'react-native'
import React from 'react'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants'
import { IconButton, ThemeText } from '$components/ui'
import { ITheme } from '$types/common.types'
import { ColorPicker, GradientColorPicker } from '$components/layouts'
import { COLORS } from '$constants/colors.constants'
import { PRIMARY_COLORS, BACKGROUND_COLORS } from '$constants/app.constants'
import { QRGradientOrientation } from '$types/qr.types'

interface QRColorOptionsPageProps {
    theme: ITheme;
    orientation?: QRGradientOrientation;
    onChangeOrientation?: (orientation: QRGradientOrientation) => void;
    onChooseColor?: (color: Array<string>, type: 'primary' | 'background', background: 'solid' | 'gradient') => void;
}

const QRColorOptionsPage: React.FC<QRColorOptionsPageProps> = ({ theme, orientation, onChangeOrientation, onChooseColor }) => {

    const styles = styling(theme);
    const [primaryColorOption, setPrimaryColorOption] = React.useState<number>(0);
    const [backgroundColorOption, setBackgroundColorOption] = React.useState<number>(0);

    return (
        <>
            <View style={styles.section}>
                <ThemeText theme={theme}>Primary Color</ThemeText>
                <View style={styles.options}>
                    <IconButton style={[styles.option, primaryColorOption === 0 && styles.optionActive]} onPress={() => setPrimaryColorOption(0)}>
                        <ThemeText theme={theme} style={[styles.optionText, primaryColorOption === 0 && styles.optionActiveText]}>Solid</ThemeText>
                    </IconButton>
                    <IconButton style={[styles.option, primaryColorOption === 1 && styles.optionActive]} onPress={() => setPrimaryColorOption(1)}>
                        <ThemeText theme={theme} style={[styles.optionText, primaryColorOption === 1 && styles.optionActiveText]}>Gradient</ThemeText>
                    </IconButton>
                </View>
                {primaryColorOption === 0 && <ColorPicker customColors={PRIMARY_COLORS} theme={theme} onChooseColor={(color) => onChooseColor?.([color], 'primary', 'solid')} />}
                {primaryColorOption === 1 && (
                    <GradientColorPicker
                        theme={theme}
                        onChooseColors={(colors, gradientOrientation) => {
                            onChooseColor?.(colors, 'primary', 'gradient');
                            onChangeOrientation?.(gradientOrientation);
                        }}
                        prevOrientation={orientation}
                        onChangeOrientation={onChangeOrientation}
                    />
                )}
            </View>
            <View style={styles.section}>
                <ThemeText theme={theme}>Background Color</ThemeText>
                {/* <View style={styles.options}>
                    <IconButton style={[styles.option, backgroundColorOption === 0 && styles.optionActive]} onPress={() => setBackgroundColorOption(0)}>
                        <ThemeText theme={theme} style={[styles.optionText, backgroundColorOption === 0 && styles.optionActiveText]}>Solid</ThemeText>
                    </IconButton>
                    <IconButton style={[styles.option, backgroundColorOption === 1 && styles.optionActive]} onPress={() => setBackgroundColorOption(1)}>
                        <ThemeText theme={theme} style={[styles.optionText, backgroundColorOption === 1 && styles.optionActiveText]}>Gradient</ThemeText>
                    </IconButton>
                </View> */}
                {backgroundColorOption === 0 && <ColorPicker customColors={BACKGROUND_COLORS} theme={theme} onChooseColor={(color) => onChooseColor?.([color], 'background', 'solid')} />}
                {/* {backgroundColorOption === 1 && <GradientColorPicker theme={theme} onChooseColors={(colors) => onChooseColor?.(colors, 'background', 'gradient')} />} */}
            </View>
            <View style={styles.space} />
        </>
    )
}

export default React.memo(QRColorOptionsPage);

const styling = (theme: ITheme) => StyleSheet.create({
    section: {
        width: '100%',
        gap: moderateScale(10)
    },
    options: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(10)
    },
    option: {
        paddingVertical: moderateScale(8),
        paddingHorizontal: moderateScale(20),
        borderRadius: moderateScale(100),
        borderWidth: 1,
        borderColor: COLORS[theme].border,
        overflow: 'hidden'
    },
    optionText: {
        fontSize: EFontSize.LG,
        fontFamily: EFonts.SEMI_BOLD,
        color: COLORS[theme].text4
    },
    optionActive: {
        backgroundColor: COLORS[theme].primary,
        borderColor: COLORS[theme].primary,
    },
    optionActiveText: {
        color: COLORS[theme].white
    },
    space: {
        height: moderateScale(150)
    }
})