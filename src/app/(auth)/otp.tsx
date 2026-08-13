import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import {
  BrandBackground,
  BrandLockup,
  LegalFooter,
  OtpInput,
  PrimaryButton,
  ResendRow,
  Screen,
  ScreenHeader,
  ScreenHeading,
} from '@/components/ui';
import { authService } from '@/services/auth.service';
import { useOnboardingStore } from '@/stores/onboarding.store';

/**
 * OTP verify 468:27887 / keyboard-open 468:28807. One screen, both states —
 * the legal footer lives inside the avoiding view so the keyboard may cover it.
 */
export default function OtpVerify() {
  const router = useRouter();
  const email = useOnboardingStore((s) => s.email);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verify = async () => {
    if (code.length !== 6 || busy) return;
    setBusy(true);
    setError(null);
    const { ok } = await authService.verifyEmailOtp(code);
    setBusy(false);
    if (!ok) {
      setError('That code didn’t match. Check the email and try again.');
      return;
    }
    router.push('/(auth)/welcome');
  };

  return (
    <BrandBackground>
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <Screen className="justify-between">
          <View className="gap-6">
            <ScreenHeader />
            <View className="items-center">
              <BrandLockup />
            </View>
            <ScreenHeading title="Verify your email">
              6-digit code sent to
            </ScreenHeading>
            <View className="flex-row items-center justify-center gap-1.5">
              <Text className="font-sans-semibold text-sm text-primary-on">
                {email !== '' ? email : 'your.name@example.com'}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Change email"
                hitSlop={8}
                onPress={router.back}
              >
                <Text className="text-sm text-fg-strong">✎</Text>
              </Pressable>
            </View>
            <OtpInput value={code} onChange={setCode} onComplete={() => {}} />
            {error !== null ? (
              <Text className="text-center font-body text-sm text-danger">
                {error}
              </Text>
            ) : null}
            <View className="items-center">
              <ResendRow
                onResend={() => {
                  void authService.sendEmailOtp(email);
                }}
              />
            </View>
            <PrimaryButton
              label="Verify Code"
              disabled={code.length !== 6 || busy}
              onPress={verify}
            />
          </View>
          <LegalFooter />
        </Screen>
      </KeyboardAvoidingView>
    </BrandBackground>
  );
}
