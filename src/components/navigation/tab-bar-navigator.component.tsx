import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ITheme } from '$types/common.types';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { DEVICE_WIDTH, moderateScale } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';
import { IconButton } from '$components/ui';
import { ScanQrCode } from 'lucide-react-native';
import { EStackScreens } from '$constants/screen.constants';

interface TabBarNavigatorProps extends BottomTabBarProps {
    theme: ITheme;
}

const TAB_BAR_WIDTH = DEVICE_WIDTH - moderateScale(48)

const TabBarNavigator: React.FC<TabBarNavigatorProps> = ({ state, descriptors, navigation, theme }) => {

    const insets = useSafeAreaInsets();
    const styles = styling(theme);

    return (
        <View style={[styles.wrapper, { bottom: insets.bottom || moderateScale(20) }]}>
            <View style={styles.container}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    const TabBarButton = options.tabBarButton as any;

                    return (
                        <TabBarButton
                            key={index.toString()}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1 }}
                        />
                    )
                })}
                <IconButton style={styles.middleButton} onPress={() => navigation.navigate(EStackScreens.QR_SCANNER)}>
                    <ScanQrCode stroke={COLORS[theme].white} width={moderateScale(24)} height={moderateScale(24)} />
                </IconButton>
            </View>
        </View>
    );
}

export default TabBarNavigator;

const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0
    },
    wrapper: {
        width: TAB_BAR_WIDTH,
        height: moderateScale(70),
        borderRadius: moderateScale(100),
        alignSelf: 'center',
        backgroundColor: COLORS[theme].background1,
        borderTopWidth: 0,
        borderWidth: moderateScale(1),
        borderColor: COLORS[theme].border,
        shadowColor: COLORS[theme].black,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 0.5,
        elevation: 0,
        position: 'absolute',
    },
    section: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    middleButton: {
        position: 'absolute',
        height: moderateScale(65),
        width: moderateScale(65),
        backgroundColor: COLORS[theme].primary,
        borderRadius: moderateScale(100),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        top: moderateScale(-28),
        borderWidth: moderateScale(5),
        borderColor: COLORS[theme].gray4
    }
});
