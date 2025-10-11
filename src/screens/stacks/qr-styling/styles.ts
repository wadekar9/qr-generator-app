import { StyleSheet } from 'react-native';
import { ITheme } from '$types/common.types';
import { DEVICE_WIDTH, EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';

export const styling = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: COLORS[theme].primary
    },
    container: {
        flex: 1,
        flexGrow: 1
    },
    upperBlock: {
        backgroundColor: COLORS[theme].primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
    },
    lowerBlock: {
        backgroundColor: COLORS[theme].background,
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20)
    },
    lowerContent: {
        flex: 1,
        flexGrow: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: moderateScale(20),
        gap: moderateScale(25),
    },
    lowerSectionHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: moderateScale(5),
        borderBottomWidth: moderateScale(1),
        borderBottomColor: COLORS[theme].border
    },
    tabSection: {
        flex: 1,
        paddingVertical: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        gap: moderateScale(3),
    },
    tabSectionText: {
        fontSize: EFontSize.SM,
        fontFamily: EFonts.MEDIUM,
        color: COLORS[theme].text1
    },
    tabSectionTextActive: {
        fontFamily: EFonts.SEMI_BOLD,
        color: COLORS[theme].primary
    },
    tabIndicatorWrapper: {
        width: Math.round(DEVICE_WIDTH / 5),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'absolute',
        paddingHorizontal: moderateScale(5)
    },
    tabIndicator: {
        opacity: 0.2,
        backgroundColor: COLORS[theme].primary,
        borderRadius: moderateScale(10),
        width: '100%',
        height: '100%',
    },
    shareButtonText: {
        fontSize: EFontSize.LG,
        fontFamily: EFonts.SEMI_BOLD,
        textDecorationLine: 'none',
        color: COLORS[theme].primary
    }
});