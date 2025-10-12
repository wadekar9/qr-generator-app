import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { generateQRCode } from '$native/QRGenerator';
import { useState } from 'react'
import { moderateScale } from '$constants/styles.constants';
import { ColorConfig, ErrorCorrectionLevelType, LogoShapeType, PixelShapeType, QRCodeData, QRCodePrimaryType } from '$types/qr.types';
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface QRCodeLayoutProps {
    onGenerateQR?: (qrCode: string) => void;
    scrollY: SharedValue<number>;
    qrCodeData: Omit<QRCodeData, 'type'>;
    qrCodeType: QRCodePrimaryType;
    qrCodeStyleOptions: {
        padding?: number;
        errorCorrectionLevel?: ErrorCorrectionLevelType;
        logo?: {
            base64?: string;
            size?: number;
            padding?: number;
            shape?: LogoShapeType;
        };
        background?: {
            base64?: string;
            color?: string;
        };
        qrColors?: ColorConfig;
        shapes?: {
            darkPixel?: PixelShapeType;
            ball?: PixelShapeType;
            frame?: PixelShapeType;
        };
    }
};

const QRCodeLayout: React.FC<QRCodeLayoutProps> = (props) => {

    const [qrCode, setQrCode] = useState<string | null>(null);

    const pruneEmpty = (value: any): any => {
        if (value === undefined || value === null) return undefined;
        if (typeof value === 'string' && value.trim() === '') return undefined;
        if (Array.isArray(value)) {
            const arr = value.map(pruneEmpty).filter((v) => v !== undefined);
            return arr.length ? arr : undefined;
        }
        if (typeof value === 'object') {
            const out: any = {};
            Object.entries(value).forEach(([k, v]) => {
                const pr = pruneEmpty(v);
                if (pr !== undefined) out[k] = pr;
            });
            return Object.keys(out).length ? out : undefined;
        }
        return value;
    };


    const handleGenerateQR = async () => {
        try {

            const { qrCodeData, qrCodeType, qrCodeStyleOptions } = props;

            const dataPayload = pruneEmpty({ type: qrCodeType, ...qrCodeData, }) as any;

            const hasLogo = typeof qrCodeStyleOptions.logo?.base64 === 'string' && qrCodeStyleOptions.logo.base64.trim().length > 0;

            const styleRaw = {
                padding: qrCodeStyleOptions.padding,
                errorCorrectionLevel: qrCodeStyleOptions.errorCorrectionLevel as ErrorCorrectionLevelType | undefined,
                logo: hasLogo ? qrCodeStyleOptions.logo : undefined,
                background: qrCodeStyleOptions.background,
                colors: qrCodeStyleOptions.qrColors ? ({ dark: qrCodeStyleOptions.qrColors as ColorConfig }) : undefined,
                shapes: qrCodeStyleOptions.shapes
                    ? {
                        darkPixel: qrCodeStyleOptions.shapes.darkPixel ? { type: qrCodeStyleOptions.shapes.darkPixel } : undefined,
                        ball: qrCodeStyleOptions.shapes.ball ? { type: qrCodeStyleOptions.shapes.ball } : undefined,
                        frame: qrCodeStyleOptions.shapes.frame ? { type: qrCodeStyleOptions.shapes.frame } : undefined,
                    }
                    : undefined,
            };

            const styleOptions = (pruneEmpty(styleRaw) as any) || {};

            // console.log("styleOptions", JSON.stringify(styleOptions, null, 2))

            const qrImage = await generateQRCode(dataPayload, styleOptions);
            setQrCode(qrImage);
            props.onGenerateQR?.(qrImage);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleGenerateQR();
    }, [props.qrCodeData, props.qrCodeType, props.qrCodeStyleOptions]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.imageWrapper, useAnimatedStyle(() => {
                const s = interpolate(
                    props.scrollY.value,
                    [0, 150],
                    [1, 0.7],
                    Extrapolation.CLAMP
                );
                return { transform: [{ scale: s }] };
            })]}>
                {qrCode && <Image source={{ uri: qrCode }} style={styles.qrImage} />}
            </Animated.View>
        </View>
    )
}

export default QRCodeLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrImage: {
        width: moderateScale(200),
        height: moderateScale(200)
    },
    imageWrapper: {
        backgroundColor: 'white',
        width: moderateScale(220),
        height: moderateScale(220),
        justifyContent: 'center',
        alignItems: 'center',
    }
})
