import { WhatsApp, Google } from '$assets/icons';
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
    Palette,
    Shapes,
    Focus,
    Frame,
    Settings,
    Type
} from 'lucide-react-native';

export const APP_NAME = "QRScanCraft";
export const APP_VERSION = "1.0.0";
export const APP_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.thinkheadlabs.qrscancraft.qrcode.qrscanner.qrgenerator.qrdesigner";

export const QR_TYPES: { type: QRType; label: string; icon: any }[] = [
    { type: 'text', label: 'Text', icon: Type },
    { type: 'url', label: 'URL', icon: Globe },
    { type: 'email', label: 'Email', icon: Mail },
    { type: 'wifi', label: 'Wi-Fi', icon: Wifi },
    { type: 'phone', label: 'Phone', icon: Phone },
    { type: 'sms', label: 'SMS', icon: MessageSquare },
    { type: 'contact', label: 'Contact', icon: User },
    { type: 'location', label: 'Location', icon: MapPin },
    { type: 'event', label: 'Event', icon: Calendar },
    { type: 'whatsapp', label: 'WhatsApp', icon: WhatsApp },
    { type: 'google-review', label: 'Google', icon: Google },
];

export const WIFI_TYPES = [
    { label: 'None', value: 'NONE' },
    { label: 'WEP', value: 'WEP' },
    { label: 'WPA', value: 'WPA' },
    { label: 'WPA2', value: 'WPA2' }
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
