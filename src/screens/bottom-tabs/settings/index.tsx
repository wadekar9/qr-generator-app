import { View, Text } from 'react-native';
import React from 'react';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomTabScreens } from '$constants/screen.constants';

const Settings: React.FC<BottomTabStackScreenProps<EBottomTabScreens.SETTINGS>> = () => {
    return (
        <View>
            <Text>Settings</Text>
        </View>
    );
};

export default Settings;
