import { EBottomTabScreens, EStackScreens } from '$constants/screen.constants';
import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createNavigationContainerRef } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type BottomTabStackParamsList = {
    [EBottomTabScreens.HOME]: undefined;
    [EBottomTabScreens.SETTINGS]: undefined;
}

export type RootStackParamsList = {
    [EStackScreens.SPLASH]: undefined;
    [EStackScreens.HISTORY]: undefined;
    [EStackScreens.ABOUT_US]: undefined;
    [EStackScreens.QR_SCANNER]: undefined;
    [EStackScreens.QR_GENERATOR]: undefined;
}

export type RootStackScreenProps<T extends keyof RootStackParamsList> = NativeStackScreenProps<RootStackParamsList, T>;
export type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamsList>;

export type BottomTabStackScreenProps<T extends keyof BottomTabStackParamsList> = BottomTabScreenProps<BottomTabStackParamsList, T>;
export type BottomTabStackNavigationProps = BottomTabNavigationProp<BottomTabStackParamsList>;

export const rootStackNavigationRef = createNavigationContainerRef<RootStackParamsList>();
