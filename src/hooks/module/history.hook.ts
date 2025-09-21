import { useState, useEffect, useMemo, useCallback } from 'react';
import { QRHistoryItem } from '$types/qr.types';
import { getData, storeData } from '$utils/storage';
import { EStorageKeys } from '$constants/storage.constants';

export const useHistory = () => {

    const [history, setHistory] = useState<QRHistoryItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const loadHistory = useCallback(async () => {
        try {
            const savedHistory = await getData(EStorageKeys.QR_HISTORY);
            if (savedHistory) {
                const parsedHistory = JSON.parse(savedHistory);
                setHistory(parsedHistory.sort((a: QRHistoryItem, b: QRHistoryItem) => b.timestamp - a.timestamp));
            }
        } catch (error) {
            console.error('Error loading history:', error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    const saveHistory = useCallback(async (newHistory: QRHistoryItem[]) => {
        if (!Array.isArray(newHistory) || newHistory.length > 1000) return;
        try {
            storeData(EStorageKeys.QR_HISTORY, JSON.stringify(newHistory));
        } catch (error) {
            console.error('Error saving history:', error);
        }
    }, []);

    const addQRCode = useCallback((qrCode: Omit<QRHistoryItem, 'id'>) => {
        if (!qrCode?.content?.trim() || qrCode.content.length > 10000) return;
        const newQRCode: QRHistoryItem = {
            ...qrCode,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        };

        const newHistory = [newQRCode, ...history];
        setHistory(newHistory);
        saveHistory(newHistory);
    }, [history, saveHistory]);

    const addScannedQR = useCallback((qrCode: Omit<QRHistoryItem, 'id'>) => {
        addQRCode(qrCode);
    }, [addQRCode]);

    const removeQRCode = useCallback((id: string) => {
        const newHistory = history.filter(item => item.id !== id);
        setHistory(newHistory);
        saveHistory(newHistory);
    }, [history, saveHistory]);

    const clearHistory = useCallback(() => {
        setHistory([]);
        saveHistory([]);
    }, [saveHistory]);

    return useMemo(() => ({
        history,
        addQRCode,
        addScannedQR,
        removeQRCode,
        clearHistory,
        isLoaded,
    }), [history, addQRCode, addScannedQR, removeQRCode, clearHistory, isLoaded]);
};