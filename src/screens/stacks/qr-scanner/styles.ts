import { COLORS } from "$constants/colors.constants";
import { DEVICE_HEIGHT, DEVICE_WIDTH, moderateScale } from "$constants/styles.constants";
import { ITheme } from "$types/common.types";
import { StyleSheet } from "react-native";

export const styling = (theme: ITheme) => StyleSheet.create({
    safeArea: {
        flex: 1,
        flexGrow: 1
    },
    fullScreenCamera: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flex: 1,
        zIndex: 100,
    },
    rnholeView: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    cameraControls: {
        height: '10%',
        top: 15,
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        zIndex: 1000,
    },
    buttonContainer: {
        width: moderateScale(60),
        height: moderateScale(60),
        borderRadius: moderateScale(30),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sliderContainer: {
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-evenly'
    },
    optionCoverContainer: {
        height: DEVICE_HEIGHT,
        width: DEVICE_WIDTH,
        position: 'absolute',
        zIndex: 2000
    },
    loaderContainer: {
        height: DEVICE_HEIGHT,
        width: DEVICE_WIDTH,
        position: 'absolute',
        zIndex: 2500,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonListContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: moderateScale(20)
    },
    iconContainer: {
        flex: 0.13,
        justifyContent: 'center'
    },
    line: {
        position: 'absolute',
        top: DEVICE_HEIGHT * 0.4,
        alignSelf: 'center',
        width: DEVICE_WIDTH * 0.8,
        height: 3,
        backgroundColor: 'red',
        zIndex: 2500
    },
    sheetContainer: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: COLORS[theme].surface,
        padding: moderateScale(20),
        gap: moderateScale(20),
    },
    buttonStyle: {
        height: moderateScale(55),
        borderWidth: 0,
        backgroundColor: COLORS[theme].primary
    },
    buttonTextStyle: {
        color: COLORS[theme].white
    }
})