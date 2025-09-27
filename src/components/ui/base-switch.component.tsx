import React, { useRef, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Animated,
    View,
    I18nManager
} from 'react-native';
import { moderateScale } from '$constants/styles.constants';
import { useAppTheme } from '$hooks/common';
import { ITheme } from '$types/common.types';
import { COLORS } from '$constants/colors.constants';

interface BaseSwitchProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    disabled?: boolean;
}

const DEFAULT_DIMENSIONS = {
    width: moderateScale(60),
    height: moderateScale(35),
    circleWidth: moderateScale(28),
    circleHeight: moderateScale(28),
    translateX: moderateScale(36),
};

const BaseSwitch: React.FC<BaseSwitchProps> = ({
    value,
    onValueChange,
    disabled = false,
}) => {
    const { theme } = useAppTheme();
    const styles = createStyles(theme);

    const offsetX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let toValue: number;

        if (!I18nManager.isRTL && value) {
            toValue = DEFAULT_DIMENSIONS.width - DEFAULT_DIMENSIONS.translateX;
        } else if (I18nManager.isRTL && value) {
            toValue = -DEFAULT_DIMENSIONS.width + DEFAULT_DIMENSIONS.translateX;
        } else {
            toValue = -1;
        }

        Animated.timing(offsetX, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [value]);

    const handlePress = () => {
        if (!disabled) {
            onValueChange(!value);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.75}
                style={[styles.wrapper, { backgroundColor: value ? COLORS[theme].primary : COLORS[theme].gray1 }, disabled && styles.disabledWrapper]}
                onPress={handlePress}
                disabled={disabled}
            >
                <Animated.View style={[styles.circle, { transform: [{ translateX: offsetX }] }]} />
            </TouchableOpacity>
        </View>
    );
};

export default React.memo(BaseSwitch);

const createStyles = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        width: DEFAULT_DIMENSIONS.width,
        borderRadius: moderateScale(20),
        height: DEFAULT_DIMENSIONS.height,
    },
    disabledWrapper: {
        opacity: 0.5,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        left: 0,
        position: 'absolute',
        backgroundColor: COLORS[theme].white,
        width: DEFAULT_DIMENSIONS.circleWidth,
        height: DEFAULT_DIMENSIONS.circleHeight,
        borderRadius: DEFAULT_DIMENSIONS.circleWidth / 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        elevation: 1.5,
    }
});