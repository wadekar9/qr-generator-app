import { COLORS } from "$constants/colors.constants";
import { DEVICE_WIDTH, EFonts, EFontSize, moderateScale } from "$constants/styles.constants";
import { ITheme } from "$types/common.types";
import { StyleSheet } from "react-native";

export const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS[theme].background,
        alignItems: 'center',
        justifyContent: 'center',
        gap: moderateScale(50)
    },
    qrImage: {
        width: DEVICE_WIDTH * 0.5,
        height: DEVICE_WIDTH * 0.5,
        aspectRatio: 1
    },
    imageWrapper: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: moderateScale(4)
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(15)
    },
    action: {
        width: moderateScale(60),
        height: moderateScale(60),
        alignItems: 'center',
        justifyContent: 'center',
        gap: moderateScale(10)
    },
    actionText: {
        fontSize: EFontSize.XL,
        fontFamily: EFonts.SEMI_BOLD,
        color: COLORS[theme].primary
    }
});
