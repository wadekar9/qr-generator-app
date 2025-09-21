import { COLORS } from "$constants/colors.constants";
import { moderateScale } from "$constants/styles.constants";
import { ITheme } from "$types/common.types";
import { StyleSheet } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

export const styling = (theme: ITheme, insets: EdgeInsets) => StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        padding: moderateScale(20),
        gap: moderateScale(12),
        paddingBottom: insets.bottom + moderateScale(100),
        backgroundColor: COLORS[theme].background
    },
    title: {
        marginBottom: moderateScale(5),
        fontSize: moderateScale(25),
        color: COLORS[theme].text
    }
});
