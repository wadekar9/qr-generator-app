import { WhatsApp } from '$assets/icons';
import { QRType } from '$types/qr.types';
import {
    Globe,
    Mail,
    Wifi,
    Phone,
    MessageSquare,
    User,
    MapPin,
    Calendar,
    Hash,
    Palette,
    Shapes,
    Focus,
    Frame,
    Settings
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

export const QR_STYLING_OPTIONS = [
    { label: 'Color', icon: Palette },
    { label: 'Shape', icon: Shapes },
    { label: 'Logo', icon: Focus },
    { label: 'Frame', icon: Frame },
    { label: 'Settings', icon: Settings },
];

// QR Color Options
export const PRIMARY_COLORS = ['#000000', '#EF4444', '#3B82F6', '#2BC55E', '#EAB407', '#9333EA', '#F97316', '#EC499A', '#6366F1'];
export const BACKGROUND_COLORS = ['#FFFFFF', '#E5E7EB', '#FEE2E3', '#DBEBFE', '#DDFCE7', '#FEF9C4', '#F3E9FF', '#C2C2C2', '#B1B5B9'];