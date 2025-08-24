import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

interface BaseDropdownProps {
    data?: any[];
    variant?: 'primary' | 'secondary';
    label?: string;
    value?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    onValueChange?: (e: any) => void;
    icon?: () => React.ReactNode;
}

const BaseDropdown: React.FC<BaseDropdownProps> = (props) => {

    const { data = [], label, value, placeholder = 'Select Item', error, disabled, variant, onValueChange, icon } = props;

    const [isFocus, setIsFocus] = useState<boolean>(false);

    const DATA = useMemo(() => data.map(item => ({ label: item.name, value: `${item.id}` })), [data]);

    return (
        <View style={styles.wrapper}>
            {label && <Text numberOfLines={2} style={styles.label}>{label}</Text>}
            <View style={[styles.containerWrapper, (variant === 'secondary') && { borderRadius: 100 }]}>
                <Dropdown
                    style={[styles.container, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={[styles.value, styles.placeholder]}
                    selectedTextStyle={styles.value}
                    itemTextStyle={styles.itemTextStyle}
                    containerStyle={{ backgroundColor: '#f9f9f9' }}
                    data={DATA}
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    dropdownPosition='auto'
                    disable={disabled}
                    activeColor={'transparent'}
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
                />
            </View>
            {error && (
                <View style={styles.errorContainer}>
                    <Text numberOfLines={3} style={styles.errorText}>{error}</Text>
                </View>
            )}
        </View>
    );
};

export default React.memo(BaseDropdown);

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
    },
    label: {
        color: 'black',
        textAlign: 'left',
    },
    value: {
        color: 'black',
        textTransform: 'capitalize',
    },
    placeholder: {
        color: 'gray',
    },
    containerWrapper: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 0,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    icon: {
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        alignSelf: 'stretch',
    },
    itemTextStyle: {
        fontSize: 16,
        color: 'black',
        textTransform: 'capitalize',
    },
    errorContainer: {
        marginTop: 8,
    },
    errorText: {
        fontSize: 13,
        color: 'red',
        flexWrap: 'wrap',
    },
});
