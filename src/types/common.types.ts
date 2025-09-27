export type ITheme = 'dark' | 'light';
export type IBaseTheme = 'default' | 'dark' | 'light';

export interface AppThemeContextProps {
    currentTheme: ITheme;
    baseTheme: IBaseTheme;
    changeTheme: (theme: ITheme) => void;
}

export interface IMediaFile {
    name: string;
    type: string;
    uri: string;
    base64?: string;
}

export interface BaseSheetModalRef {
    open: () => void;
    close: () => void;
}

export interface BaseQRInputPageRef {
    onPressSubmit: () => void;
}

export interface BaseQRInputPageProps {
    theme: ITheme;
}