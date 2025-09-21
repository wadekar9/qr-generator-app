import { COLORS } from "$constants/colors.constants";
import { DEVICE_WIDTH, EFontSize, moderateScale } from "$constants/styles.constants";
import { ITheme } from "$types/common.types";
import { StyleSheet } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

export const styling = (theme: ITheme, insets: EdgeInsets) => StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        padding: moderateScale(20),
        paddingBottom: insets.bottom + moderateScale(150),
        gap: moderateScale(20),
    },
    titleText: {
        fontSize: moderateScale(24),
        textAlign: 'left',
        color: COLORS[theme].text
    },
    section: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: moderateScale(10)
    },
    qrContainer: {
        width: Math.floor((DEVICE_WIDTH - 60) / 3),
        height: Math.floor((DEVICE_WIDTH - 60) / 3),
        backgroundColor: COLORS[theme].surface,
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        gap: moderateScale(10),
        borderWidth: moderateScale(1),
        borderColor: COLORS[theme].border
    },
    qrLabel: {
        textAlign: 'center',
        color: COLORS[theme].text1,
        fontSize: EFontSize.BASE
    },
});
