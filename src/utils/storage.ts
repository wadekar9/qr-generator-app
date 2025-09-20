import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Retrieve a value by key
 * @param key
 * @returns
 */
export async function getData(key: string): Promise<string | undefined> {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ?? undefined;
    } catch (error) {
        return undefined;
    }
}

/**
 * Store a key-value pair
 * @param key
 * @param value
 * @returns
 */
export async function storeData(key: string, value: any): Promise<boolean> {
    try {
        const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Remove a value by key
 * @param key
 * @returns
 */
export async function removeStore(key: string): Promise<boolean> {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Clear all storage
 */
export async function clearStorage(): Promise<void> {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        // Optionally log error
    }
}
