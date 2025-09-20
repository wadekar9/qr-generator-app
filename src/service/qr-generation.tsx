import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, Text } from 'react-native';
import { generateQRCode } from '../native/QRGenerator';

const App = () => {
    const [url, setUrl] = useState('https://example.com');
    const [qrCode, setQrCode] = useState<string | null>(null);

    const handleGenerateQR = async () => {
        try {
            const qrImage = await generateQRCode(url);
            setQrCode(qrImage);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={url}
                onChangeText={setUrl}
                placeholder="Enter URL"
            />
            <Text onPress={handleGenerateQR} style={styles.button}>
                Generate QR Code
            </Text>
            {qrCode && <Image source={{ uri: qrCode }} style={styles.qrImage} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    input: { width: '80%', padding: 10, borderWidth: 1, borderColor: '#ccc', marginBottom: 20 },
    button: { padding: 10, backgroundColor: '#007AFF', color: 'white', borderRadius: 5 },
    qrImage: { width: 200, height: 200, marginTop: 20 },
});

export default App;
