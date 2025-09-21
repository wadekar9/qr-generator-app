import { StyleSheet, Text, TextProps, View } from 'react-native'
import React from 'react'
import { ITheme } from '$types/common.types';
import { COLORS } from '$constants/colors.constants';
import { typography, TypographyVariant } from '$styles/typography';

interface ThemeTextProps extends TextProps {
    theme: ITheme;
    children: React.ReactNode;
    variant?: TypographyVariant;
}

const ThemeText: React.FC<ThemeTextProps> = ({ theme, children, variant, ...props }) => {
    return (
        <Text {...props} style={[typography[variant || 'body1'], { color: COLORS[theme].text }, props.style]}>{children}</Text>
    )
}

export default ThemeText
