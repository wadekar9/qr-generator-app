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
            <RootStack.Navigator
                screenOptions={{
                    orientation: 'portrait',
                    headerShown: false,
                    statusBarStyle: 'light'
                }}
                initialRouteName={EStackScreens.BOTTOM_TAB_NAVIGATOR}
            >
                <RootStack.Screen name={EStackScreens.BOTTOM_TAB_NAVIGATOR} component={BottomTabNavigator} />
                <RootStack.Screen name={EStackScreens.QR_GENERATOR} component={StacksRoutes.QRGenerator} />
                <RootStack.Screen name={EStackScreens.QR_SCANNER} component={StacksRoutes.QRScanner} />
                <RootStack.Screen name={EStackScreens.HISTORY} component={StacksRoutes.History} />
                <RootStack.Screen name={EStackScreens.QR_RESULT} component={StacksRoutes.QRResult} />
                <RootStack.Screen name={EStackScreens.SCANNER_RESULT} component={StacksRoutes.ScannerResult} />
                <RootStack.Screen name={EStackScreens.QR_STYLING} component={StacksRoutes.QRStyling} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default RootStackNavigator;
