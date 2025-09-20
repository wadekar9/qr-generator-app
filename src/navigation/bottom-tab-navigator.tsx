import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabStackParamsList, RootStackScreenProps } from '$types/navigation.types';
import { EBottomTabScreens, EStackScreens } from '$constants/screen.constants';
import { BottomTabsRoutes } from './routes';

const BottomTab = createBottomTabNavigator<BottomTabStackParamsList>();

const BottomTabNavigator: React.FC<RootStackScreenProps<EStackScreens.BOTTOM_TAB_NAVIGATOR>> = () => {

    return (
        <BottomTab.Navigator>
            <BottomTab.Screen name={EBottomTabScreens.HOME} component={BottomTabsRoutes.Home} />
            <BottomTab.Screen name={EBottomTabScreens.SETTINGS} component={BottomTabsRoutes.Settings} />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigator;
