import { COLORS } from '$constants/colors.constants';
import { moderateScale } from '$constants/styles.constants';
import { BaseSheetModalRef, ITheme } from '$types/common.types';
import React, { forwardRef, memo, useImperativeHandle } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import ActionSheet, { ActionSheetRef, ActionSheetProps } from "react-native-actions-sheet";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BaseBottomSheetProps {
    children: React.ReactNode;
    sheetProps?: ActionSheetProps;
    sheetHeight?: number;
    keyboardAvoidingViewEnabled?: boolean;
    theme: ITheme;
}

interface BaseBottomSheetRef extends BaseSheetModalRef { };

const BaseBottomSheet = forwardRef<BaseBottomSheetRef, BaseBottomSheetProps>((props, ref) => {

    const actionSheetRef = React.useRef<ActionSheetRef>(null);
    const safeAreaInsets = useSafeAreaInsets();
    const styles = styling(props.theme);

    const openSheet = () => {
        actionSheetRef.current?.show();
    };

    const closeSheet = () => {
        Keyboard.dismiss()
        actionSheetRef.current?.hide();
    };

    useImperativeHandle(ref, () => ({
        open: () => openSheet(),
        close: () => closeSheet()
    }), []);


    return (
        <>
            <ActionSheet
                closeOnTouchBackdrop
                closeOnPressBack
                containerStyle={{
                    backgroundColor: COLORS[props.theme].background,
                    borderTopRightRadius: moderateScale(30),
                    borderTopLeftRadius: moderateScale(30),
                    overflow: 'hidden',
                }}
                animated={true}
                gestureEnabled={false}
                ref={actionSheetRef}
                keyboardHandlerEnabled={true}
                statusBarTranslucent={true}
                safeAreaInsets={safeAreaInsets}
                defaultOverlayOpacity={0.8}
                {...props.sheetProps}
            >
                <View style={[styles.wrapper, { height: props.sheetHeight || moderateScale(354) }]}>
                    {props.children}
                </View>
            </ActionSheet>
        </>
    );
})

export default memo(BaseBottomSheet);

const styling = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        backgroundColor: COLORS[theme].background
    }
})