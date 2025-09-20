import { View, Text } from 'react-native';
import React from 'react';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomTabScreens } from '$constants/screen.constants';

const Home: React.FC<BottomTabStackScreenProps<EBottomTabScreens.HOME>> = () => {

    return (
        <View>
            <Text>Home</Text>
        </View>
    );
};

export default Home;
