import { QRType } from "./qr.types";

export interface IHistory {
    type: QRType;
    id: string;
    base64: string;
    content: string;
    data: string;
    timestamp: number;
}