import { View, FlatList } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { IHistory } from '$types/history.types';
import { waitForSeconds } from '$utils/helpers';
import { EmptyHistoryPage } from '$components/pages';

const History: React.FC<RootStackScreenProps<EStackScreens.HISTORY>> = () => {

    const { loading, history, loadHistory, clearHistory, shareQRCode, removeQRCode } = useHistory();
    const { theme, colors } = useAppTheme();
    const promptModalRef = useRef<BaseSheetModalRef>(null);
    const sheetRef = useRef<BaseSheetModalRef>(null);
    const styles = useMemo(() => styling(theme), [theme]);
    const [selectedHistory, setSelectedHistory] = useState<IHistory | null>(null);

    useEffect(() => {
        loadHistory();
    }, []);

    const handleChooseOption = useCallback(async (option: 'share' | 'delete') => {
        sheetRef.current?.close();
        if (!selectedHistory) return;
        await waitForSeconds(1);

        switch (option) {
            case 'share':
                shareQRCode(selectedHistory.id);
                break;
            case 'delete':
                removeQRCode(selectedHistory.id);
                break;
        }
    }, [selectedHistory]);

    console.log(history.length)

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
                                setSelectedHistory(item);
                                sheetRef.current?.open();
                            }}
                        />
                    )}
                    contentContainerStyle={styles.contentContainer}
                    scrollEventThrottle={16}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    ListEmptyComponent={<EmptyHistoryPage theme={theme} />}
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
                sheetHeight={moderateScale(120)}
            >
                <HistoryOptions theme={theme} onChooseOption={handleChooseOption} />
            </BaseBottomSheet>
        </ThemedView>
    );
};

export default History;
