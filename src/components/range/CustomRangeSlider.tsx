import React, { PureComponent } from "react";
import {
    Animated,
    Easing,
    I18nManager,
    Image,
    ImageSourcePropType,
    Platform,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
    PanResponder,
} from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

const isPadDevice =
    Platform.OS === "ios" &&
    !!(Platform as unknown as { isPad?: boolean }).isPad;

const TRACK_SIZE = 4;
const THUMB_SIZE = 20;

function makeThumbTouchRect(x: number, y: number, width: number, height: number) {
    return {
        x,
        y,
        width,
        height,
        containsPoint(px: number, py: number) {
            return px >= x && py >= y && px <= x + width && py <= y + height;
        },
    };
}

const DEFAULT_ANIMATION_CONFIGS = {
    spring: {
        friction: 7,
        tension: 100,
    },
    timing: {
        duration: 150,
        easing: Easing.inOut(Easing.ease),
        delay: 0,
    },
};

export type CustomRangeSliderProps = {
    value?: number;
    testID?: string;
    accessibilityLabel?: string;
    disabled?: boolean;
    minimumValue?: number;
    maximumValue?: number;
    step?: number;
    minimumTrackTintColor?: string;
    maximumTrackTintColor?: string;
    thumbTintColor?: string;
    thumbTouchSize?: { width: number; height: number };
    onValueChange?: (value: number) => void;
    onSlidingStart?: (value: number) => void;
    onSlidingComplete?: (value: number) => void;
    style?: StyleProp<ViewStyle>;
    trackStyle?: StyleProp<ViewStyle>;
    thumbStyle?: StyleProp<ViewStyle>;
    thumbImage?: ImageSourcePropType;
    debugTouchArea?: boolean;
    animateTransitions?: boolean;
    animationType?: "spring" | "timing";
    animationConfig?: Record<string, unknown>;
    /** When false, `onValueChange` only fires on release (matches SimpleRangeSelector). Default true. */
    emitWhileSliding?: boolean;
    styles?: {
        container?: ViewStyle;
        track?: ViewStyle;
        thumb?: ViewStyle;
        touchArea?: ViewStyle;
        debugThumbTouchArea?: ViewStyle;
    };
};

export default class CustomRangeSlider extends PureComponent<CustomRangeSliderProps> {
    static defaultProps = {
        value: 0,
        minimumValue: 0,
        maximumValue: 1,
        step: 0,
        minimumTrackTintColor: "#3f3f3f",
        maximumTrackTintColor: "#b3b3b3",
        thumbTintColor: "#343434",
        thumbTouchSize: { width: actuatedNormalize(40), height: actuatedNormalize(40) },
        debugTouchArea: false,
        animationType: "timing" as const,
        emitWhileSliding: true,
    };

    _containerSize: { width: number; height: number } | undefined;
    _trackSize: { width: number; height: number } | undefined;
    _thumbSize: { width: number; height: number } | undefined;
    _previousLeft = 0;
    _panResponder: ReturnType<typeof PanResponder.create>;

    state: {
        containerSize: { width: number; height: number };
        trackSize: { width: number; height: number };
        thumbSize: { width: number; height: number };
        allMeasured: boolean;
        value: Animated.Value;
    };

    constructor(props: CustomRangeSliderProps) {
        super(props);
        const v = props.value ?? CustomRangeSlider.defaultProps.value;
        this.state = {
            containerSize: { width: 0, height: 0 },
            trackSize: { width: 0, height: 0 },
            thumbSize: { width: 0, height: 0 },
            allMeasured: false,
            value: new Animated.Value(v),
        };
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminationRequest: this._handlePanResponderRequestEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });
    }

    componentDidUpdate(prevProps: CustomRangeSliderProps) {
        const newValue = this.props.value;
        if (prevProps.value !== newValue && newValue !== undefined) {
            if (this.props.animateTransitions) {
                this._setCurrentValueAnimated(newValue);
            } else {
                this._setCurrentValue(newValue);
            }
        }
    }

    render() {
        const {
            minimumValue = 0,
            maximumValue = 1,
            minimumTrackTintColor,
            maximumTrackTintColor,
            thumbTintColor,
            thumbImage,
            styles: stylesProp,
            style,
            trackStyle,
            thumbStyle,
            debugTouchArea,
            testID,
            accessibilityLabel,
        } = this.props;
        const { value, containerSize, thumbSize, allMeasured } = this.state;
        const mainStyles = stylesProp || defaultStyles;
        const thumbLeft = value.interpolate({
            inputRange: [minimumValue, maximumValue],
            outputRange: I18nManager.isRTL
                ? [0, -(containerSize.width - thumbSize.width)]
                : [0, containerSize.width - thumbSize.width],
        });
        const minimumTrackWidth = value.interpolate({
            inputRange: [minimumValue, maximumValue],
            outputRange: [0, containerSize.width - thumbSize.width],
        });
        const valueVisibleStyle: { opacity?: number } = {};
        if (!allMeasured) {
            valueVisibleStyle.opacity = 0;
        }

        const minimumTrackStyle = {
            position: "absolute" as const,
            width: Animated.add(minimumTrackWidth, thumbSize.width / 2),
            backgroundColor: minimumTrackTintColor,
            ...valueVisibleStyle,
        };

        const touchOverflowStyle = this._getTouchOverflowStyle();
        const pad = isPadDevice;

        return (
            <View
                testID={testID}
                accessibilityLabel={accessibilityLabel}
                style={[mainStyles.container, style]}
                onLayout={this._measureContainer}
            >
                <View
                    style={[{ backgroundColor: maximumTrackTintColor }, mainStyles.track, trackStyle]}
                    renderToHardwareTextureAndroid
                    onLayout={this._measureTrack}
                />
                <Animated.View
                    renderToHardwareTextureAndroid
                    style={[mainStyles.track, trackStyle, minimumTrackStyle]}
                />
                <Animated.View
                    onLayout={this._measureThumb}
                    renderToHardwareTextureAndroid
                    style={[
                        { backgroundColor: thumbTintColor },
                        mainStyles.thumb,
                        {
                            height: pad ? actuatedNormalize(40) : THUMB_SIZE,
                            width: pad ? actuatedNormalize(40) : THUMB_SIZE,
                            borderRadius: pad ? actuatedNormalize(40) / 2 : THUMB_SIZE / 2,
                        },
                        thumbStyle,
                        {
                            transform: [{ translateX: thumbLeft }, { translateY: 0 }],
                            ...valueVisibleStyle,
                        },
                    ]}
                >
                    {this._renderThumbImage(thumbImage)}
                </Animated.View>
                <View
                    renderToHardwareTextureAndroid
                    style={[defaultStyles.touchArea, touchOverflowStyle]}
                    {...this._panResponder.panHandlers}
                >
                    {debugTouchArea === true && this._renderDebugThumbTouchRect(minimumTrackWidth)}
                </View>
            </View>
        );
    }

    _handleStartShouldSetPanResponder = (e: { nativeEvent: { locationX: number; locationY: number } }) =>
        this._thumbHitTest(e);

    _handleMoveShouldSetPanResponder = () => false;

    _handlePanResponderGrant = () => {
        this._previousLeft = this._getThumbLeft(this._getCurrentValue());
        this._fireChangeEvent("onSlidingStart");
    };

    _handlePanResponderMove = (_e: unknown, gestureState: { dx: number }) => {
        if (this.props.disabled) {
            return;
        }
        this._setCurrentValue(this._getValue(gestureState));
        if (this.props.emitWhileSliding !== false) {
            this._fireChangeEvent("onValueChange");
        }
    };

    _handlePanResponderRequestEnd = () => false;

    _handlePanResponderEnd = (_e: unknown, gestureState: { dx: number }) => {
        if (this.props.disabled) {
            return;
        }
        this._setCurrentValue(this._getValue(gestureState));
        this._fireChangeEvent("onValueChange");
        this._fireChangeEvent("onSlidingComplete");
    };

    _measureContainer = (x: { nativeEvent: { layout: { width: number; height: number } } }) => {
        this._handleMeasure("containerSize", x);
    };

    _measureTrack = (x: { nativeEvent: { layout: { width: number; height: number } } }) => {
        this._handleMeasure("trackSize", x);
    };

    _measureThumb = (x: { nativeEvent: { layout: { width: number; height: number } } }) => {
        this._handleMeasure("thumbSize", x);
    };

    _handleMeasure = (
        name: "containerSize" | "trackSize" | "thumbSize",
        x: { nativeEvent: { layout: { width: number; height: number } } }
    ) => {
        const { width, height } = x.nativeEvent.layout;
        const size = { width, height };
        const storeName = `_${name}` as "_containerSize" | "_trackSize" | "_thumbSize";
        const currentSize = this[storeName];
        if (currentSize && width === currentSize.width && height === currentSize.height) {
            return;
        }
        this[storeName] = size;

        if (this._containerSize && this._trackSize && this._thumbSize) {
            this.setState({
                containerSize: this._containerSize,
                trackSize: this._trackSize,
                thumbSize: this._thumbSize,
                allMeasured: true,
            });
        }
    };

    _getRatio = (val: number) =>
        (val - (this.props.minimumValue ?? 0)) /
        ((this.props.maximumValue ?? 1) - (this.props.minimumValue ?? 0));

    _getThumbLeft = (val: number) => {
        const nonRtlRatio = this._getRatio(val);
        const ratio = I18nManager.isRTL ? 1 - nonRtlRatio : nonRtlRatio;
        return ratio * (this.state.containerSize.width - this.state.thumbSize.width);
    };

    _ratioToValue = (ratio: number) => {
        if (!isFinite(ratio)) {
          return this.props.minimumValue ?? 0;
        }
      
        const minV = this.props.minimumValue ?? 0;
        const maxV = this.props.maximumValue ?? 1;
        const step = this.props.step ?? 0;
      
        if (step > 0) {
          return Math.max(
            minV,
            Math.min(
              maxV,
              minV + Math.round((ratio * (maxV - minV)) / step) * step,
            ),
          );
        }
      
        return Math.max(
          minV,
          Math.min(maxV, ratio * (maxV - minV) + minV),
        );
      };

    _getValue = (gestureState: { dx: number }) => {
        const length = this.state.containerSize.width - this.state.thumbSize.width;
        if (!length || !isFinite(length)) {
            return this.props.minimumValue ?? 0;
          }
        const thumbLeft = this._previousLeft + gestureState.dx;
        const nonRtlRatio = thumbLeft / length;
        if (!isFinite(nonRtlRatio)) {
            return this.props.minimumValue ?? 0;
          }
        const ratio = I18nManager.isRTL
          ? 1 - nonRtlRatio
          : nonRtlRatio;  
        return this._ratioToValue(ratio);  
    };

    _getCurrentValue = () =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.state.value as any).__getValue() as number;

    _setCurrentValue = (val: number) => {
        this.state.value.setValue(val);
    };

    _setCurrentValueAnimated = (val: number) => {
        const animationType = this.props.animationType ?? "timing";
        const animationConfig = Object.assign(
            {},
            DEFAULT_ANIMATION_CONFIGS[animationType],
            this.props.animationConfig,
            { toValue: val, useNativeDriver: false }
        );
        if (animationType === "spring") {
            Animated.spring(this.state.value, animationConfig as Animated.SpringAnimationConfig).start();
        } else {
            Animated.timing(this.state.value, animationConfig as Animated.TimingAnimationConfig).start();
        }
    };

    _fireChangeEvent = (event: "onValueChange" | "onSlidingStart" | "onSlidingComplete") => {
        const fn = this.props[event];
        if (fn) {
            (fn as (v: number) => void)(this._getCurrentValue());
        }
    };

    _getTouchOverflowSize = () => {
        const state = this.state;
        const props = this.props;
        const size: { width?: number; height?: number } = {};
        if (state.allMeasured === true) {
            size.width = Math.max(
                0,
                (props.thumbTouchSize?.width ?? actuatedNormalize(40)) - state.thumbSize.width
            );
            size.height = Math.max(
                0,
                (props.thumbTouchSize?.height ?? actuatedNormalize(40)) - state.containerSize.height
            );
        }
        return size;
    };

    _getTouchOverflowStyle = () => {
        const { width, height } = this._getTouchOverflowSize();
        const touchOverflowStyle: Record<string, number | string> = {};
        if (width !== undefined && height !== undefined) {
            const verticalMargin = -height / 2;
            touchOverflowStyle.marginTop = verticalMargin;
            touchOverflowStyle.marginBottom = verticalMargin;
            const horizontalMargin = -width / 2;
            touchOverflowStyle.marginLeft = horizontalMargin;
            touchOverflowStyle.marginRight = horizontalMargin;
        }
        if (this.props.debugTouchArea === true) {
            touchOverflowStyle.backgroundColor = "orange";
            touchOverflowStyle.opacity = 0.5;
        }
        return touchOverflowStyle;
    };

    _thumbHitTest = (e: { nativeEvent: { locationX: number; locationY: number } }) => {
        const nativeEvent = e.nativeEvent;
        const thumbTouchRect = this._getThumbTouchRect();
        return thumbTouchRect.containsPoint(nativeEvent.locationX, nativeEvent.locationY);
    };

    _getThumbTouchRect = () => {
        const state = this.state;
        const props = this.props;
        const touchOverflowSize = this._getTouchOverflowSize();
        const tw = props.thumbTouchSize?.width ?? actuatedNormalize(40);
        const th = props.thumbTouchSize?.height ?? actuatedNormalize(40);

        return makeThumbTouchRect(
            touchOverflowSize.width! / 2 +
            this._getThumbLeft(this._getCurrentValue()) +
            (state.thumbSize.width - tw) / 2,
            touchOverflowSize.height! / 2 + (state.containerSize.height - th) / 2,
            tw,
            th
        );
    };

    _renderDebugThumbTouchRect = (thumbLeft: Animated.AnimatedInterpolation<number>) => {
        const thumbTouchRect = this._getThumbTouchRect();
        const positionStyle = {
            left: thumbLeft,
            top: thumbTouchRect.y,
            width: thumbTouchRect.width,
            height: thumbTouchRect.height,
        };
        return (
            <Animated.View
                style={[defaultStyles.debugThumbTouchArea, positionStyle]}
                pointerEvents="none"
                testID={this.props.testID}
                accessibilityLabel={this.props.accessibilityLabel}
            />
        );
    };

    _renderThumbImage = (thumbImage?: ImageSourcePropType) => {
        const lineSize = Platform.OS === "ios" ? actuatedNormalize(1.5) : actuatedNormalize(2);
        const pad = isPadDevice;

        if (!thumbImage) {
            return (
                <View
                    style={{
                        height: pad ? actuatedNormalize(20) / 2 : THUMB_SIZE * 0.55,
                        width: pad ? actuatedNormalize(20) / 2 : THUMB_SIZE * 0.55,
                        justifyContent: "space-around",
                    }}
                >
                    <View style={{ height: lineSize, backgroundColor: "white", width: "100%" }} />
                    <View style={{ height: lineSize, backgroundColor: "white", width: "100%" }} />
                    <View style={{ height: lineSize, backgroundColor: "white", width: "100%" }} />
                </View>
            );
        }
        return <Image source={thumbImage} />;
    };
}

const defaultStyles = StyleSheet.create({
    container: {
        height: 40,
        justifyContent: "center",
    },
    track: {
        height: TRACK_SIZE,
        borderRadius: TRACK_SIZE / 2,
    },
    thumb: {
        position: "absolute",
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
    },
    touchArea: {
        position: "absolute",
        backgroundColor: "transparent",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    debugThumbTouchArea: {
        position: "absolute",
        backgroundColor: "green",
        opacity: 0.5,
    },
});