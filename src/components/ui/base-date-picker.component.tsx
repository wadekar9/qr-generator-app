import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useAppTheme } from '$hooks/common';
import { ITheme } from '$types/common.types';
import { EFonts, moderateScale } from '$constants/styles.constants';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CalendarDays } from 'lucide-react-native';
import { COLORS } from '$constants/colors.constants';

interface BaseDatePickerProps {
    label?: string;
    error?: string;
    value?: Date | null | undefined;
    maximumDate?: Date;
    minimumDate?: Date;
    is24Hour?: boolean;
    onDateChange?: (date: Date) => void;
    pickerMode?: 'datetime' | 'date' | 'time';
    placeholder?: string;
    disabled?: boolean;
}

const BaseDatePicker: React.FC<BaseDatePickerProps> = ({
    label,
    error,
    value = null,
    maximumDate,
    minimumDate,
    is24Hour,
    onDateChange,
    pickerMode = 'datetime',
    placeholder = 'DD/MM/YYYY',
    disabled = false,
}) => {

    const { colors, theme } = useAppTheme();
    const styles = styling(theme);

    const [TODAY_DATE] = useState<Date>(new Date());
    const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);

    function showPicker() {
        setIsDatePickerVisible(true);
    }

    function hidePicker() {
        setIsDatePickerVisible(false);
    }

    function onConfirmDate(date: Date | undefined) {
        hidePicker();
        (onDateChange && date) && onDateChange(date);
    }

    const formatDate = (date: Date) => `${date.toUTCString()}`;

    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}
            <Pressable
                style={[styles.container, { opacity: disabled ? 0.5 : 1 }]}
                onPress={showPicker}
                disabled={disabled}
            >
                <View style={styles.icon}>
                    <CalendarDays width={moderateScale(25)} height={moderateScale(25)} color={colors.text} />
                </View>
                <View style={styles.content}>
                    {value ? (<Text style={styles.value}>{formatDate(value)}</Text>) : (<Text style={[styles.value, styles.placeholder]}>{placeholder}</Text>)}
                </View>
            </Pressable>

            {error && (
                <View style={styles.errorTextWrapper}>
                    <Text numberOfLines={3} style={styles.errorText}>{error}</Text>
                </View>
            )}

            <DateTimePickerModal
                date={value || TODAY_DATE}
                isVisible={isDatePickerVisible}
                mode={pickerMode}
                themeVariant={theme}
                onConfirm={onConfirmDate}
                onCancel={hidePicker}
                is24Hour={is24Hour}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                textColor={colors.text}
                isDarkModeEnabled={theme === 'dark'}
            />
        </View>
    );
};

export default React.memo(BaseDatePicker);

const styling = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        width: '100%',
    },
    container: {
        height: moderateScale(50),
        backgroundColor: COLORS[theme].background1,
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(8),
        borderColor: COLORS[theme].border,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    label: {
        color: COLORS[theme].text,
        fontFamily: EFonts.REGULAR,
        textAlign: 'left',
        marginBottom: moderateScale(4),
    },
    icon: {
        height: '100%',
        width: undefined,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorTextWrapper: {
        marginTop: moderateScale(6),
    },
    errorText: {
        fontFamily: EFonts.REGULAR,
        fontSize: moderateScale(13),
        color: COLORS[theme].error,
        flexWrap: 'wrap',
    },
    value: {
        fontFamily: EFonts.REGULAR,
        fontSize: moderateScale(16),
        color: COLORS[theme].text,
    },
    placeholder: {
        color: COLORS[theme].gray,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
});
