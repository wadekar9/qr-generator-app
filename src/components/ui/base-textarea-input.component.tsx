import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { useAppTheme } from '$hooks/common';
import { ITheme } from '$types/common.types';
import { COLORS } from '$constants/colors.constants';

interface BaseTextareaInputRef {
    clear: () => void;
    blur: () => void;
    focus: () => void;
}

interface BaseTextareaInputProps extends Omit<TextInputProps, 'style' | 'editable' | 'multiline'> {
    label?: string;
    error?: string;
    disabled?: boolean;
    RightAccessory?: React.ReactNode;
    LeftAccessory?: React.ReactNode;
}

const BaseTextareaInput = React.forwardRef<BaseTextareaInputRef, BaseTextareaInputProps>(({
    label,
    error,
    disabled = false,
    RightAccessory,
    LeftAccessory,
    ...props
}, ref) => {

    const { colors, theme } = useAppTheme();
    const styles = styling(theme);

    const inputRef = React.useRef<TextInput>(null);
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    React.useImperativeHandle(ref, () => ({
        clear: () => inputRef.current?.clear(),
        blur: () => inputRef.current?.blur(),
        focus: () => inputRef.current?.focus(),
    }), [])

    const handleFocus = React.useCallback((e: any) => {
        setIsFocused(true);
        if (props.onFocus) props.onFocus(e);
    }, [props]);

    const handleBlur = React.useCallback((e: any) => {
        setIsFocused(false);
        if (props.onBlur) props.onBlur(e);
    }, [props]);

    const handleSubmitEditing = React.useCallback((e: any) => {
        if (!props.onSubmitEditing) {
            inputRef.current?.blur();
            return
        }
        props.onSubmitEditing(e);
    }, [props]);

    const $EXTRA_STYLES = React.useMemo((): StyleProp<ViewStyle> => {
        if (!!!LeftAccessory && !!!RightAccessory) {
            return { paddingHorizontal: moderateScale(12) }
        } else if (!LeftAccessory) {
            return { paddingLeft: moderateScale(12) }
        } else if (!RightAccessory) {
            return { paddingRight: moderateScale(12) }
        }
    }, [LeftAccessory, RightAccessory])

    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.containerWrapper, { opacity: disabled ? 0.6 : 1 }, isFocused && { borderColor: colors.primary }]}>
                <View style={[styles.container, $EXTRA_STYLES]}>
                    {!!LeftAccessory && (<View style={styles.icon}>{LeftAccessory}</View>)}
                    <TextInput
                        {...props}
                        ref={inputRef}
                        numberOfLines={1}
                        multiline={true}
                        style={styles.textInput}
                        placeholder={props.placeholder || "Type Something here..."}
                        placeholderTextColor={colors.gray}
                        cursorColor={colors.primary}
                        editable={!disabled}
                        keyboardAppearance={theme}
                        returnKeyType={props.returnKeyType || 'done'}
                        textAlignVertical={'top'}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onSubmitEditing={handleSubmitEditing}
                    />
                </View>
            </View>
            {error && (
                <View style={styles.errorContainer}>
                    <Text numberOfLines={3} style={styles.errorText}>{error}</Text>
                </View>
            )}
        </View>
    );
});

export default React.memo(BaseTextareaInput);

const styling = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        width: '100%',
    },
    label: {
        color: COLORS[theme].text1,
        fontFamily: EFonts.MEDIUM,
        fontSize: EFontSize.XL,
        textAlign: 'left',
        marginBottom: moderateScale(4)
    },
    containerWrapper: {
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(8),
        borderColor: COLORS[theme].border,
        overflow: 'hidden',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'stretch',
        height: moderateScale(160),
        paddingVertical: moderateScale(8)
    },
    textInput: {
        flex: 1,
        height: '100%',
        fontFamily: EFonts.MEDIUM,
        fontSize: EFontSize.XL,
        color: COLORS[theme].text,
        textAlignVertical: 'top'
    },
    errorContainer: {
        marginTop: moderateScale(8),
    },
    errorText: {
        fontFamily: EFonts.MEDIUM,
        fontSize: moderateScale(13),
        color: COLORS[theme].primary,
        flexWrap: 'wrap',
    },
    icon: {
        height: moderateScale(50),
        paddingHorizontal: moderateScale(12),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    }
});
