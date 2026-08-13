import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '@/components/ui';
import { useOnboardingStore } from '@/stores/onboarding.store';
import { colors, fonts } from '@/theme';

/** Payment verification connected 621:18926 — tiles joined by green dashes. */
export default function StripeDone() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const stripeEmail = useOnboardingStore((s) => s.stripeEmail);

  return (
    <View className="flex-1 justify-end bg-ground/80">
      <View
        className="rounded-t-[28px] bg-surface px-6 pt-2"
        style={{
          borderCurve: 'continuous',
          minHeight: '88%',
          paddingBottom: insets.bottom + 16,
        }}
      >
        <View className="mb-4 h-1 w-[58px] self-center rounded-full bg-elevated" />
        <View className="flex-row items-center">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            onPress={router.back}
            className="h-9 w-9 items-center justify-center rounded-full bg-elevated/60"
          >
            <Text className="text-sm text-fg-strong">✕</Text>
          </Pressable>
          <Text className="flex-1 pr-9 text-center font-sans-semibold text-md text-fg-strong">
            Payment Verification
          </Text>
        </View>

        <View className="flex-1 items-center justify-center gap-8">
          <View className="flex-row items-center gap-2">
            <View
              className="h-14 w-14 items-center justify-center rounded-lg"
              style={{
                backgroundColor: colors.stripe,
                borderCurve: 'continuous',
              }}
            >
              <Text className="font-sans-semibold text-[26px] text-fg-strong">
                S
              </Text>
            </View>
            <Text className="text-sm text-success">- - -</Text>
            <View className="h-10 w-10 items-center justify-center rounded-full bg-success">
              <Text className="text-md text-fg-strong">🔗</Text>
            </View>
            <Text className="text-sm text-success">- - -</Text>
            <View
              className="h-14 w-14 items-center justify-center rounded-lg bg-primary-faded"
              style={{ borderCurve: 'continuous' }}
            >
              <Text
                className="text-[26px] text-primary-on"
                style={{ fontFamily: fonts.display }}
              >
                M
              </Text>
            </View>
          </View>
          <View className="items-center gap-2">
            <Text className="text-center font-sans-medium text-md text-success">
              Your account has been connected{'\n'}to Stripe
            </Text>
            <Text className="font-body text-sm text-fg-muted">
              {stripeEmail ?? 'your.name@gmail.com'}
            </Text>
          </View>
        </View>

        <PrimaryButton
          label="Continue"
          width="fill"
          tone="stripe"
          onPress={() => router.push('/(onboarding)/ready')}
        />
      </View>
    </View>
  );
}
