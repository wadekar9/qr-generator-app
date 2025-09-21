import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import { EFonts, moderateScale } from '$constants/styles.constants';
import { ITheme } from '$types/common.types';
import { ThemeText } from '$components/ui';
import { COLORS } from '$constants/colors.constants';

interface TabBarButtonProps extends BottomTabBarButtonProps {
    theme: ITheme;
    label: string;
    icon: (args: { color: string }) => React.ReactNode;
}

const TabBarButton: React.FC<TabBarButtonProps> = (props) => {

    const { accessibilityState, onPress, onLongPress, icon, theme, label } = props;

    const color = accessibilityState?.selected ? COLORS[theme].primary : COLORS[theme].gray1;

    return (
        <TouchableOpacity
            activeOpacity={0.65}
            onPress={onPress}
            onLongPress={onLongPress!}
            style={styles.container}
        >
            {icon({ color })}
            <ThemeText theme={theme} variant="h4" style={[styles.label, { color }]}>{label}</ThemeText>
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
        fontFamily: EFonts.SEMI_BOLD,
        fontSize: moderateScale(12),
        textAlign: 'center',
        lineHeight: moderateScale(20)
    }
})