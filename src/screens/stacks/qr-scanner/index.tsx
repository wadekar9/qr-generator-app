import { View, Text } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';

const QRScanner: React.FC<RootStackScreenProps<EStackScreens.QR_SCANNER>> = () => {
    return (
        <View>
            <Text>QRScanner</Text>
        </View>
    );
};

export default QRScanner;
