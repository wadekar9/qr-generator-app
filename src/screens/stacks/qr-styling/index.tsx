import { View, Text } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { RootStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/containers';
import { useAppTheme } from '$hooks/common';
import { styling } from './styles';
import { BackHeader } from '$components/navigation';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
    Extrapolation,
    withTiming,
} from 'react-native-reanimated';;
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '$constants/styles.constants';
import { QR_STYLING_OPTIONS } from '$constants/app.constants';
import { IconButton, TextButton } from '$components/ui';
import { QRBackgroundOptionsPage, QRColorOptionsPage, QRLogoOptionsPage, QRSettingsOptionsPage, QRShareOptionsPage } from '$components/pages';
import { IQRBackgroundStyles, IQRLogoStyles, IQRSettingsStyles, IQRShapeStyles, IQRStyles } from '$types/qr-styles.types';
import { QRCodeLayout } from '$components/layouts';
import { getErrorCorrectionLevel, getQRType } from '$utils/helpers';
import { useHistory } from '$hooks/module';

// Constants for height constraints
const UPPER_MIN_HEIGHT = DEVICE_HEIGHT * 0.25;  // 30% minimum
const UPPER_MAX_HEIGHT = DEVICE_HEIGHT * 0.35;  // 50% maximum
const LOWER_MIN_HEIGHT = DEVICE_HEIGHT * 0.65;  // 50% minimum
const LOWER_MAX_HEIGHT = DEVICE_HEIGHT * 0.75;  // 70% maximum

// Maximum scroll distance for full animation (adjust for sensitivity)
const MAX_SCROLL_DISTANCE = 150;

const QRStyling: React.FC<RootStackScreenProps<EStackScreens.QR_STYLING>> = ({ navigation, route: { params } }) => {

    const { addQRCode } = useHistory();
    const { theme, colors } = useAppTheme();
    const styles = styling(theme);
    const scrollY = useSharedValue(0);
    const tabIndicatorX = useSharedValue(0);
    const generatedQR = useRef<string | undefined>(undefined);

    const [activeTab, setActiveTab] = React.useState<number>(0);

    const [QRColorStyles, setQRColorStyles] = React.useState<IQRStyles>({
        primaryColor: ['#000000'],
        backgroundColor: ['#ffffff'],
        primaryColorType: 'solid',
        backgroundColorType: 'solid',
        gradientOrientation: 'Vertical',
    });

    const [QRShapeStyles, setQRShapeStyles] = React.useState<IQRShapeStyles>({
        codeShape: 'square',
        darkPixelShape: 'Default',
        lightPixelShape: 'Default',
        eyeFrameShape: 'Default',
        eyeBallShape: 'Default',
    });

    const [QRLogoStyles, setQRLogoStyles] = React.useState<IQRLogoStyles>({
        logo: null,
        logoShape: 'Circle',
        crop: false,
        size: 0.4,
        paddingType: 'empty',
        padding: 0.1,
    });

    const [QRBackgroundStyles, setQRBackgroundStyles] = React.useState<IQRBackgroundStyles>({
        background: null,
        padding: 0.1,
        xoffset: 0,
        yoffset: 0,
    });

    const [QRSettingsStyles, setQRSettingsStyles] = React.useState<IQRSettingsStyles>({
        errorCorrectionLevel: 'Auto',
        format: 'PNG',
        size: '1024',
        enable4thEye: false,
    });

    // Real-time scroll handler - no springs, direct value mapping
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    // Real-time animated styles for upper block
    const tabIndicatorStyle = useAnimatedStyle(() => {
        return { transform: [{ translateX: tabIndicatorX.value }] };
    });

    // Real-time animated styles for upper block
    const upperBlockStyle = useAnimatedStyle(() => {
        // Clamp scroll value between 0 and MAX_SCROLL_DISTANCE
        const clampedScroll = Math.max(0, Math.min(scrollY.value, MAX_SCROLL_DISTANCE));

        // Direct interpolation for real-time response
        const height = interpolate(
            clampedScroll,
            [0, MAX_SCROLL_DISTANCE],
            [UPPER_MAX_HEIGHT, UPPER_MIN_HEIGHT],
            Extrapolation.CLAMP
        );

        return {
            height,
        };
    });

    // Real-time animated styles for lower block
    const lowerBlockStyle = useAnimatedStyle(() => {
        // Clamp scroll value between 0 and MAX_SCROLL_DISTANCE
        const clampedScroll = Math.max(0, Math.min(scrollY.value, MAX_SCROLL_DISTANCE));

        // Direct interpolation for real-time response
        const height = interpolate(
            clampedScroll,
            [0, MAX_SCROLL_DISTANCE],
            [LOWER_MIN_HEIGHT, LOWER_MAX_HEIGHT],
            Extrapolation.CLAMP
        );

        return {
            height,
        };
    });

    const onChooseTab = useCallback((idx: number) => {
        setActiveTab(idx);
        tabIndicatorX.value = withTiming(idx * Math.round(DEVICE_WIDTH / 5));
    }, [tabIndicatorX]);

    const QRStylingOption = useCallback(({ idx }: { idx: number }) => {

        const Icon = QR_STYLING_OPTIONS[idx].icon;

        return (
            <IconButton onPress={() => onChooseTab(idx)} style={styles.tabSection}>
                <Icon size={22} color={activeTab === idx ? colors.primary : colors.text1} />
                <Text numberOfLines={1} style={[styles.tabSectionText, activeTab === idx && styles.tabSectionTextActive]}>{QR_STYLING_OPTIONS[idx].label}</Text>
            </IconButton>
        )
    }, [QR_STYLING_OPTIONS, colors, activeTab, onChooseTab])

    const handleComplete = useCallback(() => {
        try {
            if (generatedQR.current) {
                const data = JSON.parse(params?.data);
                addQRCode({
                    type: params?.type || 'text',
                    content: data?.content || 'QR Code',
                    data: params?.data || 'Hello!',
                    base64: generatedQR.current,
                    timestamp: Date.now()
                })
                navigation.navigate(EStackScreens.QR_RESULT, { base64: generatedQR.current })
            }
        } catch (error: any) {
            console.error("ERROR", error);
        }
    }, [addQRCode]);

    return (
        <ThemedView>
            <BackHeader
                theme={theme}
                label='QR Design'
                RightAccessory={
                    <TextButton
                        label='Save'
                        labelStyle={styles.shareButtonText}
                        onPress={() => handleComplete()}
                    />
                }
            />
            <View style={styles.wrapper}>

                {/* Upper Block */}
                <Animated.View style={[styles.upperBlock, upperBlockStyle]}>
                    <QRCodeLayout
                        scrollY={scrollY}
                        qrCodeType={getQRType(params?.type || 'text')}
                        qrCodeData={params?.data ? JSON.parse(params?.data) : { value: 'Hello!' }}
                        qrCodeStyleOptions={{
                            padding: QRBackgroundStyles.padding,
                            errorCorrectionLevel: getErrorCorrectionLevel(QRSettingsStyles.errorCorrectionLevel || 'Auto'),
                            logo: {
                                base64: QRLogoStyles.logo || '',
                                size: QRLogoStyles.size,
                                padding: QRLogoStyles.padding,
                                shape: QRLogoStyles.logoShape,
                            },
                            background: {
                                base64: QRBackgroundStyles.background || '',
                                color: QRColorStyles.backgroundColor[0]
                            },
                            qrColors: {
                                type: QRColorStyles.primaryColorType === 'solid' ? 'Solid' : 'LinearGradient',
                                color: QRColorStyles.primaryColor[0],
                                colors: QRColorStyles.primaryColor.map((color, index) => ({ position: index / (QRColorStyles.primaryColor.length - 1), color })),
                                orientation: QRColorStyles.gradientOrientation
                            },
                            shapes: {
                                darkPixel: QRShapeStyles.darkPixelShape,
                                ball: QRShapeStyles.eyeBallShape,
                                frame: QRShapeStyles.eyeFrameShape,
                            },
                        }}
                        onGenerateQR={(qrCode) => generatedQR.current = qrCode}
                    />
                </Animated.View>

                {/* Lower Block with ScrollView */}
                <Animated.View style={[styles.lowerBlock, lowerBlockStyle]}>

                    <View style={styles.lowerContent}>
                        <View style={styles.lowerSectionHeader}>
                            {QR_STYLING_OPTIONS.map((_, idx) => <QRStylingOption key={idx} idx={idx} />)}
                            <Animated.View style={[styles.tabIndicatorWrapper, tabIndicatorStyle]}>
                                <View style={styles.tabIndicator} />
                            </Animated.View>
                        </View>

                        <View style={styles.container}>
                            <Animated.ScrollView
                                style={styles.scrollView}
                                contentContainerStyle={styles.scrollContent}
                                onScroll={scrollHandler}
                                scrollEventThrottle={1} // Maximum responsiveness
                                bounces={true}
                                showsVerticalScrollIndicator={true}
                            >
                                {activeTab === 0 && (
                                    <QRColorOptionsPage
                                        theme={theme}
                                        orientation={QRColorStyles.gradientOrientation}
                                        onChangeOrientation={(orientation) => setQRColorStyles((prev) => ({ ...prev, gradientOrientation: orientation }))}
                                        onChooseColor={(color, type, background) => {
                                            if (type === 'primary') {
                                                setQRColorStyles((prev) => ({ ...prev, primaryColor: color, primaryColorType: background }));
                                            } else {
                                                setQRColorStyles((prev) => ({ ...prev, backgroundColor: color, backgroundColorType: background }));
                                            }
                                        }}
                                    />
                                )}
                                {activeTab === 1 && (
                                    <QRShareOptionsPage
                                        theme={theme}
                                        codeShape={QRShapeStyles.codeShape}
                                        darkPixelShape={QRShapeStyles.darkPixelShape}
                                        lightPixelShape={QRShapeStyles.lightPixelShape}
                                        eyeFrameShape={QRShapeStyles.eyeFrameShape}
                                        eyeBallShape={QRShapeStyles.eyeBallShape}
                                        setCodeShape={(e) => setQRShapeStyles((prev) => ({ ...prev, codeShape: e }))}
                                        setDarkPixelShape={(e) => setQRShapeStyles((prev) => ({ ...prev, darkPixelShape: e }))}
                                        setLightPixelShape={(e) => setQRShapeStyles((prev) => ({ ...prev, lightPixelShape: e }))}
                                        setEyeFrameShape={(e) => setQRShapeStyles((prev) => ({ ...prev, eyeFrameShape: e }))}
                                        setEyeBallShape={(e) => setQRShapeStyles((prev) => ({ ...prev, eyeBallShape: e }))}
                                    />
                                )}
                                {activeTab === 2 && (
                                    <QRLogoOptionsPage
                                        theme={theme}
                                        logo={QRLogoStyles.logo || ''}
                                        logoShape={QRLogoStyles.logoShape}
                                        crop={QRLogoStyles.crop}
                                        size={QRLogoStyles.size}
                                        paddingType={QRLogoStyles.paddingType}
                                        padding={QRLogoStyles.padding}
                                        setLogo={(logo) => setQRLogoStyles((prev) => ({ ...prev, logo: logo || '' }))}
                                        setLogoShape={(logoShape) => setQRLogoStyles((prev) => ({ ...prev, logoShape }))}
                                        setCrop={(crop) => setQRLogoStyles((prev) => ({ ...prev, crop }))}
                                        setSize={(size) => setQRLogoStyles((prev) => ({ ...prev, size }))}
                                        setPaddingType={(paddingType) => setQRLogoStyles((prev) => ({ ...prev, paddingType }))}
                                        setPadding={(padding) => setQRLogoStyles((prev) => ({ ...prev, padding }))}
                                    />
                                )}
                                {activeTab === 3 && (
                                    <QRBackgroundOptionsPage
                                        theme={theme}
                                        background={QRBackgroundStyles.background || ''}
                                        padding={QRBackgroundStyles.padding}
                                        xoffset={QRBackgroundStyles.xoffset}
                                        yoffset={QRBackgroundStyles.yoffset}
                                        setBackground={(background) => setQRBackgroundStyles((prev) => ({ ...prev, background }))}
                                        setXoffset={(xoffset) => setQRBackgroundStyles((prev) => ({ ...prev, xoffset }))}
                                        setYoffset={(yoffset) => setQRBackgroundStyles((prev) => ({ ...prev, yoffset }))}
                                        setPadding={(padding) => setQRBackgroundStyles((prev) => ({ ...prev, padding }))}
                                    />
                                )}
                                {activeTab === 4 && (
                                    <QRSettingsOptionsPage
                                        theme={theme}
                                        errorCorrectionLevel={QRSettingsStyles.errorCorrectionLevel}
                                        format={QRSettingsStyles.format}
                                        size={QRSettingsStyles.size}
                                        enable4thEye={QRSettingsStyles.enable4thEye}
                                        setErrorCorrectionLevel={(errorCorrectionLevel) => setQRSettingsStyles((prev) => ({ ...prev, errorCorrectionLevel }))}
                                        setFormat={(format) => setQRSettingsStyles((prev) => ({ ...prev, format }))}
                                        setSize={(size) => setQRSettingsStyles((prev) => ({ ...prev, size }))}
                                        setEnable4thEye={(enable4thEye) => setQRSettingsStyles((prev) => ({ ...prev, enable4thEye }))}
                                    />
                                )}
                            </Animated.ScrollView>
                        </View>
                    </View>
                </Animated.View>

            </View>
        </ThemedView>
    );
};

export default QRStyling;