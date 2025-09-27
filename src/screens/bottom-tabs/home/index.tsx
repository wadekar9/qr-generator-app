import { View, ScrollView } from 'react-native';
import React from 'react';
import { BottomTabStackScreenProps, stackNavigationRef } from '$types/navigation.types';
import { EBottomTabScreens, EStackScreens } from '$constants/screen.constants';
import { ThemedSafeAreaView } from '$components/containers';
import { styling } from './styles';
import { useAppTheme } from '$hooks/common';
import { IconButton, ThemeText } from '$components/ui';
import { QR_TYPES, SOCIAL_QR_TYPES } from '$constants/app.constants';
import { moderateScale } from '$constants/styles.constants';

const Home: React.FC<BottomTabStackScreenProps<EBottomTabScreens.HOME>> = () => {

    const { theme, colors, insets } = useAppTheme();
    const styles = styling(theme, insets);

    return (
        <ThemedSafeAreaView>
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <ThemeText theme={theme} style={styles.titleText}>Generate QR Code</ThemeText>
                <View style={styles.section}>
                    {QR_TYPES.map((qrType, idx) => {
                        const Icon = qrType.icon;
                        return (
                            <IconButton
                                key={`${idx}`}
                                style={styles.qrContainer}
                                onPress={() => stackNavigationRef.current?.navigate(EStackScreens.QR_GENERATOR, { type: qrType.type })}
                            >
                                <Icon color={colors.primary} width={moderateScale(30)} height={moderateScale(30)} />
                                <ThemeText theme={theme} style={styles.qrLabel}>{qrType.label}</ThemeText>
                            </IconButton>
                        );
                    })}
                </View>

                <ThemeText theme={theme} style={styles.titleText}>Generate Social QR Code</ThemeText>
                <View style={styles.section}>
                    {SOCIAL_QR_TYPES.map((qrType, idx) => {
                        const Icon = qrType.icon;
                        return (
                            <IconButton
                                key={`${idx}`}
                                style={styles.qrContainer}
                                onPress={() => stackNavigationRef.current?.navigate(EStackScreens.SOCIAL_QR_GENERATOR, { type: qrType.type })}
                            >
                                <Icon fill={colors.primary} width={moderateScale(30)} height={moderateScale(30)} />
                                <ThemeText theme={theme} style={styles.qrLabel}>{qrType.label}</ThemeText>
                            </IconButton>
                        );
                    })}
                </View>
            </ScrollView>
        </ThemedSafeAreaView>
    );
};

export default Home;
