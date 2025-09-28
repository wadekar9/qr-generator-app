import { View } from 'react-native';
import React, { useMemo, useRef } from 'react';
import { RootStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';
import { KeyboardView, ThemedView } from '$components/containers';
import { BackHeader } from '$components/navigation';
import { useAppTheme } from '$hooks/common';
import { styling } from './styles';
import { BaseButton } from '$components/ui';
import {
    ContactQRInputPage,
    EmailQRInputPage,
    EventQRInputPage,
    LocationQRInputPage,
    PhoneQRInputPage,
    SMSQRInputPage,
    TextQRInputPage,
    URLQRInputPage,
    WhatsappQRInputPage,
    WifiQRInputPage
} from '$components/pages';
import { BaseQRInputPageRef } from '$types/common.types';

const QRGenerator: React.FC<RootStackScreenProps<EStackScreens.QR_GENERATOR>> = ({ route: { params } }) => {

    const { theme } = useAppTheme();
    const styles = styling(theme);

    const pageRef = useRef<BaseQRInputPageRef>(null);

    const REQUIRED_INPUT_PAGES = useMemo(() => {
        switch (params.type) {
            case 'text':
                return <TextQRInputPage ref={pageRef} theme={theme} />
            case 'url':
                return <URLQRInputPage ref={pageRef} theme={theme} />
            case 'email':
                return <EmailQRInputPage ref={pageRef} theme={theme} />
            case 'wifi':
                return <WifiQRInputPage ref={pageRef} theme={theme} />
            case 'phone':
                return <PhoneQRInputPage ref={pageRef} theme={theme} />
            case 'sms':
                return <SMSQRInputPage ref={pageRef} theme={theme} />
            case 'contact':
                return <ContactQRInputPage ref={pageRef} theme={theme} />
            case 'location':
                return <LocationQRInputPage ref={pageRef} theme={theme} />
            case 'event':
                return <EventQRInputPage ref={pageRef} theme={theme} />
            case 'whatsapp':
                return <WhatsappQRInputPage ref={pageRef} theme={theme} />
            default:
                return <TextQRInputPage ref={pageRef} theme={theme} />
        }
    }, [params.type])

    return (
        <ThemedView>
            <BackHeader theme={theme} label='Generate QR' />
            <View style={styles.container}>
                <KeyboardView
                    contentContainerStyle={styles.contentContainer}
                >
                    {REQUIRED_INPUT_PAGES}
                </KeyboardView>
            </View>
            <View style={styles.actionWrapper}>
                <BaseButton label='Submit' theme={theme} onPress={() => pageRef.current?.onPressSubmit()} />
            </View>
        </ThemedView>
    );
};

export default QRGenerator;
