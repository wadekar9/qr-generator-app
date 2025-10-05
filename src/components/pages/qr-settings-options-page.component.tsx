import { StyleSheet, View } from 'react-native'
import React from 'react'
import { DEVICE_WIDTH, EFonts, EFontSize, moderateScale } from '$constants/styles.constants'
import { BaseLabelCheckbox, BaseTabSelection, BaseTextInput, ThemeText } from '$components/ui'
import { ITheme } from '$types/common.types'
import { COLORS } from '$constants/colors.constants'

interface QRSettingsOptionsPageProps {
    theme: ITheme;
    errorDetectionLevel?: string; //'auto' | 'L' | 'M' | 'Q' | 'H';
    format?: string; //'PNG' | 'JPEG' | 'WEBP';
    size?: string;
    enable4thEye?: boolean;

    setErrorDetectionLevel: (errorDetectionLevel: string) => void;
    setFormat: (format: string) => void;
    setSize: (size: string) => void;
    setEnable4thEye: (enable4thEye: boolean) => void;
}

const QRSettingsOptionsPage: React.FC<QRSettingsOptionsPageProps> = ({
    theme,
    errorDetectionLevel = 'L',
    setErrorDetectionLevel,
    format = 'PNG',
    setFormat,
    size = '1024',
    setSize,
    enable4thEye = false,
    setEnable4thEye
}) => {

    const styles = styling(theme);

    return (
        <>
            <View style={styles.section}>
                <ThemeText theme={theme}>4-th eye</ThemeText>
                <View style={[styles.options, { height: moderateScale(40) }]}>
                    <BaseLabelCheckbox value={enable4thEye} onValueChange={setEnable4thEye} label='Enable' />
                </View>
                <ThemeText theme={theme} style={styles.label}>
                    {`Add 4-th eye to the bottom right corner of the QR code.`}
                </ThemeText>
            </View>

            <View style={styles.section}>
                <ThemeText theme={theme}>Size</ThemeText>
                <View style={styles.input}>
                    <BaseTextInput value={size} onChangeText={(text) => setSize?.(text)} />
                </View>
                <ThemeText theme={theme} style={styles.label}>
                    {`Size of the output QR Code image.`}
                </ThemeText>
            </View>

            <View style={styles.section}>
                <ThemeText theme={theme}>Format</ThemeText>
                <BaseTabSelection theme={theme} tabs={['PNG', 'JPEG', 'WEBP']} selectedTab={format} onTabSelect={(tab) => setFormat?.(tab)} />
                <ThemeText theme={theme} style={styles.label}>
                    {`Format of output QR Code image.`}
                </ThemeText>
            </View>

            <View style={styles.section}>
                <ThemeText theme={theme}>Error Detection Level</ThemeText>
                <BaseTabSelection theme={theme} tabs={['Auto', 'L', 'M', 'Q', 'H']} selectedTab={errorDetectionLevel} onTabSelect={(tab) => setErrorDetectionLevel?.(tab)} />
                <ThemeText theme={theme} style={styles.label}>
                    {`Defines the part of the code that can be corrupted or used for the logo.\nPrefer Auto error correction level if you have a logo.`}
                </ThemeText>
            </View>

            <View style={styles.space} />
        </>
    )
}

export default QRSettingsOptionsPage

const styling = (theme: ITheme) => StyleSheet.create({
    section: {
        width: '100%',
        gap: moderateScale(6),
        paddingBottom: moderateScale(15),
        borderBottomWidth: moderateScale(1),
        borderBottomColor: COLORS[theme].border,
    },
    space: {
        height: moderateScale(130)
    },
    label: {
        fontFamily: EFonts.MEDIUM,
        fontSize: EFontSize.SM,
        color: COLORS[theme].text4
    },
    imageSection: {
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS[theme].border,
        borderRadius: moderateScale(5),
        padding: moderateScale(15),
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(10),
        marginTop: moderateScale(10),
    },
    imageSectionImage: {
        width: moderateScale(70),
        height: moderateScale(70),
        borderRadius: moderateScale(5),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS[theme].gray4
    },
    imageSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    uploadButton: {
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        gap: moderateScale(5)
    },
    uploadButtonText: {
        fontFamily: EFonts.MEDIUM,
        fontSize: EFontSize.BASE,
        color: COLORS[theme].primary
    },
    imageWrapper: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(50),
        overflow: 'hidden'
    },
    selectedImageText: {
        fontFamily: EFonts.SEMI_BOLD,
        fontSize: EFontSize.XL,
        color: COLORS[theme].gray
    },
    sliders: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(25)
    },
    input: {
        width: DEVICE_WIDTH * 0.28
    },
    options: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(10)
    },
});
