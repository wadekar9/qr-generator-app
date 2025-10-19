import { useState, useMemo, useCallback } from 'react';
import { getData, storeData } from '$utils/storage';
import { EStorageKeys } from '$constants/storage.constants';
import { IHistory } from '$types/history.types';

export const useHistory = () => {

    const [history, setHistory] = useState<IHistory[]>([]);
    const [loading, setLoading] = useState(false);

    const loadHistory = useCallback(async () => {
        try {
            setLoading(true);
            const savedHistory = await getData(EStorageKeys.QR_HISTORY);
            if (savedHistory) {
                const parsedHistory = JSON.parse(savedHistory);
                setHistory(parsedHistory.sort((a: IHistory, b: IHistory) => b.timestamp - a.timestamp));
            } else {
                setHistory([]);
            }
        } catch (error) {
            console.error('Error loading history:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const saveHistory = useCallback(async (newHistory: IHistory[]) => {
        if (!Array.isArray(newHistory) || newHistory.length > 1000) return;
        try {
            await storeData(EStorageKeys.QR_HISTORY, JSON.stringify(newHistory));
        } catch (error) {
            console.error('Error saving history:', error);
        }
    }, []);

    const addQRCode = useCallback((qrCode: Omit<IHistory, 'id'>) => {
        if (!qrCode?.data?.trim() || qrCode.data.length > 10000) return;
        const newQRCode: IHistory = {
            ...qrCode,
            id: Date.now().toString() + Math.random().toString(36).slice(2, 11),
        };

        const newHistory = [newQRCode, ...history];
        setHistory(newHistory);
        saveHistory(newHistory);
    }, [history, saveHistory]);

    const addScannedQR = useCallback((qrCode: Omit<IHistory, 'id'>) => {
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
        loadHistory,
        loading
    }), [history, addQRCode, addScannedQR, removeQRCode, clearHistory, loading, loadHistory]);
};