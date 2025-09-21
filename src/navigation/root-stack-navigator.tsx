import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { stackNavigationRef, RootStackParamsList } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';
import { StacksRoutes } from './routes';
import BottomTabNavigator from './bottom-tab-navigator';

const RootStack = createNativeStackNavigator<RootStackParamsList>();

const RootStackNavigator = () => {
    return (
        <NavigationContainer ref={stackNavigationRef}>
            <RootStack.Navigator>
                <RootStack.Screen name={EStackScreens.SPLASH} component={StacksRoutes.Splash} />
                <RootStack.Screen name={EStackScreens.BOTTOM_TAB_NAVIGATOR} component={BottomTabNavigator} options={{ headerShown: false }} />
                <RootStack.Screen name={EStackScreens.QR_GENERATOR} component={StacksRoutes.QRGenerator} />
                <RootStack.Screen name={EStackScreens.QR_SCANNER} component={StacksRoutes.QRScanner} />
                <RootStack.Screen name={EStackScreens.HISTORY} component={StacksRoutes.History} />
                <RootStack.Screen name={EStackScreens.PRIVACY_POLICY} component={StacksRoutes.PrivacyPolicy} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default RootStackNavigator;
