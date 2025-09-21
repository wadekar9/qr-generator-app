import { StyleSheet, View } from 'react-native'
import React from 'react'
import { IconButton, ThemeText } from '$components/ui'
import { ITheme } from '$types/common.types';
import { COLORS } from '$constants/colors.constants';
import { ChevronRight } from 'lucide-react-native';
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';

interface SettingsItemProps {
    theme: ITheme;
    Icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
    theme,
    Icon,
    title,
    subtitle,
    onPress,
    rightElement
}) => {

    const styles = styling(theme);

    return (
        <IconButton
            style={styles.wrapper}
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={styles.container}>
                {Icon}
                <View style={styles.content}>
                    <ThemeText theme={theme} style={[styles.title]}>{title}</ThemeText>
                    {subtitle && (<ThemeText theme={theme} style={[styles.description]}>{subtitle}</ThemeText>)}
                </View>
            </View>
            {rightElement || (onPress && <ChevronRight size={moderateScale(24)} color={COLORS[theme].text1} />)}
        </IconButton>
    )
}

export default SettingsItem

const styling = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: moderateScale(12),
        borderRadius: moderateScale(12),
        borderWidth: moderateScale(1.5),
        borderColor: COLORS[theme].border,
        backgroundColor: COLORS[theme].surface,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12),
        flex: 1,
    },
    content: {
        flex: 1
    },
    title: {
        fontFamily: EFonts.SEMI_BOLD,
        fontSize: EFontSize.BASE,
        color: COLORS[theme].text,
    },
    description: {
        fontFamily: EFonts.MEDIUM,
        fontSize: EFontSize.XS,
        color: COLORS[theme].text4
    },
})
