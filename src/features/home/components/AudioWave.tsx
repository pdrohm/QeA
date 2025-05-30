import theme from '@/src/theme/theme';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface AudioWaveProps {
  isListening: boolean;
}

export const AudioWave = ({ isListening }: AudioWaveProps) => {
  const bar1 = useSharedValue(1);
  const bar2 = useSharedValue(1);
  const bar3 = useSharedValue(1);
  const bar4 = useSharedValue(1);
  const bar5 = useSharedValue(1);
  const animations = [bar1, bar2, bar3, bar4, bar5];

  useEffect(() => {
    if (isListening) {
      animations.forEach((anim, index) => {
        anim.value = withRepeat(
          withSequence(
            withTiming(2, {
              duration: 400 + index * 100,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(1, {
              duration: 400 + index * 100,
              easing: Easing.inOut(Easing.ease),
            })
          ),
          -1
        );
      });
    } else {
      animations.forEach(anim => {
        anim.value = withTiming(1);
      });
    }
  }, [isListening]);

  const bar1Style = useAnimatedStyle(() => ({
    width: 3,
    height: bar1.value * 8,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 2,
    borderRadius: 1.5,
  }));

  const bar2Style = useAnimatedStyle(() => ({
    width: 3,
    height: bar2.value * 8,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 2,
    borderRadius: 1.5,
  }));

  const bar3Style = useAnimatedStyle(() => ({
    width: 3,
    height: bar3.value * 8,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 2,
    borderRadius: 1.5,
  }));

  const bar4Style = useAnimatedStyle(() => ({
    width: 3,
    height: bar4.value * 8,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 2,
    borderRadius: 1.5,
  }));

  const bar5Style = useAnimatedStyle(() => ({
    width: 3,
    height: bar5.value * 8,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 2,
    borderRadius: 1.5,
  }));

  const styles = [bar1Style, bar2Style, bar3Style, bar4Style, bar5Style];

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: 20 }}>
      {styles.map((style, index) => (
        <Animated.View
          key={index}
          style={style}
        />
      ))}
    </View>
  );
};

  