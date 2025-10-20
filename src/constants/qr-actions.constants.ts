import { Copy, ExternalLink, Globe, Mail, MapPin, MessageSquareText, Phone, Share2, Waypoints, Wifi } from "lucide-react-native";

export const QR_ACTIONS = [
    {
        label: 'Show Map',
        icon: MapPin,
        type: 'location',
        action: 'show-map'
    },
    {
        label: 'Get Directions',
        icon: Waypoints,
        type: 'location',
        action: 'get-directions'
    },
    {
        label: 'Web Search',
        icon: Globe,
        type: 'text',
        action: 'web-search'
    },
    {
        label: 'Open',
        icon: ExternalLink,
        type: 'url',
        action: 'open-link'
    },
    {
        label: 'Send Mail',
        icon: Mail,
        type: 'email',
        action: 'send-mail'
    },
    {
        label: 'Connect',
        icon: Wifi,
        type: 'wifi',
        action: 'connect'
    },
    {
        label: 'Copy Password',
        icon: Copy,
        type: 'wifi',
        action: 'copy-password'
    },
    {
        label: 'Call',
        icon: Phone,
        type: 'phone',
        action: 'call'
    },
    {
        label: 'Send SMS',
        icon: MessageSquareText,
        type: 'sms',
        action: 'send-sms'
    },
]

export const QR_ACTIONS_COMMON = [
    {
        label: 'Share',
        icon: Share2,
        type: 'common',
        action: 'share'
    },
    {
        label: 'Copy',
        icon: Copy,
        type: 'common',
        action: 'copy'
    },
]