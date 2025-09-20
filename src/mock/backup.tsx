import React, { useState } from 'react';
import { TextInput, Button, Image, StyleSheet, Text, ScrollView, Platform, PermissionsAndroid, Alert, Switch } from 'react-native';
import { openPicker } from 'react-native-image-crop-picker';
import { generateQRCode } from './src/native/QRGenerator';
import BaseDropdown from './src/components/base-dropdown.ui';

const App: React.FC = () => {
    const [dataType, setDataType] = useState<string>('Url');
    const [value, setValue] = useState<string>('https://example.com');
    const [email, setEmail] = useState<string>('');
    const [copyTo, setCopyTo] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [lat, setLat] = useState<string>('0.0');
    const [lon, setLon] = useState<string>('0.0');
    const [url, setUrl] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [ssid, setSsid] = useState<string>('');
    const [psk, setPsk] = useState<string>('');
    const [hidden, setHidden] = useState<boolean>(false);
    const [authentication, setAuthentication] = useState<'WPA' | 'WEP' | 'NONE'>('WPA');
    const [user, setUser] = useState<string>('');
    const [eap, setEap] = useState<string>('');
    const [phase, setPhase] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [isMMS, setIsMMS] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>('');
    const [secondName, setSecondName] = useState<string>('');
    const [job, setJob] = useState<string>('');
    const [company, setCompany] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [website, setWebsite] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [videoId, setVideoId] = useState<string>('');
    const [uid, setUid] = useState<string>('');
    const [stamp, setStamp] = useState<string>('');
    const [organizer, setOrganizer] = useState<string>('');
    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [appPackage, setAppPackage] = useState<string>('');
    const [padding, setPadding] = useState<string>('0.125');
    const [errorCorrection, setErrorCorrection] = useState<'Low' | 'Medium' | 'Quartile' | 'High'>('High');
    const [logoBase64, setLogoBase64] = useState<string | null>(null);
    const [logoSize, setLogoSize] = useState<string>('0.25');
    const [logoPadding, setLogoPadding] = useState<string>('0.2');
    const [logoShape, setLogoShape] = useState<'Circle' | 'Square' | 'Default'>('Circle');
    const [bgBase64, setBgBase64] = useState<string | null>(null);
    const [bgColor, setBgColor] = useState<string>('#FFFFFF');
    const [darkColor, setDarkColor] = useState<string>('#000000');
    const [ballColorType, setBallColorType] = useState<'Solid' | 'LinearGradient' | 'RadialGradient' | 'SweepGradient'>('Solid');
    const [ballColor, setBallColor] = useState<string>('#345288');
    const [frameColorType, setFrameColorType] = useState<'Solid' | 'LinearGradient' | 'RadialGradient' | 'SweepGradient'>('LinearGradient');
    const [frameColor1, setFrameColor1] = useState<string>('#FF0000');
    const [frameColor2, setFrameColor2] = useState<string>('#0000FF');
    const [frameOrientation, setFrameOrientation] = useState<'Horizontal' | 'Vertical' | 'LeftDiagonal' | 'RightDiagonal'>('LeftDiagonal');
    const [pixelShape, setPixelShape] = useState<'RoundCorners' | 'Circle' | 'Default'>('RoundCorners');
    const [pixelCorner, setPixelCorner] = useState<string>('0.5');
    const [ballShape, setBallShape] = useState<'RoundCorners' | 'Circle' | 'Default'>('RoundCorners');
    const [ballCorner, setBallCorner] = useState<string>('0.25');
    const [frameShape, setFrameShape] = useState<'RoundCorners' | 'Circle' | 'Default'>('RoundCorners');
    const [frameCorner, setFrameCorner] = useState<string>('0.25');
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const requestStoragePermission = async (): Promise<boolean> => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                ]);
                return (
                    granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED ||
                    granted['android.permission.READ_MEDIA_IMAGES'] === PermissionsAndroid.RESULTS.GRANTED
                );
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    const pickImage = async (setImage: (base64: string | null) => void) => {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Storage permission is required to select images.');
            return;
        }

        try {
            const response = await openPicker({
                mediaType: 'photo',
                includeBase64: true,
                cropping: true,
                width: 512,
                height: 512,
                compressImageQuality: 0.8,
            });
            if (response.data) {
                setImage(response.data);
            } else {
                Alert.alert('Error', 'No image data returned.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Image Picker Error', (error as Error).message || 'Failed to pick image');
        }
    };

    const isValidHex = (color: string): boolean => /^#[0-9A-F]{6}$/i.test(color);

    const handleGenerateQR = async () => {
        try {
            setIsLoading(true);
            // Validate inputs
            if (!isValidHex(darkColor) || !isValidHex(bgColor) || !isValidHex(ballColor) ||
                !isValidHex(frameColor1) || !isValidHex(frameColor2)) {
                throw new Error('Invalid hex color format. Use #RRGGBB format.');
            }
            if (isNaN(parseFloat(padding)) || isNaN(parseFloat(pixelCorner)) ||
                isNaN(parseFloat(ballCorner)) || isNaN(parseFloat(frameCorner)) ||
                isNaN(parseFloat(logoSize)) || isNaN(parseFloat(logoPadding))) {
                throw new Error('Invalid numeric input for padding, corners, or logo settings.');
            }

            // Construct QR data
            const qrData: any = { type: dataType };
            switch (dataType) {
                case 'Url':
                case 'Text':
                case 'Phone':
                    if (!value) throw new Error('Value is required.');
                    qrData[dataType === 'Phone' ? 'phoneNumber' : 'value'] = value;
                    break;
                case 'Email':
                    if (!email) throw new Error('Email is required.');
                    qrData.email = email;
                    qrData.copyTo = copyTo || null;
                    qrData.subject = subject || null;
                    qrData.body = body || null;
                    break;
                case 'GeoPos':
                    if (isNaN(parseFloat(lat)) || isNaN(parseFloat(lon))) {
                        throw new Error('Valid latitude and longitude are required.');
                    }
                    qrData.lat = parseFloat(lat);
                    qrData.lon = parseFloat(lon);
                    break;
                case 'Bookmark':
                    if (!url) throw new Error('URL is required.');
                    qrData.url = url;
                    qrData.title = title || '';
                    break;
                case 'WiFi':
                    if (!ssid) throw new Error('SSID is required.');
                    qrData.ssid = ssid;
                    qrData.psk = psk || null;
                    qrData.hidden = hidden;
                    qrData.authentication = authentication;
                    break;
                case 'EnterpriseWifi':
                    if (!ssid) throw new Error('SSID is required.');
                    qrData.ssid = ssid;
                    qrData.psk = psk || null;
                    qrData.user = user || null;
                    qrData.eap = eap || null;
                    qrData.phase = phase || null;
                    qrData.hidden = hidden;
                    break;
                case 'SMS':
                    if (!phoneNumber) throw new Error('Phone number is required.');
                    qrData.phoneNumber = phoneNumber;
                    qrData.subject = subject || '';
                    qrData.isMMS = isMMS;
                    break;
                case 'BizCard':
                    if (!firstName) throw new Error('First name is required.');
                    qrData.firstName = firstName;
                    qrData.secondName = secondName || null;
                    qrData.job = job || null;
                    qrData.company = company || null;
                    qrData.address = address || null;
                    qrData.phone = phoneNumber || null;
                    qrData.email = email || null;
                    break;
                case 'VCard':
                case 'MeCard':
                    if (!name) throw new Error('Name is required.');
                    qrData.name = name;
                    qrData.company = company || null;
                    qrData.title = title || null;
                    qrData.phoneNumber = phoneNumber || null;
                    qrData.email = email || null;
                    qrData.address = address || null;
                    qrData.website = website || null;
                    qrData.note = note || null;
                    break;
                case 'YouTube':
                    if (!videoId) throw new Error('Video ID is required.');
                    qrData.videoId = videoId;
                    break;
                case 'Event':
                    if (!summary) throw new Error('Summary is required.');
                    qrData.uid = uid || null;
                    qrData.stamp = stamp || null;
                    qrData.organizer = organizer || null;
                    qrData.start = start || null;
                    qrData.end = end || null;
                    qrData.summary = summary;
                    break;
                case 'GooglePlay':
                    if (!appPackage) throw new Error('App package is required.');
                    qrData.appPackage = appPackage;
                    break;
            }

            const options: any = {
                padding: parseFloat(padding),
                errorCorrectionLevel: errorCorrection,
                logo: {
                    base64: logoBase64,
                    size: parseFloat(logoSize),
                    padding: parseFloat(logoPadding),
                    shape: logoShape,
                },
                background: {
                    base64: bgBase64,
                    color: bgColor,
                },
                colors: {
                    dark: { type: 'Solid', color: darkColor },
                    ball: { type: ballColorType, color: ballColor },
                    frame: {
                        type: frameColorType,
                        colors: [
                            { position: 0, color: frameColor1 },
                            { position: 1, color: frameColor2 },
                        ],
                        orientation: frameOrientation,
                    },
                },
                shapes: {
                    darkPixel: { type: pixelShape, corner: parseFloat(pixelCorner) },
                    ball: { type: ballShape, corner: parseFloat(ballCorner) },
                    frame: { type: frameShape, corner: parseFloat(frameCorner) },
                },
            };
            const qrImage = await generateQRCode(qrData, options);
            setQrCode(qrImage);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Data Type</Text>
            <BaseDropdown
                label="Data Type"
                data={[
                    { id: 'Url', name: 'URL' },
                    { id: 'Text', name: 'Text' },
                    { id: 'Email', name: 'Email' },
                    { id: 'Phone', name: 'Phone' },
                    { id: 'GeoPos', name: 'GeoPos' },
                    { id: 'Bookmark', name: 'Bookmark' },
                    { id: 'WiFi', name: 'WiFi' },
                    { id: 'EnterpriseWifi', name: 'Enterprise WiFi' },
                    { id: 'SMS', name: 'SMS/MMS' },
                    { id: 'BizCard', name: 'BizCard' },
                    { id: 'VCard', name: 'VCard' },
                    { id: 'MeCard', name: 'MeCard' },
                    { id: 'YouTube', name: 'YouTube' },
                    { id: 'Event', name: 'Event' },
                    { id: 'GooglePlay', name: 'Google Play' },
                ]}
                value={dataType}
                onValueChange={setDataType}
            />
            {dataType === 'Url' || dataType === 'Text' ? (
                <>
                    <Text style={styles.label}>Value</Text>
                    <TextInput style={styles.input} value={value} onChangeText={setValue} placeholder="Enter value" />
                </>
            ) : null}
            {dataType === 'Email' ? (
                <>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter email" />
                    <Text style={styles.label}>CC</Text>
                    <TextInput style={styles.input} value={copyTo} onChangeText={setCopyTo} placeholder="Enter CC email (optional)" />
                    <Text style={styles.label}>Subject</Text>
                    <TextInput style={styles.input} value={subject} onChangeText={setSubject} placeholder="Enter subject (optional)" />
                    <Text style={styles.label}>Body</Text>
                    <TextInput style={styles.input} value={body} onChangeText={setBody} placeholder="Enter body (optional)" />
                </>
            ) : null}
            {dataType === 'GeoPos' ? (
                <>
                    <Text style={styles.label}>Latitude</Text>
                    <TextInput style={styles.input} value={lat} onChangeText={setLat} placeholder="e.g., 37.7749" />
                    <Text style={styles.label}>Longitude</Text>
                    <TextInput style={styles.input} value={lon} onChangeText={setLon} placeholder="e.g., -122.4194" />
                </>
            ) : null}
            {dataType === 'Bookmark' ? (
                <>
                    <Text style={styles.label}>URL</Text>
                    <TextInput style={styles.input} value={url} onChangeText={setUrl} placeholder="Enter URL" />
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Enter title (optional)" />
                </>
            ) : null}
            {dataType === 'WiFi' ? (
                <>
                    <Text style={styles.label}>SSID</Text>
                    <TextInput style={styles.input} value={ssid} onChangeText={setSsid} placeholder="Enter SSID" />
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input} value={psk} onChangeText={setPsk} placeholder="Enter password (optional)" />
                    <Text style={styles.label}>Hidden</Text>
                    <Switch value={hidden} onValueChange={setHidden} />
                    <Text style={styles.label}>Authentication</Text>
                    <BaseDropdown
                        label="Authentication"
                        data={[
                            { id: 'WPA', name: 'WPA' },
                            { id: 'WEP', name: 'WEP' },
                            { id: 'NONE', name: 'None' },
                        ]}
                        value={authentication}
                        onValueChange={setAuthentication}
                    />
                </>
            ) : null}
            {dataType === 'EnterpriseWifi' ? (
                <>
                    <Text style={styles.label}>SSID</Text>
                    <TextInput style={styles.input} value={ssid} onChangeText={setSsid} placeholder="Enter SSID" />
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input} value={psk} onChangeText={setPsk} placeholder="Enter password (optional)" />
                    <Text style={styles.label}>User</Text>
                    <TextInput style={styles.input} value={user} onChangeText={setUser} placeholder="Enter user (optional)" />
                    <Text style={styles.label}>EAP Method</Text>
                    <TextInput style={styles.input} value={eap} onChangeText={setEap} placeholder="Enter EAP method (optional)" />
                    <Text style={styles.label}>Phase 2</Text>
                    <TextInput style={styles.input} value={phase} onChangeText={setPhase} placeholder="Enter Phase 2 (optional)" />
                    <Text style={styles.label}>Hidden</Text>
                    <Switch value={hidden} onValueChange={setHidden} />
                </>
            ) : null}
            {dataType === 'Phone' ? (
                <>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Enter phone number" />
                </>
            ) : null}
            {dataType === 'SMS' ? (
                <>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Enter phone number" />
                    <Text style={styles.label}>Subject</Text>
                    <TextInput style={styles.input} value={subject} onChangeText={setSubject} placeholder="Enter subject (optional)" />
                    <Text style={styles.label}>Is MMS</Text>
                    <Switch value={isMMS} onValueChange={setIsMMS} />
                </>
            ) : null}
            {dataType === 'BizCard' ? (
                <>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="Enter first name" />
                    <Text style={styles.label}>Second Name</Text>
                    <TextInput style={styles.input} value={secondName} onChangeText={setSecondName} placeholder="Enter second name (optional)" />
                    <Text style={styles.label}>Job</Text>
                    <TextInput style={styles.input} value={job} onChangeText={setJob} placeholder="Enter job (optional)" />
                    <Text style={styles.label}>Company</Text>
                    <TextInput style={styles.input} value={company} onChangeText={setCompany} placeholder="Enter company (optional)" />
                    <Text style={styles.label}>Address</Text>
                    <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Enter address (optional)" />
                    <Text style={styles.label}>Phone</Text>
                    <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Enter phone (optional)" />
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter email (optional)" />
                </>
            ) : null}
            {dataType === 'VCard' || dataType === 'MeCard' ? (
                <>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter name" />
                    {dataType === 'VCard' ? (
                        <>
                            <Text style={styles.label}>Company</Text>
                            <TextInput style={styles.input} value={company} onChangeText={setCompany} placeholder="Enter company (optional)" />
                            <Text style={styles.label}>Title</Text>
                            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Enter title (optional)" />
                            <Text style={styles.label}>Website</Text>
                            <TextInput style={styles.input} value={website} onChangeText={setWebsite} placeholder="Enter website (optional)" />
                            <Text style={styles.label}>Note</Text>
                            <TextInput style={styles.input} value={note} onChangeText={setNote} placeholder="Enter note (optional)" />
                        </>
                    ) : null}
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Enter phone number (optional)" />
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter email (optional)" />
                    <Text style={styles.label}>Address</Text>
                    <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Enter address (optional)" />
                </>
            ) : null}
            {dataType === 'YouTube' ? (
                <>
                    <Text style={styles.label}>Video ID</Text>
                    <TextInput style={styles.input} value={videoId} onChangeText={setVideoId} placeholder="Enter YouTube video ID" />
                </>
            ) : null}
            {dataType === 'Event' ? (
                <>
                    <Text style={styles.label}>Summary</Text>
                    <TextInput style={styles.input} value={summary} onChangeText={setSummary} placeholder="Enter event summary" />
                    <Text style={styles.label}>UID</Text>
                    <TextInput style={styles.input} value={uid} onChangeText={setUid} placeholder="Enter UID (optional)" />
                    <Text style={styles.label}>Timestamp</Text>
                    <TextInput style={styles.input} value={stamp} onChangeText={setStamp} placeholder="Enter timestamp (optional)" />
                    <Text style={styles.label}>Organizer</Text>
                    <TextInput style={styles.input} value={organizer} onChangeText={setOrganizer} placeholder="Enter organizer (optional)" />
                    <Text style={styles.label}>Start Time</Text>
                    <TextInput style={styles.input} value={start} onChangeText={setStart} placeholder="Enter start time (optional)" />
                    <Text style={styles.label}>End Time</Text>
                    <TextInput style={styles.input} value={end} onChangeText={setEnd} placeholder="Enter end time (optional)" />
                </>
            ) : null}
            {dataType === 'GooglePlay' ? (
                <>
                    <Text style={styles.label}>App Package</Text>
                    <TextInput style={styles.input} value={appPackage} onChangeText={setAppPackage} placeholder="Enter app package (e.g., com.example.app)" />
                </>
            ) : null}
            <Text style={styles.label}>Padding</Text>
            <TextInput style={styles.input} value={padding} onChangeText={setPadding} placeholder="e.g., 0.125" />
            <Text style={styles.label}>Error Correction Level</Text>
            <BaseDropdown
                label="Error Correction Level"
                data={[
                    { id: 'Low', name: 'Low' },
                    { id: 'Medium', name: 'Medium' },
                    { id: 'Quartile', name: 'Quartile' },
                    { id: 'High', name: 'High' },
                ]}
                value={errorCorrection}
                onValueChange={setErrorCorrection}
            />
            <Text style={styles.label}>Logo Image</Text>
            <Button title="Pick Logo Image" onPress={() => pickImage(setLogoBase64)} disabled={isLoading} />
            {logoBase64 && <Image source={{ uri: `data:image/png;base64,${logoBase64}` }} style={styles.previewImage} />}
            <Text style={styles.label}>Logo Size</Text>
            <TextInput style={styles.input} value={logoSize} onChangeText={setLogoSize} placeholder="e.g., 0.25" />
            <Text style={styles.label}>Logo Padding</Text>
            <TextInput style={styles.input} value={logoPadding} onChangeText={setLogoPadding} placeholder="e.g., 0.2" />
            <Text style={styles.label}>Logo Shape</Text>
            <BaseDropdown
                label="Logo Shape"
                data={[
                    { id: 'Circle', name: 'Circle' },
                    { id: 'Square', name: 'Square' },
                    { id: 'Default', name: 'Default' },
                ]}
                value={logoShape}
                onValueChange={setLogoShape}
            />
            <Text style={styles.label}>Background Image</Text>
            <Button title="Pick Background Image" onPress={() => pickImage(setBgBase64)} disabled={isLoading} />
            {bgBase64 && <Image source={{ uri: `data:image/png;base64,${bgBase64}` }} style={styles.previewImage} />}
            <Text style={styles.label}>Background Color</Text>
            <TextInput style={styles.input} value={bgColor} onChangeText={setBgColor} placeholder="e.g., #FFFFFF" />
            <Text style={styles.label}>Dark Pixel Color</Text>
            <TextInput style={styles.input} value={darkColor} onChangeText={setDarkColor} placeholder="e.g., #000000" />
            <Text style={styles.label}>Ball Color Type</Text>
            <BaseDropdown
                label="Ball Color Type"
                data={[
                    { id: 'Solid', name: 'Solid' },
                    { id: 'LinearGradient', name: 'LinearGradient' },
                    { id: 'RadialGradient', name: 'RadialGradient' },
                    { id: 'SweepGradient', name: 'SweepGradient' },
                ]}
                value={ballColorType}
                onValueChange={setBallColorType}
            />
            <Text style={styles.label}>Ball Color</Text>
            <TextInput style={styles.input} value={ballColor} onChangeText={setBallColor} placeholder="e.g., #345288" />
            <Text style={styles.label}>Frame Color Type</Text>
            <BaseDropdown
                label="Frame Color Type"
                data={[
                    { id: 'Solid', name: 'Solid' },
                    { id: 'LinearGradient', name: 'LinearGradient' },
                    { id: 'RadialGradient', name: 'RadialGradient' },
                    { id: 'SweepGradient', name: 'SweepGradient' },
                ]}
                value={frameColorType}
                onValueChange={setFrameColorType}
            />
            <Text style={styles.label}>Frame Color 1</Text>
            <TextInput style={styles.input} value={frameColor1} onChangeText={setFrameColor1} placeholder="e.g., #FF0000" />
            <Text style={styles.label}>Frame Color 2</Text>
            <TextInput style={styles.input} value={frameColor2} onChangeText={setFrameColor2} placeholder="e.g., #0000FF" />
            <Text style={styles.label}>Frame Gradient Orientation</Text>
            <BaseDropdown
                label="Frame Gradient Orientation"
                data={[
                    { id: 'Horizontal', name: 'Horizontal' },
                    { id: 'Vertical', name: 'Vertical' },
                    { id: 'LeftDiagonal', name: 'LeftDiagonal' },
                    { id: 'RightDiagonal', name: 'RightDiagonal' },
                ]}
                value={frameOrientation}
                onValueChange={setFrameOrientation}
            />
            <Text style={styles.label}>Dark Pixel Shape</Text>
            <BaseDropdown
                label="Dark Pixel Shape"
                data={[
                    { id: 'RoundCorners', name: 'RoundCorners' },
                    { id: 'Circle', name: 'Circle' },
                    { id: 'Default', name: 'Default' },
                ]}
                value={pixelShape}
                onValueChange={setPixelShape}
            />
            <Text style={styles.label}>Dark Pixel Corner</Text>
            <TextInput style={styles.input} value={pixelCorner} onChangeText={setPixelCorner} placeholder="e.g., 0.5" />
            <Text style={styles.label}>Ball Shape</Text>
            <BaseDropdown
                label="Ball Shape"
                data={[
                    { id: 'RoundCorners', name: 'RoundCorners' },
                    { id: 'Circle', name: 'Circle' },
                    { id: 'Default', name: 'Default' },
                ]}
                value={ballShape}
                onValueChange={setBallShape}
            />
            <Text style={styles.label}>Ball Corner</Text>
            <TextInput style={styles.input} value={ballCorner} onChangeText={setBallCorner} placeholder="e.g., 0.25" />
            <Text style={styles.label}>Frame Shape</Text>
            <BaseDropdown
                label="Frame Shape"
                data={[
                    { id: 'RoundCorners', name: 'RoundCorners' },
                    { id: 'Circle', name: 'Circle' },
                    { id: 'Default', name: 'Default' },
                ]}
                value={frameShape}
                onValueChange={setFrameShape}
            />
            <Text style={styles.label}>Frame Corner</Text>
            <TextInput style={styles.input} value={frameCorner} onChangeText={setFrameCorner} placeholder="e.g., 0.25" />
            <Button title="Generate QR Code" onPress={handleGenerateQR} disabled={isLoading} />
            {isLoading && <Text style={styles.loading}>Generating QR Code...</Text>}
            {qrCode && <Image source={{ uri: qrCode }} style={styles.qrImage} />}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
    input: { width: '100%', padding: 10, borderWidth: 1, borderColor: '#ccc', marginVertical: 5 },
    previewImage: { width: 100, height: 100, marginVertical: 10, alignSelf: 'center' },
    qrImage: { width: 200, height: 200, marginTop: 20, alignSelf: 'center' },
    loading: { textAlign: 'center', marginTop: 10, color: '#666' },
});

export default App;