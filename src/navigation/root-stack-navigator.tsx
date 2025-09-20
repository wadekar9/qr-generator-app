import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { rootStackNavigationRef, RootStackParamsList } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';
import { StacksRoutes } from './routes';
import BottomTabNavigator from './bottom-tab-navigator';

const RootStack = createNativeStackNavigator<RootStackParamsList>();

const RootStackNavigator = () => {
    return (
        <NavigationContainer ref={rootStackNavigationRef}>
            <RootStack.Navigator>
                <RootStack.Screen name={EStackScreens.SPLASH} component={StacksRoutes.Splash} />
                <RootStack.Screen name={EStackScreens.BOTTOM_TAB_NAVIGATOR} component={BottomTabNavigator} />
                <RootStack.Screen name={EStackScreens.QR_GENERATOR} component={StacksRoutes.QRGenerator} />
                <RootStack.Screen name={EStackScreens.QR_SCANNER} component={StacksRoutes.QRScanner} />
                <RootStack.Screen name={EStackScreens.HISTORY} component={StacksRoutes.History} />
                <RootStack.Screen name={EStackScreens.ABOUT_US} component={StacksRoutes.AboutUs} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default RootStackNavigator;
