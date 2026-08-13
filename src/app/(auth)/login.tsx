import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as AppleAuthentication from 'expo-apple-authentication';
import {
  BrandBackground,
  BrandLockup,
  LegalFooter,
  PrimaryButton,
  SocialButton,
  UnderlineField,
} from '@/components/ui';
import { authService, type SocialProvider } from '@/services/auth.service';
import { useOnboardingStore } from '@/stores/onboarding.store';
import { colors } from '@/theme';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Login 468:27410. Apple raises the native sheet (468:29835), not a rebuild. */
export default function Login() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setStoreEmail = useOnboardingStore((s) => s.setEmail);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  const submitEmail = async () => {
    if (!EMAIL_RE.test(email) || busy) return;
    setBusy(true);
    setStoreEmail(email);
    await authService.sendEmailOtp(email);
    setBusy(false);
    router.push('/(auth)/otp');
  };

  const social = async (provider: SocialProvider) => {
    if (provider === 'apple') {
      try {
        await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        });
      } catch {
        return; // user dismissed the native sheet
      }
    } else {
      await authService.socialLogin(provider);
    }
    router.push('/(auth)/welcome');
  };

  return (
    <BrandBackground>
      <ScrollView
        // full-bleed art screen: UIKit's automatic inset shifts flexGrow
        // content below the fold, so both safe areas are applied by hand
        contentInsetAdjustmentBehavior="never"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom + 16,
        }}
      >
        <View className="items-center">
          <BrandLockup />
        </View>

        <View className="w-full items-center gap-6 pt-[66px]">
          <UnderlineField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            testID="login-email"
          />
          <PrimaryButton
            label="Explore now"
            disabled={!EMAIL_RE.test(email) || busy}
            onPress={submitEmail}
          />
          <View className="w-full flex-row items-center gap-2">
            <View className="flex-1 bg-line-faded" style={{ height: 0.5 }} />
            <Text className="font-sans-medium text-sm text-fg-muted">Or</Text>
            <View className="flex-1 bg-line-faded" style={{ height: 0.5 }} />
          </View>
          <View className="flex-row gap-6">
            <SocialButton provider="google" onPress={() => social('google')} />
            <SocialButton provider="apple" onPress={() => social('apple')} />
            <SocialButton
              provider="facebook"
              onPress={() => social('facebook')}
            />
          </View>
        </View>

        <View className="flex-1" />
        <View className="items-center gap-3 pt-8">
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/(auth)/welcome')}
          >
            <Text
              className="font-sans-semibold text-md"
              style={{ color: colors.guestLink }}
            >
              Log in as Guest
            </Text>
          </Pressable>
          <LegalFooter />
        </View>
      </ScrollView>
    </BrandBackground>
  );
}
