import React from 'react';
import {
    Linking,
    ScrollView,
    Share as ShareNative
} from 'react-native';
import {
    Moon,
    Sun,
    FileText,
    Smartphone,
    Share
} from 'lucide-react-native';
import { BottomTabStackScreenProps, stackNavigationRef } from '$types/navigation.types';
import { EBottomTabScreens, EStackScreens } from '$constants/screen.constants';
import { useAppTheme } from '$hooks/common';
import { ThemedSafeAreaView } from '$components/containers';
import { styling } from './styles';
import { SettingsItem } from '$components/layouts';
import { BaseSwitch, ThemeText } from '$components/ui';
import { APP_PLAY_STORE_URL } from '$constants/app.constants';
import { shareAppDetails } from '$utils/helpers';

const Settings: React.FC<BottomTabStackScreenProps<EBottomTabScreens.SETTINGS>> = () => {

    const { theme, insets, colors, changeTheme } = useAppTheme();
    const styles = styling(theme, insets);

    const toggleTheme = () => {
        changeTheme(theme == 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemedSafeAreaView>
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <ThemeText theme={theme} style={[styles.title]}>Settings</ThemeText>

                <SettingsItem
                    theme={theme}
                    Icon={theme == 'dark' ? <Moon color={colors.primary} width={24} height={24} /> : <Sun color={colors.primary} width={24} height={24} />}
                    title="Dark Mode"
                    subtitle={theme == 'dark' ? 'Dark theme enabled' : 'Light theme enabled'}
                    rightElement={
                        <BaseSwitch
                            value={theme == 'dark'}
                            onValueChange={toggleTheme}
                        />
                    }
                />

                <SettingsItem
                    theme={theme}
                    Icon={<FileText color={colors.primary} width={24} height={24} />}
                    title="History"
                    subtitle="View your generated code history"
                    onPress={() => stackNavigationRef.current?.navigate(EStackScreens.HISTORY)}
                />

                <SettingsItem
                    theme={theme}
                    Icon={<Share color={colors.primary} width={24} height={24} />}
                    title="Share"
                    subtitle="Share app with friends"
                    onPress={() => shareAppDetails()}
                />

                <SettingsItem
                    theme={theme}
                    Icon={<Smartphone color={colors.primary} width={24} height={24} />}
                    title="Rate App"
                    subtitle="Help us improve"
                    onPress={() => Linking.openURL(APP_PLAY_STORE_URL)}
                />
            </ScrollView>
        </ThemedSafeAreaView>
    );
};

export default Settings;
