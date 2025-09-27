import { EBottomTabScreens, EStackScreens } from '$constants/screen.constants';
import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createNavigationContainerRef } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { QRType, SocialQRType } from './qr.types';

export type BottomTabStackParamsList = {
    [EBottomTabScreens.HOME]: undefined;
    [EBottomTabScreens.SETTINGS]: undefined;
}

export type RootStackParamsList = {
    [EStackScreens.BOTTOM_TAB_NAVIGATOR]: undefined;
    [EStackScreens.HISTORY]: undefined;
    [EStackScreens.QR_SCANNER]: undefined;
    [EStackScreens.QR_GENERATOR]: { type: QRType };
    [EStackScreens.SOCIAL_QR_GENERATOR]: { type: SocialQRType };
    [EStackScreens.PRIVACY_POLICY]: undefined;
}

export type RootStackScreenProps<T extends keyof RootStackParamsList> = NativeStackScreenProps<RootStackParamsList, T>;
export type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamsList>;

export type BottomTabStackScreenProps<T extends keyof BottomTabStackParamsList> = BottomTabScreenProps<BottomTabStackParamsList, T>;
export type BottomTabStackNavigationProps = BottomTabNavigationProp<BottomTabStackParamsList>;

export const stackNavigationRef = createNavigationContainerRef<RootStackParamsList>();
