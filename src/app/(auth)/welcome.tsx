import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { BrandBackground } from '@/components/ui';
import { fonts } from '@/theme';

const bubbles = require('@/assets/images/welcome-bubbles.png');

/** Welcome 550:31514 — bubble hero over the status bar, serif inline heading. */
export default function Welcome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <BrandBackground>
      {/* no top inset: the bubble hero deliberately renders over the status bar */}
      <View
        className="flex-1 justify-between"
        style={{ paddingBottom: insets.bottom + 24 }}
      >
        <Image
          source={bubbles}
          style={{ width, height: width * 1.06, marginTop: -8 }}
          contentFit="contain"
        />
        <View className="items-center gap-6 px-6">
          <View className="items-center">
            <Text className="font-display text-[28px] leading-[36px] text-fg-strong">
              Welcome to
            </Text>
            <Text className="text-[34px] leading-[44px] text-fg-strong">
              <Text style={{ fontFamily: fonts.display }}>Music </Text>
              <Text style={{ fontFamily: fonts.displayItalic }}>
                Everywhere
              </Text>
            </Text>
          </View>
          <Text className="text-center font-body text-sm text-fg-muted">
            Connect with musicians, fans & institutions.{'\n'}
            Discover events, buy instruments, find bandmates{'\n'}
            and grow your musical career.
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Continue"
            onPress={() => router.push('/(onboarding)/account-type')}
          >
            {({ pressed }) => (
              <View
                className="h-[58px] w-[58px] items-center justify-center rounded-full border-md border-primary-on/40 bg-primary"
                style={{ opacity: pressed ? 0.8 : 1 }}
              >
                <Text className="text-[20px] leading-[22px] text-primary-on">
                  ︽
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </BrandBackground>
  );
}
