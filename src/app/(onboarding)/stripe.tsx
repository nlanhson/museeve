import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '@/components/ui';
import { paymentsService } from '@/services/payments.service';
import { useOnboardingStore } from '@/stores/onboarding.store';
import { colors } from '@/theme';

/** Connect with Stripe 621:15026 — dark sheet, Stripe indigo CTA (intentional). */
export default function StripeConnect() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setStripeEmail = useOnboardingStore((s) => s.setStripeEmail);
  const [busy, setBusy] = useState(false);

  const connect = async () => {
    if (busy) return;
    setBusy(true);
    const { email } = await paymentsService.connectStripe();
    setStripeEmail(email);
    setBusy(false);
    router.push('/(onboarding)/stripe-done');
  };

  return (
    <View className="flex-1 justify-end bg-ground/80">
      <View
        className="rounded-t-[28px] bg-surface px-6 pt-2"
        style={{ borderCurve: 'continuous', paddingBottom: insets.bottom + 16 }}
      >
        <View className="mb-4 h-1 w-[58px] self-center rounded-full bg-elevated" />
        <View className="mb-6 flex-row items-center">
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

        <View className="mb-5 flex-row items-center gap-3">
          <View
            className="h-12 w-12 items-center justify-center rounded-lg"
            style={{ backgroundColor: colors.stripe, borderCurve: 'continuous' }}
          >
            <Text className="font-sans-semibold text-[22px] text-fg-strong">
              S
            </Text>
          </View>
          <View className="flex-1">
            <Text className="font-sans-semibold text-md text-fg-strong">
              Connect with Stripe
            </Text>
            <Text className="font-body text-sm text-fg-muted">
              Secure payment & identity verification
            </Text>
          </View>
        </View>

        <Text className="mb-5 font-body text-sm text-fg-muted">
          Stripe is our trusted partner for secure financial verification.
          Connecting your account allows us to verify your institution and
          process future transactions safely.
        </Text>

        <View className="mb-8 gap-3">
          {[
            'PCI-DSS Level 1 certified security',
            'Bank-grade encryption for all data',
            'No card charged during verification',
          ].map((line) => (
            <View key={line} className="flex-row items-center gap-3">
              <Text className="text-sm" style={{ color: colors.stripe }}>
                🛡
              </Text>
              <Text className="flex-1 font-body text-sm text-fg">{line}</Text>
            </View>
          ))}
        </View>

        <PrimaryButton
          label={busy ? 'Connecting…' : 'Connect Stripe account  ↗'}
          width="fill"
          tone="stripe"
          disabled={busy}
          onPress={connect}
        />

        <Text className="mt-4 text-center font-body text-xs text-fg-muted">
          🔒 Your financial data is never shared with third parties. By
          connecting, you agree to Stripe&apos;s{' '}
          <Text className="underline">Terms of Service</Text> and our{' '}
          <Text className="underline">Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
}
