import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { useReducedMotion } from 'react-native-reanimated';
import type { ReactNode } from 'react';

const satinLoop = require('@/assets/video/satin-loop.mp4');
const satinStill = require('@/assets/images/satin-still.png');

type Props = {
  children: ReactNode;
  /** auth screens darken the lower half so the footer stays readable */
  variant?: 'splash' | 'auth';
};

/**
 * The crimson satin brand backdrop. The design's animation reference is a
 * slow fabric loop (Video 2); reduced-motion users get the still frame.
 */
export function BrandBackground({ children, variant = 'auth' }: Props) {
  const reducedMotion = useReducedMotion();
  const { width, height } = useWindowDimensions();
  const player = useVideoPlayer(satinLoop, (p) => {
    p.loop = true;
    p.muted = true;
    if (!reducedMotion) p.play();
  });

  return (
    <View className="flex-1 bg-ground">
      {reducedMotion ? (
        <Image
          source={satinStill}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />
      ) : (
        <VideoView
          player={player}
          style={[StyleSheet.absoluteFill, { width, height }]}
          contentFit="cover"
          nativeControls={false}
        />
      )}
      {variant === 'auth' ? (
        <View
          style={StyleSheet.absoluteFill}
          className="bg-ground/45"
          pointerEvents="none"
        />
      ) : null}
      {children}
    </View>
  );
}
