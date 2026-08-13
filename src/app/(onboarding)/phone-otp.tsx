import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  OtpInput,
  ResendRow,
  Screen,
  ScreenHeader,
  ScreenHeading,
} from '@/components/ui';
import { authService } from '@/services/auth.service';
import { useOnboardingStore } from '@/stores/onboarding.store';

/** Enter the code 720:19453 — no CTA; auto-advances on the sixth digit. */
export default function PhoneOtp() {
  const router = useRouter();
  const accountType = useOnboardingStore((s) => s.accountType);
  const phone = useOnboardingStore((s) => s.phone);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const total = accountType === 'institution' ? 3 : 2;

  const complete = async (full: string) => {
    setError(null);
    const { ok } = await authService.verifyPhoneOtp(full);
    if (!ok) {
      setError('That code didn’t match. Check the SMS and try again.');
      setCode('');
      return;
    }
    router.push('/(onboarding)/profile');
  };

  return (
    <View className="flex-1 bg-ground">
      <Screen className="gap-6">
        <ScreenHeader step={1} total={total} />
        <ScreenHeading title="Enter the code" align="left">
          6-digit code sent to
        </ScreenHeading>
        <View className="-mt-4 flex-row items-center gap-1.5">
          <Text className="font-sans-semibold text-sm text-primary-on">
            {phone !== '' ? phone : '+33 6 12 34 56 78'}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Change phone number"
            hitSlop={8}
            onPress={router.back}
          >
            <Text className="text-sm text-fg-strong">✎</Text>
          </Pressable>
        </View>
        <OtpInput value={code} onChange={setCode} onComplete={complete} />
        {error !== null ? (
          <Text className="font-body text-sm text-danger">{error}</Text>
        ) : null}
        <ResendRow
          onResend={() => {
            void authService.sendPhoneOtp(phone);
          }}
        />
      </Screen>
    </View>
  );
}
