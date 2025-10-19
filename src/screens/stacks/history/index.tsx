import { View, FlatList } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { RootStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/containers';
import { BackHeader } from '$components/navigation';
import { useAppTheme } from '$hooks/common';
import { BaseBottomSheet, IconButton } from '$components/ui';
import { BrushCleaning } from 'lucide-react-native';
import { BaseSheetModalRef } from '$types/common.types';
import { CleanupQRHistoryPromptModal } from '$components/modal';
import { styling } from './styles';
import { HistoryItem, HistoryOptions } from '$components/layouts';
import { useHistory } from '$hooks/module';
import { moderateScale } from '$constants/styles.constants';
import { waitForSeconds } from '$utils/helpers';
import { EmptyHistoryPage } from '$components/pages';

const History: React.FC<RootStackScreenProps<EStackScreens.HISTORY>> = () => {

    const { loading, history, clearHistory, shareQRCode, removeQRCode, saveQRCode } = useHistory();
    const { theme, colors } = useAppTheme();
    const promptModalRef = useRef<BaseSheetModalRef>(null);
    const sheetRef = useRef<BaseSheetModalRef>(null);
    const styles = useMemo(() => styling(theme), [theme]);
    const [selectedHistory, setSelectedHistory] = useState<string | undefined>(undefined);

    const handleChooseOption = useCallback(async (option: 'save' | 'share' | 'delete') => {
        sheetRef.current?.close();
        if (!selectedHistory) return;
        await waitForSeconds(1);

        switch (option) {
            case 'save':
                saveQRCode(selectedHistory);
                break;
            case 'share':
                shareQRCode(selectedHistory);
                break;
            case 'delete':
                removeQRCode(selectedHistory);
                break;
        }
    }, [selectedHistory]);

    return (
        <ThemedView>
            <BackHeader
                theme={theme}
                label='History'
                RightAccessory={history.length > 0 && (
                    <IconButton onPress={() => promptModalRef.current?.open()}>
                        <BrushCleaning color={colors.text} />
                    </IconButton>
                )}
            />

            <View style={styles.container}>
                <FlatList
                    data={history}
                    keyExtractor={(_, idx) => idx.toString()}
                    renderItem={({ item, index }) => (
                        <HistoryItem
                            qrHistory={item}
                            key={index}
                            theme={theme}
                            onOptionsPress={() => {
                                setSelectedHistory(item.id);
                                sheetRef.current?.open();
                            }}
                        />
                    )}
                    contentContainerStyle={styles.contentContainer}
                    scrollEventThrottle={16}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    ListEmptyComponent={<EmptyHistoryPage loading={loading} theme={theme} />}
                />
            </View>

            <CleanupQRHistoryPromptModal
                theme={theme}
                ref={promptModalRef}
                onClear={() => {
                    promptModalRef.current?.close();
                    clearHistory();
                }}
            />

            <BaseBottomSheet
                ref={sheetRef}
                theme={theme}
                sheetHeight={moderateScale(180)}
            >
                <HistoryOptions theme={theme} onChooseOption={handleChooseOption} />
            </BaseBottomSheet>
        </ThemedView>
    );
};

export default History;
