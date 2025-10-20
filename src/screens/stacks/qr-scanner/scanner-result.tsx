import React from 'react';
import { View, ScrollView } from 'react-native';
import { RootStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/containers';
import { useAppTheme } from '$hooks/common';
import { BackHeader } from '$components/navigation';
import { styling } from './styles';
import { useQRHandler } from '$hooks/module';
import { IconButton, ThemeText } from '$components/ui';
import { QR_ACTIONS_COMMON } from '$constants/qr-actions.constants';
import { AppLoaderModal } from '$components/modal';

const ScannerResult: React.FC<RootStackScreenProps<EStackScreens.SCANNER_RESULT>> = ({ route }) => {
    const { value } = route.params;
    const { theme, colors } = useAppTheme();
    const styles = styling(theme);

    const { parsed, qrActions, handleAction, handleShare, handleCopy, IconComponent, loading } = useQRHandler(value);

    return (
        <ThemedView>
            <BackHeader theme={theme} label="Scan Result" />
            <View style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.header}>
                        {IconComponent ? <IconComponent color={colors.primary} /> : null}
                        <ThemeText theme={theme} style={styles.typeText}>{String(parsed.type).toUpperCase()}</ThemeText>
                    </View>
                    <View style={styles.content}>
                        <ThemeText theme={theme} style={styles.detailText} numberOfLines={undefined}>{value}</ThemeText>
                    </View>
                    <View style={styles.actions}>
                        {(qrActions).map((action, idx) => {
                            const Icon = action.icon;
                            return (
                                <IconButton key={`${idx}`} style={styles.action} onPress={() => handleAction(action.action)}>
                                    <Icon color={colors.primary} />
                                    <ThemeText theme={theme} style={styles.actionText}>{action.label}</ThemeText>
                                </IconButton>
                            )
                        })}
                        {(QR_ACTIONS_COMMON).map((action, idx) => {
                            const Icon = action.icon;
                            return (
                                <IconButton key={`${idx}`} style={styles.action} onPress={() => action.action === 'share' ? handleShare() : handleCopy()}>
                                    <Icon color={colors.primary} />
                                    <ThemeText theme={theme} style={styles.actionText}>{action.label}</ThemeText>
                                </IconButton>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>

            {loading && <AppLoaderModal key={'qr-action-app-loading'} />}
        </ThemedView>
    );
};

export default ScannerResult;
