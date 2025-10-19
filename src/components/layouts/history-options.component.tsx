import { StyleSheet, View } from 'react-native'
import React from 'react'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants'
import { ITheme } from '$types/common.types'
import { COLORS } from '$constants/colors.constants'
import { IconButton, ThemeText } from '$components/ui'
import { Share2, Trash2 } from 'lucide-react-native'

interface HistoryOptionsProps {
    theme: ITheme;
    onChooseOption: (option: 'share' | 'delete') => void;
}

const HistoryOptions: React.FC<HistoryOptionsProps> = ({ theme, onChooseOption }) => {

    const styles = styling(theme);

    return (
        <View style={styles.options}>
            {/* <IconButton style={styles.option} onPress={() => onChooseOption('edit')}>
                <View style={styles.icon}>
                    <SquarePen color={COLORS[theme].text} width={moderateScale(25)} height={moderateScale(25)} />
                </View>
                <ThemeText theme={theme}>Edit</ThemeText>
            </IconButton> */}
            <IconButton style={styles.option} onPress={() => onChooseOption('share')}>
                <View style={styles.icon}>
                    <Share2 color={COLORS[theme].text} width={moderateScale(25)} height={moderateScale(25)} />
                </View>
                <ThemeText theme={theme}>Share</ThemeText>
            </IconButton>
            <IconButton style={styles.option} onPress={() => onChooseOption('delete')}>
                <View style={styles.icon}>
                    <Trash2 color={COLORS[theme].text} width={moderateScale(25)} height={moderateScale(25)} />
                </View>
                <ThemeText theme={theme}>Delete</ThemeText>
            </IconButton>
        </View>
    )
}

export default React.memo(HistoryOptions);

const styling = (theme: ITheme) => StyleSheet.create({
    options: {
        gap: moderateScale(10),
        paddingVertical: moderateScale(10),
        height: '100%'
    },
    option: {
        width: '100%',
        height: moderateScale(50),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS[theme].background,
        borderBottomWidth: moderateScale(1),
        borderColor: COLORS[theme].border,
        paddingHorizontal: moderateScale(20),
        gap: moderateScale(10),
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
})