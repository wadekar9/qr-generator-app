import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { EFontSize, moderateScale } from '$constants/styles.constants';
import { IconButton, ThemeText } from '$components/ui';
import { useAppTheme } from '$hooks/common';
import { ITheme } from '$types/common.types';
import { ArrowLeft } from 'lucide-react-native';
import { COLORS } from '$constants/colors.constants';

interface BackHeaderProps {
    label?: string;
    RightAccessory?: React.ReactNode;
    theme: ITheme;
}

const BackHeader: React.FC<BackHeaderProps> = ({
    label,
    RightAccessory,
    theme
}) => {

    const navigation = useNavigation();
    const { colors } = useAppTheme();
    const styles = styling(theme);

    return (
        <View style={styles.container}>
            <IconButton
                onPress={() => navigation.goBack()}
                style={styles.icon}
            >
                <ArrowLeft width={moderateScale(26)} height={moderateScale(26)} color={colors.text} />
            </IconButton>
            {label && (
                <View style={styles.labelWrapper}>
                    <ThemeText numberOfLines={1} theme={theme} variant='h4' style={styles.label}>{label}</ThemeText>
                </View>
            )}
            {!!RightAccessory && RightAccessory}
        </View>
    )
}

export default BackHeader

const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: moderateScale(60),
        paddingRight: moderateScale(20),
        borderBottomWidth: moderateScale(1),
        borderBottomColor: COLORS[theme].border1,
        zIndex: 5000
    },
    icon: {
        width: moderateScale(60),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        color: COLORS[theme].text,
        fontSize: EFontSize.XL
    },
    labelWrapper: {
        flexGrow: 1,
        flex: 1
    }
})