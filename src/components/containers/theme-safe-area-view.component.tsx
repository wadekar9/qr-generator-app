import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useAppTheme } from '$hooks/common';

interface ThemedViewProps {
    children: React.ReactNode;
}

const ThemedSafeAreaView: React.FC<ThemedViewProps> = ({ children }) => {
    const { colors, insets } = useAppTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
            {children}
        </View>
    );
};

export default ThemedSafeAreaView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
