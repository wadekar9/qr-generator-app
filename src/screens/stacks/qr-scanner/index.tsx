import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import {
    Camera,
    CameraProps,
    CameraRuntimeError,
    useCameraDevice,
    useCameraPermission,
    useCodeScanner,
} from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import { RNHoleView } from 'react-native-hole-view';
import Reanimated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import RNQRGenerator from 'rn-qr-generator';
import { Slider } from '@miblanchard/react-native-slider';
import { styling } from './styles';
import { useAppStateListener, useAppTheme, useImagePicker } from '$hooks/common';
import { BaseSheetModalRef } from '$types/common.types';
import { RootStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';
import { QRScreenWithoutPermissionPage } from '$components/pages';
import { DEVICE_HEIGHT, DEVICE_WIDTH, moderateScale } from '$constants/styles.constants';
import { Flashlight, FlashlightOff, Images, ZoomIn, ZoomOut } from 'lucide-react-native';
import { CameraPermissionPromptModal } from '$components/modal';

Reanimated.addWhitelistedNativeProps({ zoom: true });

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera)

const QRScanner: React.FC<RootStackScreenProps<EStackScreens.QR_SCANNER>> = ({ navigation }) => {

    const [isCameraInitialized, setIsCameraInitialized] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [flash, setFlash] = useState<'on' | 'off'>('off');
    const [QRCodeResponse, setQRCodeResponse] = useState<string | undefined>(undefined);
    const [showLoader, setShowLoader] = useState<boolean>(false);

    const isFocused = useIsFocused();

    const { appState } = useAppStateListener();
    const { theme, colors } = useAppTheme();

    const $styles = useMemo(() => styling(theme!), [theme]);
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');
    const camera = useRef<Camera>(null);
    const permissionSheetRef = useRef<BaseSheetModalRef | null>(null);

    const zoom = useSharedValue(device?.neutralZoom || 0);
    const lineOpacity = useSharedValue(1);

    const animatedProps = useAnimatedProps<CameraProps>(
        () => ({ zoom: zoom.value }),
        [zoom]
    )

    const { openGallery } = useImagePicker(async (response) => {
        if (response.base64) {
            try {
                setShowLoader(true);
                const QRResult = await RNQRGenerator.detect({
                    uri: response.uri,
                    base64: response.base64 || ''
                })

                if (QRResult.type === 'QRCode') {
                    console.log("QRResult", QRResult);
                    setShowLoader(false);
                } else {
                    setShowLoader(false);
                    ToastAndroid.show("Invalid QR Code", ToastAndroid.SHORT);
                }
            } catch (error) {
                setShowLoader(false);
                console.error(error);
            }
        }
    }, () => {
        permissionSheetRef.current?.open();
    });

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        if (isCameraInitialized && hasPermission) {
            timeout = setTimeout(() => {
                setIsActive(true);
                setFlash('off');
            }, 0);
        }
        setIsActive(false);

        lineOpacity.value = withRepeat(withTiming(0, { duration: 500 }), -1, true);
        return () => {
            clearTimeout(timeout);
        };
    }, [isCameraInitialized, hasPermission]);

    const onInitialized = () => setIsCameraInitialized(true);

    const onError = (error: CameraRuntimeError) => {
        Alert.alert('Error!', error.message);
    }

    const codeScanner = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: codes => {
            if (codes.length && !QRCodeResponse) {
                console.log("codes", codes); //READ ECONOMICS TIMES PAPER
                setQRCodeResponse(codes[0].value!)
            }
            return;
        },
    });

    const animatedLineStyle = useAnimatedStyle(() => ({ opacity: lineOpacity.value }));

    if (device == null || !hasPermission) {
        return <QRScreenWithoutPermissionPage theme={theme} requestPermission={requestPermission} />
    }

    return (
        <>
            <View style={$styles.safeArea}>
                <ReanimatedCamera
                    torch={flash}
                    onInitialized={onInitialized}
                    ref={camera}
                    onError={onError}
                    photo={false}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    exposure={-2}
                    codeScanner={codeScanner}
                    isActive={
                        isActive &&
                        isFocused &&
                        appState === 'active' &&
                        isCameraInitialized
                    }
                    enableZoomGesture={false}
                    zoom={0}
                    animatedProps={animatedProps}

                />

                <View style={$styles.safeArea}>
                    <RNHoleView
                        holes={[{ x: Math.round(DEVICE_WIDTH * 0.1), y: Math.round(DEVICE_HEIGHT * 0.2), width: Math.round(DEVICE_WIDTH * 0.8), height: Math.round(DEVICE_HEIGHT * 0.4), borderRadius: 10 }]}
                        style={[$styles.rnholeView, $styles.fullScreenCamera]}
                    />
                    <Reanimated.View style={[$styles.line, animatedLineStyle]} />
                </View>

                {
                    showLoader && (
                        <View style={$styles.loaderContainer}>
                            <ActivityIndicator color={colors.white} size={'large'} />
                        </View>
                    )
                }

                <View style={$styles.optionCoverContainer}>
                    <View style={{ flex: 0.6 }} />
                    <View style={{ flex: 0.4, justifyContent: 'center', gap: moderateScale(25), paddingBottom: moderateScale(20) }}>
                        <View style={$styles.buttonListContainer}>
                            <TouchableOpacity
                                style={$styles.buttonContainer}
                                activeOpacity={0.85}
                                onPress={() => setFlash(flash == 'on' ? "off" : 'on')}
                            >
                                {
                                    flash == 'on' ?
                                        <FlashlightOff width={moderateScale(22)} height={moderateScale(22)} color={colors.secondaryBlack} />
                                        :
                                        <Flashlight width={moderateScale(22)} height={moderateScale(22)} color={colors.secondaryBlack} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={$styles.buttonContainer}
                                activeOpacity={0.85}
                                onPress={() => openGallery()}
                            >
                                <Images width={moderateScale(22)} height={moderateScale(22)} color={colors.secondaryBlack} />
                            </TouchableOpacity>
                        </View>

                        <View style={$styles.sliderContainer}>

                            <View style={[$styles.iconContainer, { alignItems: 'flex-end' }]}>
                                <ZoomIn width={moderateScale(30)} height={moderateScale(30)} color={colors.white} />
                            </View>

                            <View style={{ flex: 0.74 }}>
                                <Slider
                                    containerStyle={{ width: '90%', alignSelf: 'center' }}
                                    maximumTrackTintColor={colors.white}
                                    minimumTrackTintColor={colors.primary}
                                    thumbTintColor={colors.primary}
                                    minimumValue={0}
                                    maximumValue={10}
                                    step={1}
                                    animationType={'spring'}
                                    onValueChange={(value) => {
                                        if (value.length) {
                                            zoom.value = value[0] || 0;
                                        }
                                    }}
                                />
                            </View>

                            <View
                                style={[$styles.iconContainer, { alignItems: 'flex-start' }]}
                            >
                                <ZoomOut width={moderateScale(30)} height={moderateScale(30)} color={colors.white} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <CameraPermissionPromptModal
                ref={permissionSheetRef}
                theme={theme}
            />
        </>
    )
}

export default QRScanner;
