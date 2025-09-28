import { Discord, Instagram, LinkedIn, Telegram, WhatsApp, XTwitter, YouTube } from '$assets/icons';
import { QRType, SocialQRType } from '$types/qr.types';
import {
    Globe,
    Mail,
    Wifi,
    Phone,
    MessageSquare,
    User,
    MapPin,
    Calendar,
    Hash
} from 'lucide-react-native';

export const QR_TYPES: { type: QRType; label: string; icon: any }[] = [
    { type: 'text', label: 'Text', icon: Hash },
    { type: 'url', label: 'URL', icon: Globe },
    { type: 'email', label: 'Email', icon: Mail },
    { type: 'wifi', label: 'Wi-Fi', icon: Wifi },
    { type: 'phone', label: 'Phone', icon: Phone },
    { type: 'sms', label: 'SMS', icon: MessageSquare },
    { type: 'contact', label: 'Contact', icon: User },
    { type: 'location', label: 'Location', icon: MapPin },
    { type: 'event', label: 'Event', icon: Calendar },
    { type: 'whatsapp', label: 'WhatsApp', icon: WhatsApp },
];

export const SOCIAL_QR_TYPES: { type: SocialQRType; label: string; icon: any }[] = [
    { type: 'whatsapp', label: 'WhatsApp', icon: WhatsApp },
    { type: 'telegram', label: 'Telegram', icon: Telegram },
    { type: 'linkedin', label: 'LinkedIn', icon: LinkedIn },
    { type: 'discord', label: 'Discord', icon: Discord },
    { type: 'youtube', label: 'YouTube', icon: YouTube },
    { type: 'instagram', label: 'Instagram', icon: Instagram },
    { type: 'xtwitter', label: 'X/Twitter', icon: XTwitter },
];

export const WIFI_TYPES = [
    { label: 'None', value: 'none' },
    { label: 'WEP', value: 'wep' },
    { label: 'WPA', value: 'wpa' },
    { label: 'WPA2', value: 'wpa2' }
];

export const NAME_PREFIXES = [
    { label: 'Mr.', value: 'mr' },
    { label: 'Mrs.', value: 'mrs' },
    { label: 'Ms.', value: 'ms' },
    { label: 'Dr.', value: 'dr' },
    { label: 'Prof.', value: 'prof' },
];