import { InputAccessoryView, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ITheme } from '$types/common.types';
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';
import ThemeText from './theme-text.component';
import IconButton from './icon-button.component';

interface BaseInputAccessoryViewProps {
    theme: ITheme;
    inputAccessoryViewID: string;
    onNext?: () => void;
    onDone?: () => void;
    type?: 'done' | 'next';
}

const BaseInputAccessoryView: React.FC<BaseInputAccessoryViewProps> = ({
    theme,
    inputAccessoryViewID,
    onNext,
    onDone,
    type = 'done'
}) => {

    if (Platform.OS == 'android') return null;
    const styles = styling(theme);

    return (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
            <View style={styles.container}>
                <IconButton onPress={onNext ? onNext : onDone}>
                    <ThemeText variant={'h4'} theme={theme} style={styles.text}>{type}</ThemeText>
                </IconButton>
            </View>
        </InputAccessoryView>
    )
}

export default BaseInputAccessoryView

const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        height: moderateScale(40),
        backgroundColor: '#d1d4d9',
        paddingHorizontal: moderateScale(12),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    text: {
        fontFamily: EFonts.SEMI_BOLD,
        fontSize: EFontSize.XL,
        color: COLORS[theme].primary,
        textTransform: 'capitalize',
        letterSpacing: 0.2
    }
});