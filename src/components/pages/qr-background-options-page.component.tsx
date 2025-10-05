import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants'
import { IconButton, ThemeText } from '$components/ui'
import { ITheme } from '$types/common.types'
import { COLORS } from '$constants/colors.constants'
import { Trash, Upload } from 'lucide-react-native'
import Slider from '@react-native-community/slider';
import { useImagePicker } from '$hooks/common'

interface QRBackgroundOptionsPageProps {
    theme: ITheme;
    background?: string;
    padding?: number;

    xoffset?: number;
    yoffset?: number;

    setBackground: (background: string | null) => void;
    setXoffset: (xoffset: number) => void;
    setYoffset: (yoffset: number) => void;
    setPadding: (padding: number) => void;
}

const QRBackgroundOptionsPage: React.FC<QRBackgroundOptionsPageProps> = ({
    theme,
    background = null,
    padding = 0,
    xoffset = 0,
    yoffset = 0,
    setBackground,
    setXoffset,
    setYoffset,
    setPadding
}) => {

    const styles = styling(theme);
    const { openGallery } = useImagePicker((e) => setBackground(e.uri));

    return (
        <>
            <View style={styles.section}>
                <View style={styles.imageSectionHeader}>
                    <ThemeText theme={theme}>Background</ThemeText>
                    <IconButton style={styles.uploadButton} onPress={() => openGallery()}>
                        <Upload width={moderateScale(20)} height={moderateScale(20)} color={COLORS[theme].primary} />
                        <ThemeText theme={theme} style={styles.uploadButtonText}>Upload</ThemeText>
                    </IconButton>
                </View>
                {background && (
                    <View style={styles.imageSection}>
                        <View style={styles.imageSectionImage}>
                            <View style={styles.imageWrapper}>
                                <Image source={{ uri: background }} style={{ width: '100%', height: '100%' }} />
                            </View>
                        </View>
                        <View style={{ gap: moderateScale(5) }}>
                            <ThemeText theme={theme} style={styles.selectedImageText}>Image</ThemeText>
                            <IconButton style={styles.uploadButton} onPress={() => setBackground(null)}>
                                <Trash width={moderateScale(20)} height={moderateScale(20)} fill={COLORS[theme].red} color={COLORS[theme].red} />
                                <ThemeText theme={theme} style={[styles.uploadButtonText, { color: COLORS[theme].red }]}>Remove</ThemeText>
                            </IconButton>
                        </View>
                    </View>
                )}
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
                    Padding of the QR Code.
                </ThemeText>
            </View>

            <View style={styles.section}>
                <ThemeText theme={theme}>Offset</ThemeText>

                <View style={styles.sliders}>
                    <View style={{ flex: 1 }}>
                        <Slider
                            style={{ width: '100%', height: moderateScale(40) }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor={COLORS[theme].primary}
                            maximumTrackTintColor={COLORS[theme].border}
                            value={xoffset}
                            onValueChange={setXoffset}
                            thumbTintColor={COLORS[theme].primary}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Slider
                            style={{ width: '100%', height: moderateScale(40) }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor={COLORS[theme].primary}
                            maximumTrackTintColor={COLORS[theme].border}
                            value={yoffset}
                            onValueChange={setYoffset}
                            thumbTintColor={COLORS[theme].primary}
                        />
                    </View>
                </View>

                <ThemeText theme={theme} style={styles.label}>
                    Horizontal and vertical offset of the QR code pattern.
                </ThemeText>
            </View>

            <View style={styles.space} />
        </>
    )
}

export default QRBackgroundOptionsPage

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
    }
});
