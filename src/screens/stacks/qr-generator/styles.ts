import { COLORS } from "$constants/colors.constants";
import { moderateScale } from "$constants/styles.constants";
import { ITheme } from "$types/common.types";
import { StyleSheet } from "react-native";

export const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS[theme].background
    },
    contentContainer: {
        flexGrow: 1,
        padding: moderateScale(20),
        gap: moderateScale(15),
    },
    actionWrapper: {
        paddingHorizontal: moderateScale(18),
        paddingVertical: moderateScale(12),
        width: '100%',
        borderTopWidth: moderateScale(2),
        borderTopColor: COLORS[theme].border1
    }
});
