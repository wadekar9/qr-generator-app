import { View, Text } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';

const History: React.FC<RootStackScreenProps<EStackScreens.HISTORY>> = () => {
    return (
        <View>
            <Text>History</Text>
        </View>
    );
};

export default History;
