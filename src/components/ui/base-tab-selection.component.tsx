import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import IconButton from './icon-button.component';
import ThemeText from './theme-text.component';
import { ITheme } from '$types/common.types';
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';

interface BaseTabSelectionProps {
    theme: ITheme;
    tabs: string[];
    selectedTab: string;
    onTabSelect: (tab: string) => void;
}

const BaseTabSelection = ({ theme, tabs, selectedTab, onTabSelect }: BaseTabSelectionProps) => {

    const styles = styling(theme);

    return (
        <View style={styles.container}>
            {tabs.map((tab, idx) => (
                <IconButton
                    key={`${idx}`}
                    onPress={() => onTabSelect(tab)}
                    style={[styles.tab, selectedTab === tab && styles.selectedTab]}
                >
                    <ThemeText theme={theme} style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</ThemeText>
                </IconButton>
            ))}
        </View>
    )
}

export default memo(BaseTabSelection);

const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        height: moderateScale(40),
        width: '100%',
        borderWidth: moderateScale(1.5),
        borderColor: COLORS[theme].border,
        borderRadius: moderateScale(10)
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    selectedTab: {
        backgroundColor: COLORS[theme].primary,
    },
    tabText: {
        fontFamily: EFonts.SEMI_BOLD,
        fontSize: EFontSize.BASE,
        color: COLORS[theme].text,
        textAlign: 'center'
    },
    activeTabText: {
        color: COLORS[theme].white
    }
})