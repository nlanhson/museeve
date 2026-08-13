import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  PhoneField,
  PrimaryButton,
  Screen,
  ScreenHeader,
  ScreenHeading,
} from '@/components/ui';
import { authService } from '@/services/auth.service';
import { useOnboardingStore } from '@/stores/onboarding.store';

/** Phone verification 545:29011 — Step 1/2 (fan, artist) or 1/3 (institution). */
export default function PhoneVerification() {
  const router = useRouter();
  const accountType = useOnboardingStore((s) => s.accountType);
  const setPhone = useOnboardingStore((s) => s.setPhone);
  const [number, setNumber] = useState('');
  const [busy, setBusy] = useState(false);

  const total = accountType === 'institution' ? 3 : 2;

  const next = async () => {
    if (number.trim() === '' || busy) return;
    setBusy(true);
    const phone = `+33 ${number.trim()}`;
    setPhone(phone);
    await authService.sendPhoneOtp(phone);
    setBusy(false);
    router.push('/(onboarding)/phone-otp');
  };

  const skip = () => router.push('/(onboarding)/profile');

  return (
    <View className="flex-1 bg-ground">
      <Screen className="justify-between">
        <View className="gap-6">
          <ScreenHeader step={1} total={total} />
          <ScreenHeading title="Phone verification" align="left">
            We&apos;ll send a one-time code to verify your number. Standard
            rates may apply.
          </ScreenHeading>
          <PhoneField value={number} onChangeText={setNumber} />
        </View>

        <View className="gap-5">
          <View className="flex-row gap-2">
            <Text className="text-sm text-success">🛡</Text>
            <Text className="flex-1 font-body text-xs text-fg-muted">
              Your phone number is only used for verification. It&apos;s never
              shared with other users or third parties.
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Pressable accessibilityRole="button" onPress={skip} hitSlop={8}>
              <Text className="font-sans-medium text-md text-fg-strong">
                Skip
              </Text>
            </Pressable>
            <PrimaryButton
              label="Next"
              disabled={number.trim() === '' || busy}
              onPress={next}
            />
          </View>
        </View>
      </Screen>
    </View>
  );
}
