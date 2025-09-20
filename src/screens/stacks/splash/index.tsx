import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { RootStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';

const Splash: React.FC<RootStackScreenProps<EStackScreens.SPLASH>> = ({ navigation }) => {

    useEffect(() => {
        navigation.replace(EStackScreens.BOTTOM_TAB_NAVIGATOR);
    }, [navigation]);

    return (
        <View>
            <Text>Splash</Text>
        </View>
    );
};

export default Splash;
