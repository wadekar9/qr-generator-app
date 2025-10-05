import { StyleSheet, View } from 'react-native'
import React from 'react'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants'
import { IconButton, ThemeText } from '$components/ui'
import { DarkPixelShape, EyeShape, ITheme } from '$types/common.types'
import { COLORS } from '$constants/colors.constants'
import { Circle, CircleSmall, Columns3, Diamond, Rows3, Square, SquareDashedTopSolid } from 'lucide-react-native'

interface QRShareOptionsPageProps {
    theme: ITheme;
    codeShape?: 'square' | 'circle';
    darkPixelShape?: DarkPixelShape;
    lightPixelShape?: DarkPixelShape;
    eyeFrameShape?: EyeShape;
    eyeBallShape?: EyeShape;
    onChooseColor?: (color: Array<string>, type: 'primary' | 'background', background: 'solid' | 'gradient') => void;
    setCodeShape?: (e: 'square' | 'circle') => void;
    setDarkPixelShape?: (e: DarkPixelShape) => void;
    setLightPixelShape?: (e: DarkPixelShape) => void;
    setEyeFrameShape?: (e: EyeShape) => void;
    setEyeBallShape?: (e: EyeShape) => void;
}

const QRShareOptionsPage: React.FC<QRShareOptionsPageProps> = ({
    theme,
    codeShape,
    darkPixelShape,
    lightPixelShape,
    eyeFrameShape,
    eyeBallShape,
    setCodeShape,
    setDarkPixelShape,
    setLightPixelShape,
    setEyeFrameShape,
    setEyeBallShape,
}) => {

    const styles = styling(theme);

    return (
        <>
            <View style={styles.section}>
                <ThemeText theme={theme}>Code</ThemeText>
                <View style={styles.options}>
                    <IconButton style={[styles.option, codeShape === 'square' && styles.optionActive]} onPress={() => setCodeShape?.('square')}>
                        <Square width={moderateScale(22)} height={moderateScale(22)} fill={codeShape === 'square' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                    <IconButton style={[styles.option, codeShape === 'circle' && styles.optionActive]} onPress={() => setCodeShape?.('circle')}>
                        <Circle width={moderateScale(22)} height={moderateScale(22)} fill={codeShape === 'circle' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                </View>
                <ThemeText theme={theme} style={styles.label}>Shape of the QR code pattern</ThemeText>
            </View>

            <View style={styles.section}>
                <ThemeText theme={theme}>Dark Pixels</ThemeText>
                <View style={styles.options}>
                    <IconButton style={[styles.option, darkPixelShape === 'square' && styles.optionActive]} onPress={() => setDarkPixelShape?.('square')}>
                        <Square width={moderateScale(22)} height={moderateScale(22)} fill={darkPixelShape === 'square' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                    <IconButton style={[styles.option, darkPixelShape === 'dashed-square' && styles.optionActive]} onPress={() => setDarkPixelShape?.('dashed-square')}>
                        <SquareDashedTopSolid width={moderateScale(22)} height={moderateScale(22)} color={darkPixelShape === 'dashed-square' ? COLORS[theme].white : COLORS[theme].text} />
                    </IconButton>
                    <IconButton style={[styles.option, darkPixelShape === 'circle' && styles.optionActive]} onPress={() => setDarkPixelShape?.('circle')}>
                        <Circle width={moderateScale(22)} height={moderateScale(22)} fill={darkPixelShape === 'circle' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                    <IconButton style={[styles.option, darkPixelShape === 'circle-small' && styles.optionActive]} onPress={() => setDarkPixelShape?.('circle-small')}>
                        <CircleSmall width={moderateScale(22)} height={moderateScale(22)} fill={darkPixelShape === 'circle-small' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                    <IconButton style={[styles.option, darkPixelShape === 'diamond' && styles.optionActive]} onPress={() => setDarkPixelShape?.('diamond')}>
                        <Diamond width={moderateScale(22)} height={moderateScale(22)} fill={darkPixelShape === 'diamond' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                    <IconButton style={[styles.option, darkPixelShape === 'columns' && styles.optionActive]} onPress={() => setDarkPixelShape?.('columns')}>
                        <Columns3 width={moderateScale(22)} height={moderateScale(22)} color={darkPixelShape === 'columns' ? COLORS[theme].white : COLORS[theme].text} />
                    </IconButton>
                    <IconButton style={[styles.option, darkPixelShape === 'rows' && styles.optionActive]} onPress={() => setDarkPixelShape?.('rows')}>
                        <Rows3 width={moderateScale(22)} height={moderateScale(22)} color={darkPixelShape === 'rows' ? COLORS[theme].white : COLORS[theme].text} />
                    </IconButton>
                </View>
                <ThemeText theme={theme} style={styles.label}>Shape of the dark QR code dots.</ThemeText>
            </View>

            <View style={styles.section}>
                <ThemeText theme={theme}>Light Pixels</ThemeText>
                <View style={styles.options}>
                    <IconButton style={[styles.option, lightPixelShape === 'square' && styles.optionActive]} onPress={() => setLightPixelShape?.('square')}>
                        <Square width={moderateScale(22)} height={moderateScale(22)} fill={lightPixelShape === 'square' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                    <IconButton style={[styles.option, lightPixelShape === 'dashed-square' && styles.optionActive]} onPress={() => setLightPixelShape?.('dashed-square')}>
                        <SquareDashedTopSolid width={moderateScale(22)} height={moderateScale(22)} color={lightPixelShape === 'dashed-square' ? COLORS[theme].white : COLORS[theme].text} />
                    </IconButton>
                    <IconButton style={[styles.option, lightPixelShape === 'circle' && styles.optionActive]} onPress={() => setLightPixelShape?.('circle')}>
                        <Circle width={moderateScale(22)} height={moderateScale(22)} fill={lightPixelShape === 'circle' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                    <IconButton style={[styles.option, lightPixelShape === 'circle-small' && styles.optionActive]} onPress={() => setLightPixelShape?.('circle-small')}>
                        <CircleSmall width={moderateScale(22)} height={moderateScale(22)} fill={lightPixelShape === 'circle-small' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                    <IconButton style={[styles.option, lightPixelShape === 'diamond' && styles.optionActive]} onPress={() => setLightPixelShape?.('diamond')}>
                        <Diamond width={moderateScale(22)} height={moderateScale(22)} fill={lightPixelShape === 'diamond' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                    <IconButton style={[styles.option, lightPixelShape === 'columns' && styles.optionActive]} onPress={() => setLightPixelShape?.('columns')}>
                        <Columns3 width={moderateScale(22)} height={moderateScale(22)} color={lightPixelShape === 'columns' ? COLORS[theme].white : COLORS[theme].text} />
                    </IconButton>
                    <IconButton style={[styles.option, lightPixelShape === 'rows' && styles.optionActive]} onPress={() => setLightPixelShape?.('rows')}>
                        <Rows3 width={moderateScale(22)} height={moderateScale(22)} color={lightPixelShape === 'rows' ? COLORS[theme].white : COLORS[theme].text} />
                    </IconButton>
                </View>
                <ThemeText theme={theme} style={styles.label}>Shape of the dark QR code dots.</ThemeText>
            </View>

            <View style={styles.section}>
                <ThemeText theme={theme}>Eye Frame</ThemeText>
                <View style={styles.options}>
                    <IconButton style={[styles.option, eyeFrameShape === 'square' && styles.optionActive]} onPress={() => setEyeFrameShape?.('square')}>
                        <Square width={moderateScale(22)} height={moderateScale(22)} color={eyeFrameShape === 'square' ? COLORS[theme].white : COLORS[theme].text} />
                    </IconButton>
                    <IconButton style={[styles.option, eyeFrameShape === 'dashed-square' && styles.optionActive]} onPress={() => setEyeFrameShape?.('dashed-square')}>
                        <SquareDashedTopSolid width={moderateScale(22)} height={moderateScale(22)} color={eyeFrameShape === 'dashed-square' ? COLORS[theme].white : COLORS[theme].text} />
                    </IconButton>
                    <IconButton style={[styles.option, eyeFrameShape === 'circle' && styles.optionActive]} onPress={() => setEyeFrameShape?.('circle')}>
                        <Circle width={moderateScale(22)} height={moderateScale(22)} color={eyeFrameShape === 'circle' ? COLORS[theme].white : COLORS[theme].text} />
                    </IconButton>
                    <IconButton style={[styles.option, eyeFrameShape === 'circle-outline' && styles.optionActive]} onPress={() => setEyeFrameShape?.('circle-outline')}>
                        <Circle width={moderateScale(22)} height={moderateScale(22)} fill={eyeFrameShape === 'circle-outline' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                    <IconButton style={[styles.option, eyeFrameShape === 'circle-small' && styles.optionActive]} onPress={() => setEyeFrameShape?.('circle-small')}>
                        <CircleSmall width={moderateScale(22)} height={moderateScale(22)} fill={eyeFrameShape === 'circle-small' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                    <IconButton style={[styles.option, eyeFrameShape === 'diamond' && styles.optionActive]} onPress={() => setEyeFrameShape?.('diamond')}>
                        <Diamond width={moderateScale(22)} height={moderateScale(22)} fill={eyeFrameShape === 'diamond' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                </View>
                <ThemeText theme={theme} style={styles.label}>Shape of the QR code pattern</ThemeText>
            </View>

            <View style={styles.section}>
                <ThemeText theme={theme}>Eye Ball</ThemeText>
                <View style={styles.options}>
                    <IconButton style={[styles.option, eyeBallShape === 'square' && styles.optionActive]} onPress={() => setEyeBallShape?.('square')}>
                        <Square width={moderateScale(22)} height={moderateScale(22)} fill={eyeBallShape === 'square' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                    <IconButton style={[styles.option, eyeBallShape === 'dashed-square' && styles.optionActive]} onPress={() => setEyeBallShape?.('dashed-square')}>
                        <SquareDashedTopSolid width={moderateScale(22)} height={moderateScale(22)} color={eyeBallShape === 'dashed-square' ? COLORS[theme].white : COLORS[theme].text} />
                    </IconButton>
                    <IconButton style={[styles.option, eyeBallShape === 'circle' && styles.optionActive]} onPress={() => setEyeBallShape?.('circle')}>
                        <Circle width={moderateScale(22)} height={moderateScale(22)} color={eyeBallShape === 'circle' ? COLORS[theme].white : COLORS[theme].text} />
                    </IconButton>
                    <IconButton style={[styles.option, eyeBallShape === 'circle-outline' && styles.optionActive]} onPress={() => setEyeBallShape?.('circle-outline')}>
                        <Circle width={moderateScale(22)} height={moderateScale(22)} fill={eyeBallShape === 'circle-outline' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                    <IconButton style={[styles.option, eyeBallShape === 'circle-small' && styles.optionActive]} onPress={() => setEyeBallShape?.('circle-small')}>
                        <CircleSmall width={moderateScale(22)} height={moderateScale(22)} fill={eyeBallShape === 'circle-small' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                    <IconButton style={[styles.option, eyeBallShape === 'diamond' && styles.optionActive]} onPress={() => setEyeBallShape?.('diamond')}>
                        <Diamond width={moderateScale(22)} height={moderateScale(22)} fill={eyeBallShape === 'diamond' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                </View>
                <ThemeText theme={theme} style={styles.label}>Shape of the QR code pattern</ThemeText>
            </View>
            <View style={styles.space} />
        </>
    )
}

export default QRShareOptionsPage

const styling = (theme: ITheme) => StyleSheet.create({
    section: {
        width: '100%',
        gap: moderateScale(5)
    },
    options: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(10)
    },
    option: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(100),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionText: {
        fontSize: EFontSize.LG,
        fontFamily: EFonts.SEMI_BOLD,
        color: COLORS[theme].text4
    },
    optionActive: {
        backgroundColor: COLORS[theme].primary,
    },
    space: {
        height: moderateScale(130)
    },
    label: {
        fontFamily: EFonts.MEDIUM,
        fontSize: EFontSize.SM,
        color: COLORS[theme].text4
    }
})
