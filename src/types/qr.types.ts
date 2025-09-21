export type QRType =
    | 'text'
    | 'url'
    | 'email'
    | 'wifi'
    | 'phone'
    | 'sms'
    | 'contact'
    | 'location'
    | 'event';

export type SocialQRType =
    | 'whatsapp'
    | 'telegram'
    | 'linkedin'
    | 'discord'
    | 'youtube'
    | 'instagram'
    | 'xtwitter';

export interface QRData {
    // Text
    text?: string;

    // URL
    url?: string;

    // Email
    email?: string;
    subject?: string;
    body?: string;

    // Wi-Fi
    ssid?: string;
    password?: string;
    encryption?: 'WPA' | 'WEP' | 'nopass';

    // Phone & SMS
    phone?: string;
    message?: string;

    // Contact
    firstName?: string;
    lastName?: string;

    // Location
    latitude?: string;
    longitude?: string;

    // Event
    title?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
}

export interface QRHistoryItem {
    id?: string;
    type: QRType;
    content: string;
    data: QRData;
    timestamp: number;
}