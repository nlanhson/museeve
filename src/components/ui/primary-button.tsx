import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ctaGradient, colors } from '@/theme';

type Props = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  /** hug: Explore now / Verify Code · fill: Confirm / Continue to Verify */
  width?: 'hug' | 'fill';
  /** Stripe screens 621:15026 / 621:18926 use the Stripe indigo, not crimson */
  tone?: 'brand' | 'stripe';
  style?: ViewStyle;
};

const RADIUS = 999;

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  width = 'hug',
  tone = 'brand',
  style,
}: Props) {
  const fill = width === 'fill';
  const body = (
    <View className="items-center justify-center px-6 py-3">
      <Text className="px-1 font-sans-semibold text-md text-fg-strong">
        {label}
      </Text>
    </View>
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[fill ? { alignSelf: 'stretch' } : { alignSelf: 'center' }, style]}
    >
      {({ pressed }) => {
        const dim = pressed ? 0.85 : 1;
        if (disabled) {
          return (
            <View
              className="items-center justify-center rounded-full bg-elevated/60"
              style={{ borderCurve: 'continuous' }}
            >
              <View className="items-center justify-center px-6 py-3">
                <Text className="px-1 font-sans-semibold text-md text-fg-muted">
                  {label}
                </Text>
              </View>
            </View>
          );
        }
        if (tone === 'stripe') {
          return (
            <View
              className="items-center justify-center rounded-full"
              style={{
                backgroundColor: colors.stripe,
                opacity: dim,
                borderCurve: 'continuous',
              }}
            >
              {body}
            </View>
          );
        }
        return (
          <LinearGradient
            colors={ctaGradient.colors}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={{
              borderRadius: RADIUS,
              borderWidth: 2,
              borderColor: ctaGradient.border,
              opacity: dim,
              borderCurve: 'continuous',
            }}
          >
            {body}
          </LinearGradient>
        );
      }}
    </Pressable>
  );
}
