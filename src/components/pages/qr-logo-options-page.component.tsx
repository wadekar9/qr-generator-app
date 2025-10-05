import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants'
import { BaseLabelCheckbox, BaseTabSelection, IconButton, ThemeText } from '$components/ui'
import { DarkPixelShape, ITheme } from '$types/common.types'
import { COLORS } from '$constants/colors.constants'
import { Circle, Square, SquareDashedTopSolid, Trash, Upload } from 'lucide-react-native'
import Slider from '@react-native-community/slider';
import { useImagePicker } from '$hooks/common'

interface QRLogoOptionsPageProps {
    theme: ITheme;
    logo?: string;
    logoShape?: DarkPixelShape;
    crop?: boolean;
    size?: number;
    paddingType?: string;
    padding?: number;

    setLogo: (logo: string | null) => void;
    setLogoShape: (logoShape: DarkPixelShape) => void;
    setCrop: (crop: boolean) => void;
    setSize: (size: number) => void;
    setPaddingType: (paddingType: string) => void;
    setPadding: (padding: number) => void;
}

const QRLogoOptionsPage: React.FC<QRLogoOptionsPageProps> = ({
    theme,
    logo = null,
    logoShape = 'square',
    crop = false,
    size = 0,
    paddingType = 'empty',
    padding = 0,
    setLogo,
    setLogoShape,
    setCrop,
    setSize,
    setPaddingType,
    setPadding
}) => {

    const styles = styling(theme);
    const { openGallery } = useImagePicker((e) => setLogo(e.uri));

    return (
        <>
            <View style={styles.section}>
                <View style={styles.imageSectionHeader}>
                    <ThemeText theme={theme}>Logo</ThemeText>
                    <IconButton style={styles.uploadButton} onPress={() => openGallery()}>
                        <Upload width={moderateScale(20)} height={moderateScale(20)} color={COLORS[theme].primary} />
                        <ThemeText theme={theme} style={styles.uploadButtonText}>Upload</ThemeText>
                    </IconButton>
                </View>
                {logo && (
                    <View style={styles.imageSection}>
                        <View style={styles.imageSectionImage}>
                            <View style={styles.imageWrapper}>
                                <Image source={{ uri: logo }} style={{ width: '100%', height: '100%' }} />
                            </View>
                        </View>
                        <View style={{ gap: moderateScale(5) }}>
                            <ThemeText theme={theme} style={styles.selectedImageText}>Image</ThemeText>
                            <IconButton style={styles.uploadButton} onPress={() => setLogo(null)}>
                                <Trash width={moderateScale(20)} height={moderateScale(20)} fill={COLORS[theme].red} color={COLORS[theme].red} />
                                <ThemeText theme={theme} style={[styles.uploadButtonText, { color: COLORS[theme].red }]}>Remove</ThemeText>
                            </IconButton>
                        </View>
                    </View>
                )}
            </View>

            <View style={styles.section}>
                <ThemeText theme={theme}>Shape</ThemeText>
                <View style={styles.options}>
                    <IconButton style={[styles.option, logoShape === 'square' && styles.optionActive]} onPress={() => setLogoShape('square')}>
                        <Square width={moderateScale(22)} height={moderateScale(22)} fill={logoShape === 'square' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                    <IconButton style={[styles.option, logoShape === 'dashed-square' && styles.optionActive]} onPress={() => setLogoShape('dashed-square')}>
                        <SquareDashedTopSolid width={moderateScale(22)} height={moderateScale(22)} color={logoShape === 'dashed-square' ? COLORS[theme].white : COLORS[theme].text} />
                    </IconButton>
                    <IconButton style={[styles.option, logoShape === 'circle' && styles.optionActive]} onPress={() => setLogoShape('circle')}>
                        <Circle width={moderateScale(22)} height={moderateScale(22)} fill={logoShape === 'circle' ? COLORS[theme].white : COLORS[theme].text} strokeWidth={0} />
                    </IconButton>
                </View>
                <ThemeText theme={theme} style={styles.label}>Shape of the QR code logo</ThemeText>
            </View>

            <View style={styles.section}>
                <ThemeText theme={theme}>Crop</ThemeText>
                <View style={[styles.options, { height: moderateScale(40) }]}>
                    <BaseLabelCheckbox value={crop} onValueChange={setCrop} label='Crop' />
                </View>
                <ThemeText theme={theme} style={styles.label}>
                    If image is not square, it will be cropped to square keeping image's aspect ratio.
                </ThemeText>
            </View>

            <View style={styles.section}>
                <ThemeText theme={theme}>Size</ThemeText>
                <Slider
                    style={{ width: '100%', height: moderateScale(40) }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={COLORS[theme].primary}
                    maximumTrackTintColor={COLORS[theme].border}
                    value={size}
                    onValueChange={setSize}
                    thumbTintColor={COLORS[theme].primary}
                />

                <ThemeText theme={theme} style={styles.label}>
                    Size of the QR code logo. If it it too big, QR code might be unreadble!
                </ThemeText>
            </View>

            <View style={styles.section}>
                <ThemeText theme={theme}>Padding Type</ThemeText>
                <BaseTabSelection theme={theme} tabs={['Empty', 'Accurate', 'Natural']} selectedTab={paddingType} onTabSelect={(tab) => setPaddingType?.(tab)} />
                <ThemeText theme={theme} style={styles.label}>
                    {`Type of the logo padding:\nEmpty - no padding;\nAccurate - padding is accurate to QR code size.\nNatural - Padding with logo shape, but without sliced pixels.`}
                </ThemeText>
            </View>

            <View style={styles.section}>
                <ThemeText theme={theme}>Padding</ThemeText>
                <Slider
                    style={{ width: '100%', height: moderateScale(40) }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={COLORS[theme].primary}
                    maximumTrackTintColor={COLORS[theme].border}
                    value={padding}
                    onValueChange={setPadding}
                    thumbTintColor={COLORS[theme].primary}
                />

                <ThemeText theme={theme} style={styles.label}>
                    Padding of the logo relative to pattern size.
                </ThemeText>
            </View>

            <View style={styles.space} />
        </>
    )
}

export default QRLogoOptionsPage

const styling = (theme: ITheme) => StyleSheet.create({
    section: {
        width: '100%',
        gap: moderateScale(6),
        paddingBottom: moderateScale(15),
        borderBottomWidth: moderateScale(1),
        borderBottomColor: COLORS[theme].border,
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
    }
})
