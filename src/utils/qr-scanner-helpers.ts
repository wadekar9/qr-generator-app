import { QRType } from "$types/qr.types";

export interface ParsedQr {
    type: QRType;
    raw: string;
    data: any;
}

export const parseQrValue = (value: string): ParsedQr => {
    const raw = value.trim();
    const lower = raw.toLowerCase();

    // --- URL ---
    if (
        lower.startsWith('http://') ||
        lower.startsWith('https://') ||
        lower.startsWith('wa.me/') ||
        lower.includes('wa.me/')
    ) {
        return { type: 'url', raw, data: { url: raw } };
    }

    // --- EMAIL ---
    if (lower.startsWith('mailto:')) {
        const content = raw.slice(7);
        const [emailPart, query] = content.split('?');
        const email = emailPart.trim();

        const params = new URLSearchParams(query);
        return {
            type: 'email',
            raw,
            data: {
                to: email,
                subject: params.get('subject') || '',
                body: params.get('body') || '',
            },
        };
    }

    // --- PHONE ---
    if (lower.startsWith('tel:')) {
        return { type: 'phone', raw, data: { number: raw.replace(/^tel:/i, '') } };
    }

    // --- SMS ---
    if (lower.startsWith('smsto:') || lower.startsWith('sms:')) {
        const cleaned = raw.replace(/^sms(to)?:/i, '');
        const [to, message] = cleaned.split(':');
        return { type: 'sms', raw, data: { to, message: message || '' } };
    }

    // --- GEO LOCATION ---
    if (lower.startsWith('geo:') || lower.startsWith('geo:')) {
        const geoRegex = /^geo:([-0-9.]+),([-0-9.]+)(?:\?q=(.*))?$/i;
        const match = raw.match(geoRegex);
        return {
            type: 'location',
            raw,
            data: match
                ? { lat: match[1], lng: match[2], label: match[3] || '' }
                : null,
        };
    }

    // --- WIFI ---
    if (lower.startsWith('wifi:')) {
        // Normalize missing trailing ;;
        const cleaned = raw.endsWith(';;') ? raw : raw + ';;';
        // Handle flexible order (S:, P:, T:, H:)
        const wifiRegex = /S:([^;]*);.*?T:([^;]*);.*?P:([^;]*);.*?H:([^;]*);/i;
        const match = cleaned.match(wifiRegex);
        const extract = (key: string) => {
            const reg = new RegExp(`${key}:([^;]*)`, 'i');
            const m = cleaned.match(reg);
            return m ? m[1] : '';
        };
        return {
            type: 'wifi',
            raw,
            data: {
                ssid: extract('S'),
                encryption: extract('T') || 'nopass',
                password: extract('P'),
                hidden: extract('H')?.toLowerCase() === 'true' || extract('H') === '1',
            },
        };
    }

    // --- VCARD / CONTACT ---
    if (lower.includes('begin:vcard')) {
        return { type: 'contact', raw, data: parseVCard(raw) };
    }

    // --- EVENT ---
    if (lower.includes('begin:vevent')) {
        return { type: 'event', raw, data: parseVEvent(raw) };
    }

    // --- DEFAULT: TEXT ---
    return { type: 'text', raw, data: { text: raw } };
};

// Helper: vCard parser
const parseVCard = (text: string) => {
    const getField = (key: string) => {
        const regex = new RegExp(`${key}:(.*)`, 'i');
        const match = text.match(regex);
        return match ? match[1].trim() : '';
    };
    return {
        name: getField('N') || getField('FN'),
        org: getField('ORG'),
        title: getField('TITLE'),
        phone: getField('TEL'),
        email: getField('EMAIL'),
        url: getField('URL'),
        address: getField('ADR'),
        note: getField('NOTE'),
    };
};

// Helper: Event (VEVENT) parser
const parseVEvent = (text: string) => {
    const getField = (key: string) => {
        const regex = new RegExp(`${key}:(.*)`, 'i');
        const match = text.match(regex);
        return match ? match[1].trim() : '';
    };
    return {
        organizer: getField('ORGANIZER'),
        start: getField('DTSTART'),
        end: getField('DTEND'),
        summary: getField('SUMMARY'),
        description: getField('DESCRIPTION'),
    };
};
