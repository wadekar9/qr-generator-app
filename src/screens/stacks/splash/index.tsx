import { View, Text } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';

const Splash: React.FC<RootStackScreenProps<EStackScreens.SPLASH>> = () => {
    return (
        <View>
            <Text>Splash</Text>
        </View>
    );
};

export default Splash;
