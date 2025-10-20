import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { EFonts, moderateScale } from '$constants/styles.constants';
import { Dropdown } from 'react-native-element-dropdown';
import { useAppTheme } from '$hooks/common';
import { ITheme } from '$types/common.types';
import { COLORS } from '$constants/colors.constants';
import { ChevronsUpDown } from 'lucide-react-native';

interface BaseDropdownProps {
    data?: any[];
    variant?: 'primary' | 'secondary';
    label?: string;
    value?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    onValueChange?: (e: string) => void;
    icon?: () => React.ReactNode;
}

const BaseDropdown: React.FC<BaseDropdownProps> = (props) => {

    const { data = [], label, value, placeholder = 'Select Item', error, disabled, variant, onValueChange, icon } = props;
    const { theme, colors } = useAppTheme();
    const styles = styling(theme);

    const [isFocus, setIsFocus] = useState<boolean>(false);

    return (
        <View style={styles.wrapper}>
            {label && <Text numberOfLines={2} style={styles.label}>{label}</Text>}
            <View style={[styles.containerWrapper, (variant == 'secondary') && { borderRadius: moderateScale(100) }]}>
                <Dropdown
                    style={[styles.container, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={[styles.value, styles.placeholder]}
                    selectedTextStyle={styles.value}
                    itemTextStyle={styles.itemTextStyle}
                    containerStyle={{ backgroundColor: colors.surface }}
                    data={data}
                    maxHeight={moderateScale(200)}
                    labelField="label"
                    valueField="value"
                    dropdownPosition='auto'
                    disable={disabled}
                    activeColor='transparent'
                    placeholder={placeholder}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        onValueChange && onValueChange(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <View style={styles.icon}>
                            {icon && icon()}
                        </View>
                    )}
                    renderRightIcon={(visible) => (
                        <View style={styles.icon}>
                            <ChevronsUpDown color={colors.gray} width={moderateScale(24)} height={moderateScale(24)} />
                        </View>
                    )}
                />
            </View>
            {error && (
                <View style={styles.errorContainer}>
                    <Text numberOfLines={3} style={styles.errorText}>{error}</Text>
                </View>
            )}
        </View>
    )
}

export default React.memo(BaseDropdown);

const styling = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        width: '100%',
    },
    label: {
        color: COLORS[theme].text,
        fontFamily: EFonts.MEDIUM,
        fontSize: moderateScale(16),
        textAlign: 'left',
        marginBottom: moderateScale(4)
    },
    value: {
        fontFamily: EFonts.MEDIUM,
        fontSize: moderateScale(16),
        color: COLORS[theme].text
    },
    placeholder: {
        color: COLORS[theme].gray
    },
    containerWrapper: {
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(8),
        borderColor: COLORS[theme].border,
        overflow: 'hidden',
        elevation: 0
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: moderateScale(50)
    },
    icon: {
        paddingHorizontal: moderateScale(12),
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        alignSelf: 'stretch'
    },
    itemTextStyle: {
        fontFamily: EFonts.MEDIUM,
        fontSize: moderateScale(16),
        color: COLORS[theme].text,
    },
    errorContainer: {
        marginTop: moderateScale(8),
    },
    errorText: {
        fontFamily: EFonts.MEDIUM,
        fontSize: moderateScale(13),
        color: COLORS[theme].red,
        flexWrap: 'wrap',
    }
});
