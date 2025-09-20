import { View, Text } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';

const AboutUs: React.FC<RootStackScreenProps<EStackScreens.ABOUT_US>> = () => {
    return (
        <View>
            <Text>AboutUs</Text>
        </View>
    );
};

export default AboutUs;
