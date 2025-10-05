import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { RootStackScreenProps } from '$types/navigation.types'
import { EStackScreens } from '$constants/screen.constants'
import { ThemedView } from '$components/containers'
import { useAppTheme } from '$hooks/common'
import { styling } from './styles'
import { BackHeader } from '$components/navigation'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
    Extrapolation,
    withTiming,
} from 'react-native-reanimated';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '$constants/styles.constants'
import { QR_STYLING_OPTIONS } from '$constants/app.constants'
import { IconButton } from '$components/ui'
import { QRColorOptionsPage, QRLogoOptionsPage, QRShareOptionsPage } from '$components/pages'

// Constants for height constraints
const UPPER_MIN_HEIGHT = DEVICE_HEIGHT * 0.25;  // 30% minimum
const UPPER_MAX_HEIGHT = DEVICE_HEIGHT * 0.35;  // 50% maximum
const LOWER_MIN_HEIGHT = DEVICE_HEIGHT * 0.65;  // 50% minimum
const LOWER_MAX_HEIGHT = DEVICE_HEIGHT * 0.75;  // 70% maximum

// Maximum scroll distance for full animation (adjust for sensitivity)
const MAX_SCROLL_DISTANCE = 150;

const QRStyling: React.FC<RootStackScreenProps<EStackScreens.QR_STYLING>> = ({ navigation, route: { params } }) => {

    const { theme, colors } = useAppTheme();
    const styles = styling(theme);
    const scrollY = useSharedValue(0);
    const tabIndicatorX = useSharedValue(0);

    const [activeTab, setActiveTab] = React.useState<number>(0);

    // Real-time scroll handler - no springs, direct value mapping
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    // Real-time animated styles for upper block
    const tabIndicatorStyle = useAnimatedStyle(() => {
        return { transform: [{ translateX: tabIndicatorX.value }] };
    });

    // Real-time animated styles for upper block
    const upperBlockStyle = useAnimatedStyle(() => {
        // Clamp scroll value between 0 and MAX_SCROLL_DISTANCE
        const clampedScroll = Math.max(0, Math.min(scrollY.value, MAX_SCROLL_DISTANCE));

        // Direct interpolation for real-time response
        const height = interpolate(
            clampedScroll,
            [0, MAX_SCROLL_DISTANCE],
            [UPPER_MAX_HEIGHT, UPPER_MIN_HEIGHT],
            Extrapolation.CLAMP
        );

        return {
            height,
        };
    });

    // Real-time animated styles for lower block
    const lowerBlockStyle = useAnimatedStyle(() => {
        // Clamp scroll value between 0 and MAX_SCROLL_DISTANCE
        const clampedScroll = Math.max(0, Math.min(scrollY.value, MAX_SCROLL_DISTANCE));

        // Direct interpolation for real-time response
        const height = interpolate(
            clampedScroll,
            [0, MAX_SCROLL_DISTANCE],
            [LOWER_MIN_HEIGHT, LOWER_MAX_HEIGHT],
            Extrapolation.CLAMP
        );

        return {
            height,
        };
    });

    const onChooseTab = useCallback((idx: number) => {
        setActiveTab(idx);
        tabIndicatorX.value = withTiming(idx * Math.round(DEVICE_WIDTH / 5));
    }, [tabIndicatorX]);

    const QRStylingOption = useCallback(({ idx }: { idx: number }) => {

        const Icon = QR_STYLING_OPTIONS[idx].icon;

        return (
            <IconButton onPress={() => onChooseTab(idx)} style={styles.tabSection}>
                <Icon size={22} color={activeTab === idx ? colors.primary : colors.text1} />
                <Text style={[styles.tabSectionText, activeTab === idx && styles.tabSectionTextActive]}>{QR_STYLING_OPTIONS[idx].label}</Text>
            </IconButton>
        )
    }, [QR_STYLING_OPTIONS, colors, activeTab, onChooseTab])

    return (
        <ThemedView>
            <BackHeader theme={theme} label='QR Design' />
            <View style={styles.container}>

                {/* Upper Block */}
                <Animated.View style={[styles.upperBlock, upperBlockStyle]}>
                    <View style={styles.upperContent}>
                        <Text style={styles.upperTitle}>Upper Block</Text>
                        <Text style={styles.upperSubtitle}>
                            Real-time collapse on scroll down
                        </Text>
                        <Text style={styles.rangeText}>
                            Range: {Math.round(UPPER_MIN_HEIGHT)}px - {Math.round(UPPER_MAX_HEIGHT)}px
                        </Text>
                        <Text style={styles.scrollIndicator}>
                            Scroll Distance: 0-{MAX_SCROLL_DISTANCE}px
                        </Text>
                    </View>
                </Animated.View>

                {/* Lower Block with ScrollView */}
                <Animated.View style={[styles.lowerBlock, lowerBlockStyle]}>

                    <View style={styles.lowerContent}>
                        <View style={styles.lowerSectionHeader}>
                            {QR_STYLING_OPTIONS.map((_, idx) => <QRStylingOption key={idx} idx={idx} />)}
                            <Animated.View style={[styles.tabIndicatorWrapper, tabIndicatorStyle]}>
                                <View style={styles.tabIndicator} />
                            </Animated.View>
                        </View>

                        <View style={styles.container}>
                            <Animated.ScrollView
                                style={styles.scrollView}
                                contentContainerStyle={styles.scrollContent}
                                onScroll={scrollHandler}
                                scrollEventThrottle={1} // Maximum responsiveness
                                bounces={true}
                                showsVerticalScrollIndicator={true}
                            >
                                {/* <QRColorOptionsPage theme={theme} /> */}
                                {/* <QRShareOptionsPage theme={theme} /> */}
                                <QRLogoOptionsPage theme={theme} />
                            </Animated.ScrollView>
                        </View>
                    </View>
                </Animated.View>

            </View>
        </ThemedView>
    );
};

export default QRStyling;