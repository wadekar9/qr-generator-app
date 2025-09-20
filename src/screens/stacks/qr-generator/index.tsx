import { View, Text } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';

const QRGenerator: React.FC<RootStackScreenProps<EStackScreens.QR_GENERATOR>> = () => {
    return (
        <View>
            <Text>QRGenerator</Text>
        </View>
    );
};

export default QRGenerator;
