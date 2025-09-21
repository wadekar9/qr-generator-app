import { View, Text } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';

const PrivacyPolicy: React.FC<RootStackScreenProps<EStackScreens.PRIVACY_POLICY>> = () => {
    return (
        <View>
            <Text>PrivacyPolicy</Text>
        </View>
    );
};

export default PrivacyPolicy;
