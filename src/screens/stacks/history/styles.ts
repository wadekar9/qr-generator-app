import { moderateScale } from "$constants/styles.constants";
import { ITheme } from "$types/common.types";
import { StyleSheet } from "react-native";

export const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flexGrow: 1,
        padding: moderateScale(20),
        gap: moderateScale(15),
    }
});
