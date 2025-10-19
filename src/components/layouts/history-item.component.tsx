import { StyleSheet, View } from 'react-native'
import React, { memo, useCallback, useMemo } from 'react'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { ITheme } from '$types/common.types';
import { COLORS } from '$constants/colors.constants';
import { IconButton, ThemeText } from '$components/ui';
import { EllipsisVertical } from 'lucide-react-native';
import { QR_TYPES } from '$constants/app.constants';
import { IHistory } from '$types/history.types';
import { formatDate } from '$utils/helpers';

interface HistoryItemProps {
    qrHistory: IHistory;
    theme: ITheme;
    onOptionsPress: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ theme, qrHistory, onOptionsPress }) => {

    const styles = useMemo(() => styling(theme), [theme]);

    const Icon = useCallback(() => {
        const QRTypeIcon = QR_TYPES.find((qrType) => qrType.type === qrHistory.type)?.icon;
        return (
            <IconButton onPress={() => { }} style={styles.icon}>
                <QRTypeIcon color={COLORS[theme].primary} width={moderateScale(25)} height={moderateScale(25)} />
            </IconButton>
        )
    }, [QR_TYPES]);

    return (
        <>
            <View style={styles.container}>
                <Icon />
                <View style={{ flex: 1 }}>
                    <ThemeText theme={theme} numberOfLines={1} style={styles.title}>{qrHistory.content}</ThemeText>
                    <ThemeText theme={theme} numberOfLines={1} style={styles.date}>{formatDate(qrHistory.timestamp)}</ThemeText>
                </View>
                <IconButton onPress={() => onOptionsPress()} style={styles.icon}>
                    <EllipsisVertical color={COLORS[theme].text} width={moderateScale(25)} height={moderateScale(25)} />
                </IconButton>
            </View>
        </>
    )
}

export default memo(HistoryItem);

const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: COLORS[theme].surface,
        gap: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(5),
        borderRadius: moderateScale(10),
        borderWidth: moderateScale(1),
        borderColor: COLORS[theme].border,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },
    icon: {
        height: moderateScale(50),
        paddingHorizontal: moderateScale(5),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: EFontSize.LG,
        fontFamily: EFonts.MEDIUM,
        color: COLORS[theme].text
    },
    date: {
        fontSize: EFontSize.SM,
        fontFamily: EFonts.REGULAR,
        color: COLORS[theme].text4
    }
})