import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { BottomTabStackParamsList, RootStackScreenProps } from '$types/navigation.types';
import { EBottomTabScreens, EStackScreens } from '$constants/screen.constants';
import { useAppTheme } from '$hooks/common';
import { TabBarNavigator, TabBarButton } from '$components/navigation';
import { BottomTabBarProps, BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { BottomTabsRoutes } from './routes';
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { Warehouse, Settings } from 'lucide-react-native';

const BottomTab = createBottomTabNavigator<BottomTabStackParamsList>();

const BottomTabNavigator: React.FC<RootStackScreenProps<EStackScreens.BOTTOM_TAB_NAVIGATOR>> = () => {

    const { theme, colors } = useAppTheme();

    return (
        <BottomTab.Navigator
            initialRouteName={EBottomTabScreens.HOME}
            tabBar={(props: BottomTabBarProps) => <TabBarNavigator theme={theme} {...props} />}
            screenOptions={{
                headerStyle: { backgroundColor: colors.background1 },
                headerTitleStyle: [styles.headerText, { color: colors.text }],
            }}
        >
            <BottomTab.Screen
                name={EBottomTabScreens.HOME}
                component={BottomTabsRoutes.Home}
                options={{
                    headerTitle: 'Home',
                    tabBarButton: (props: BottomTabBarButtonProps) => (
                        <TabBarButton
                            key={'home'}
                            theme={theme}
                            icon={({ color }) => <Warehouse fill={color} width={moderateScale(28)} height={moderateScale(28)} />} {...props} />
                    )
                }}
            />
            <BottomTab.Screen
                name={EBottomTabScreens.SETTINGS}
                component={BottomTabsRoutes.Settings}
                options={{
                    headerTitle: 'Settings',
                    tabBarButton: (props: BottomTabBarButtonProps) => (
                        <TabBarButton
                            key={'settings'}
                            theme={theme}
                            icon={({ color }) => <Settings fill={color} width={moderateScale(28)} height={moderateScale(28)} />} {...props} />
                    )
                }}
            />
        </BottomTab.Navigator>
    )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    headerText: {
        fontSize: EFontSize['2XL'],
        fontFamily: EFonts.SEMI_BOLD,
        letterSpacing: 0.5
    }
})