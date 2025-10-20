import { useCallback, useMemo } from 'react';
import { Linking, Platform, ToastAndroid } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import { parseQrValue, ParsedQr } from '$utils/qr-scanner-helpers';
import { showToastMessage } from '$utils/helpers';
import { QR_TYPES } from '$constants/app.constants';
import { Type } from 'lucide-react-native';
import RNShare from 'react-native-share';
import { QR_ACTIONS } from '$constants/qr-actions.constants';
import Clipboard from '@react-native-clipboard/clipboard';
import { requestLocationPermissions } from '$utils/permissions';

export const useQRHandler = (rawValue: string) => {
    const parsed: ParsedQr = useMemo(() => parseQrValue(rawValue), [rawValue]);

    const actionLabel = useMemo(() => {
        switch (parsed.type) {
            case 'url': return 'Open Link';
            case 'email': return 'Send Email';
            case 'phone': return 'Call Number';
            case 'sms': return 'Send SMS';
            case 'location': return 'Open Map';
            case 'wifi': return 'Connect WiFi';
            case 'contact': return 'Save Contact';
            case 'event': return 'Add Event';
            default: return 'Copy Text';
        }
    }, [parsed.type]);

    const handleAction = useCallback(async (action: string) => {
        try {
            switch (action) {

                case 'show-map':
                    await Linking.openURL(`geo:${parsed.data.lat},${parsed.data.lng}?q=${parsed.data.lat},${parsed.data.lng}(${parsed.data.label || 'Location'})`);
                    break;
                case 'get-directions':
                    await Linking.openURL(`google.navigation:q=${parsed.data.lat},${parsed.data.lng}&mode=d`);
                    break;
                case 'web-search':
                    await Linking.openURL(`https://www.google.com/search?q=${parsed.data.query}`);
                    break;
                case 'open-link':
                    await Linking.openURL(parsed.data.url);
                    break;
                case 'send-mail':
                    await Linking.openURL(`mailto:${parsed.data.to}?subject=${parsed.data.subject || ''}&body=${parsed.data.body || ''}`);
                    break;
                case 'connect':
                    if (Platform.OS === 'android') {
                        await requestLocationPermissions();
                        await WifiManager.connectToProtectedSSID(
                            parsed.data.ssid,
                            parsed.data.password,
                            parsed.data.encryption?.toLowerCase() === 'wep',
                            parsed.data.hidden
                        );
                    } else {
                        showToastMessage({ message: `Manual Connection : SSID: ${parsed.data.ssid}\nPassword: ${parsed.data.password}`, type: 'info' });
                    }
                    break;
                case 'copy-password':
                    Clipboard.setString(parsed.data.password || '-');
                    ToastAndroid.show('Password Copied', ToastAndroid.SHORT);
                    break;
                case 'call':
                    await Linking.openURL(`tel:${parsed.data.number}`);
                    break;
                case 'send-sms':
                    await Linking.openURL(`sms:${parsed.data.to}?body=${parsed.data.message || 'Hello'}`);
                    break;
                default:
                    Clipboard.setString(parsed.raw);
                    break;
            }
        } catch (err: any) {
            console.error('QR Action Error:', err);
            showToastMessage({
                message: 'Failed to process QR code',
                type: 'danger'
            });
        }
    }, [parsed]);

    const handleShare = useCallback(async () => {
        try {
            await RNShare.open({ title: parsed.type, message: parsed.raw });
        } catch (err: any) {
            console.error("ERROR", err);
        }
    }, [parsed]);

    const handleCopy = useCallback(() => {
        try {
            Clipboard.setString(parsed.raw);
            ToastAndroid.show('Text Copied', ToastAndroid.SHORT);
        } catch (err: any) {
            console.error("ERROR", err);
        }
    }, [parsed]);

    const IconComponent = useMemo(() => {
        const match = QR_TYPES.find((qrType) => qrType.type === parsed.type);
        return match?.icon || Type;
    }, [parsed.type]);

    const qrActions = useMemo(() => {
        return QR_ACTIONS.filter((action) => action.type === parsed.type);
    }, [QR_ACTIONS, parsed.type]);

    return { parsed, actionLabel, handleAction, handleShare, handleCopy, IconComponent, qrActions };
};


