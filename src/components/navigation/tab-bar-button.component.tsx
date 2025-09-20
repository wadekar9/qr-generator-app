import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import { EFonts, moderateScale } from '$constants/styles.constants';
import { ITheme } from '$types/common.types';

interface TabBarButtonProps extends BottomTabBarButtonProps {
    theme: ITheme;
    icon: (args: { color: string }) => React.ReactNode;
}

const TabBarButton: React.FC<TabBarButtonProps> = (props) => {

    const { accessibilityState, onPress, onLongPress, icon } = props;

    const isFocused = accessibilityState?.selected;

    return (
        <TouchableOpacity
            activeOpacity={0.65}
            onPress={onPress}
            onLongPress={onLongPress!}
            style={styles.container}
        >
            {icon({ color: isFocused ? '#000' : '#8F8F8F' })}
        </TouchableOpacity>
    )
}

export default TabBarButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontFamily: EFonts.BOLD,
        fontSize: moderateScale(12),
        textAlign: 'center',
        lineHeight: moderateScale(20)
    }
})