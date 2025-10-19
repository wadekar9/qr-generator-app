import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ITheme } from '$types/common.types'
import { DEVICE_WIDTH, EFonts, moderateScale } from '$constants/styles.constants';
import { Hash } from 'lucide-react-native';
import { COLORS } from '$constants/colors.constants';
import { ThemeText } from '$components/ui';

interface EmptyHistoryPageProps {
    theme: ITheme;
}

const EmptyHistoryPage: React.FC<EmptyHistoryPageProps> = ({ theme }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.iconWrapper, { backgroundColor: COLORS[theme].text }]}>
                <Hash size={moderateScale(90)} color={COLORS[theme].background} strokeWidth={1.5} />
            </View>
            <ThemeText theme={theme} style={[styles.title, { color: COLORS[theme].text }]}>
                No QR Codes Yet
            </ThemeText>
            <ThemeText theme={theme} style={[styles.message, { color: COLORS[theme].primary }]}>
                Your generated and scanned QR codes will appear here. Start by creating or scanning a QR code!
            </ThemeText>
        </View>
    )
}

export default EmptyHistoryPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(40)
    },
    iconWrapper: {
        width: moderateScale(100),
        height: moderateScale(100),
        borderRadius: moderateScale(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: moderateScale(22),
        fontFamily: EFonts.BOLD,
        marginVertical: moderateScale(12),
        letterSpacing: 0.3,
    },
    message: {
        fontFamily: EFonts.SEMI_BOLD,
        fontSize: moderateScale(15),
        textAlign: 'center',
        lineHeight: moderateScale(22),
        width: DEVICE_WIDTH * 0.85
    },
})