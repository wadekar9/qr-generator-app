import { StyleSheet } from 'react-native';
import { ITheme } from '$types/common.types';
import { DEVICE_WIDTH, EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';

export const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1
    },
    upperBlock: {
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    upperContent: {
        alignItems: 'center',
    },
    upperTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        textAlign: 'center',
    },
    upperSubtitle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        opacity: 0.9,
        marginBottom: 8,
    },
    rangeText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        opacity: 0.7,
        marginBottom: 5,
    },
    scrollIndicator: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        opacity: 0.6,
    },
    lowerBlock: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    // NEW: Handle container for draggable functionality
    handleContainer: {
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.02)', // Subtle background to show touch area
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        marginBottom: 5,
    },
    // NEW: Handle hint text
    handleHint: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        fontWeight: '500',
    },
    lowerContent: {
        flex: 1,
        flexGrow: 1,
    },
    lowerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 5,
    },
    lowerSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 5,
    },
    instruction: {
        fontSize: 13,
        color: '#888',
        textAlign: 'center',
        marginBottom: 15,
        fontStyle: 'italic',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: moderateScale(20),
        gap: moderateScale(25),
    },
    contentItem: {
        padding: 20,
        margin: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    contentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    contentDescription: {
        fontSize: 14,
        color: '#666',
    },
    lowerSectionHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: moderateScale(5),
        borderBottomWidth: moderateScale(1),
        borderBottomColor: COLORS[theme].border
    },
    tabSection: {
        flex: 1,
        paddingVertical: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        gap: moderateScale(3),
    },
    tabSectionText: {
        fontSize: EFontSize.SM,
        fontFamily: EFonts.MEDIUM,
        color: COLORS[theme].text1
    },
    tabSectionTextActive: {
        fontFamily: EFonts.SEMI_BOLD,
        color: COLORS[theme].primary
    },
    tabIndicatorWrapper: {
        width: Math.round(DEVICE_WIDTH / 5),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'absolute',
        paddingHorizontal: moderateScale(5)
    },
    tabIndicator: {
        opacity: 0.2,
        backgroundColor: COLORS[theme].primary,
        borderRadius: moderateScale(10),
        width: '100%',
        height: '100%',
    }
});